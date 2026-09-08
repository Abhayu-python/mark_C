import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  RefreshCw, 
  User, 
  MessageSquare, 
  Palette,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONTACT_CONFIG, buildWhatsAppArtShareUrl, formatPhoneNumber } from '../config/contactConfig';
import { soundManager } from '../utils/audio';

interface SelectedFileState {
  file: File;
  previewUrl: string;
  base64Data: string;
  sizeFormatted: string;
}

export const ArtworkUploadCard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFileState | null>(null);
  const [artistName, setArtistName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size nicely
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Validate file against rules
  const validateFile = (file: File): string | null => {
    const maxBytes = CONTACT_CONFIG.maxFileSizeMB * 1024 * 1024;

    // Check mime type
    const lowerType = file.type.toLowerCase();
    const isAllowedMime = CONTACT_CONFIG.allowedMimeTypes.includes(lowerType);
    const fileExt = '.' + (file.name.split('.').pop() || '').toLowerCase();
    const isAllowedExt = CONTACT_CONFIG.allowedExtensions.includes(fileExt);

    if (!isAllowedMime && !isAllowedExt) {
      return `Unsupported format (${fileExt || 'unknown'}). Please upload a JPG, PNG, WEBP, or GIF.`;
    }

    if (file.size > maxBytes) {
      return `File is too large (${formatBytes(file.size)}). Maximum allowed size is ${CONTACT_CONFIG.maxFileSizeMB} MB.`;
    }

    return null;
  };

  // Process chosen file
  const handleFile = (file: File) => {
    setErrorMessage(null);
    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      soundManager.playPop();
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      setSelectedFile({
        file,
        previewUrl: URL.createObjectURL(file),
        base64Data,
        sizeFormatted: formatBytes(file.size)
      });
      soundManager.playPop();
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    if (selectedFile?.previewUrl) {
      URL.revokeObjectURL(selectedFile.previewUrl);
    }
    setSelectedFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validation: Name
    if (!artistName.trim()) {
      setErrorMessage('Please enter your name so we know who created the artwork!');
      soundManager.playPop();
      return;
    }

    // 2. Validation: Image
    if (!selectedFile) {
      setErrorMessage('Please choose or drop a cartoon artwork image to send.');
      soundManager.playPop();
      return;
    }

    setIsUploading(true);
    soundManager.playPop();

    try {
      // 3. Upload to backend endpoint
      const response = await fetch('/api/upload-artwork', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: selectedFile.file.name,
          mimeType: selectedFile.file.type || 'image/png',
          base64Data: selectedFile.base64Data
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload failed. Please check your file and try again.');
      }

      // Generate the public artwork URL
      // If backend gave fullUrl, use it; fallback to window.location.origin + data.url
      const publicArtworkUrl = data.fullUrl || `${window.location.origin}${data.url}`;
      setLastUploadedUrl(publicArtworkUrl);

      // 4. Build WhatsApp URL
      const whatsappUrl = buildWhatsAppArtShareUrl({
        name: artistName,
        userMessage: userMessage,
        artworkUrl: publicArtworkUrl
      });

      // 5. Celebration feedback
      soundManager.playIntroFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#92400e', '#38bdf8', '#4ade80']
      });

      setUploadSuccess(true);
      setIsUploading(false);

      // 6. Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // 7. Reset form state after brief celebration
      setTimeout(() => {
        if (selectedFile?.previewUrl) {
          URL.revokeObjectURL(selectedFile.previewUrl);
        }
        setSelectedFile(null);
        setArtistName('');
        setUserMessage('');
        setUploadSuccess(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 4000);

    } catch (err: any) {
      console.error('Submission failed:', err);
      setIsUploading(false);
      setErrorMessage(err.message || 'Artwork upload failed. Please try again.');
      soundManager.playPop();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mt-12 rounded-3xl overflow-hidden border border-amber-600/30 bg-gradient-to-br from-[#120a06]/95 via-[#0b101b]/95 to-[#190e07]/95 shadow-[0_20px_50px_rgba(20,10,5,0.7)] backdrop-blur-2xl p-6 sm:p-10"
    >
      {/* Warm Chocolate Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-amber-600/20 via-orange-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-amber-800/20 via-yellow-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="relative z-10 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider mb-2.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>COMMUNITY SHOWCASE</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
            <span>Share Your Cartoon Art</span>
            <span className="text-2xl sm:text-3xl">🎨</span>
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/70 font-light mt-1 max-w-xl">
            Have your own cartoon artwork? Send it to us and become part of our cartoon gallery!
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-950/40 border border-amber-500/20 text-[11px] font-mono text-amber-300/80">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Instant WhatsApp Curators</span>
        </div>
      </div>

      {/* Main Form Content */}
      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Drag & Drop Upload Zone */}
          <div className="lg:col-span-6 space-y-3">
            <label className="text-xs font-mono font-bold text-amber-200/90 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Cartoon Artwork *</span>
              </span>
              <span className="text-[10px] text-amber-300/60 font-normal">
                JPG, PNG, WEBP, GIF (Max 10MB)
              </span>
            </label>

            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Drag and Drop Container */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden min-h-[260px] flex flex-col items-center justify-center p-6 text-center select-none ${
                isDragging
                  ? 'border-amber-400 bg-amber-950/50 scale-[1.01] shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                  : selectedFile
                  ? 'border-amber-500/40 bg-slate-950/80 hover:border-amber-400/70'
                  : 'border-amber-600/30 hover:border-amber-400/60 bg-gradient-to-b from-slate-900/60 to-slate-950/80 hover:bg-amber-950/20'
              }`}
            >
              <AnimatePresence mode="wait">
                {selectedFile ? (
                  /* File Selected & Preview Mode */
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full flex flex-col items-center group"
                  >
                    {/* Artwork Preview Image */}
                    <div className="relative w-full max-h-[220px] rounded-xl overflow-hidden shadow-xl border border-amber-500/20 bg-black/40 flex items-center justify-center">
                      <img
                        src={selectedFile.previewUrl}
                        alt="Selected cartoon artwork preview"
                        className="w-full max-h-[220px] object-contain rounded-xl"
                      />

                      {/* Overlay badges on preview */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleClearFile}
                          className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors backdrop-blur-md shadow-lg cursor-pointer"
                          title="Remove artwork"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 border border-white/10 text-[10px] font-mono text-amber-300 backdrop-blur-md">
                        {selectedFile.sizeFormatted}
                      </div>
                    </div>

                    {/* File name & Change prompt */}
                    <div className="mt-3 flex items-center justify-between w-full px-1 text-xs">
                      <span className="font-mono text-slate-300 truncate max-w-[200px]" title={selectedFile.file.name}>
                        {selectedFile.file.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="text-amber-400 hover:text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Change file</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Empty Dropzone State */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center space-y-3 pointer-events-none"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600/30 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <UploadCloud className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">
                        {isDragging ? 'Drop your cartoon file right here!' : 'Drag & drop your cartoon art here'}
                      </p>
                      <p className="text-xs text-amber-200/60">
                        or <span className="text-amber-400 font-bold underline underline-offset-2">browse from your device</span>
                      </p>
                    </div>

                    {/* Supported formats pills */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {['JPG', 'PNG', 'WEBP', 'GIF'].map((ext) => (
                        <span
                          key={ext}
                          className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono text-amber-300/80 font-bold"
                        >
                          {ext}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Artist Details & Submit */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Artist Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-amber-200/90 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Artist Name / Nickname *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CartoonCreator_99 or Sarah"
                value={artistName}
                onChange={(e) => {
                  setArtistName(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>

            {/* User Message Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-amber-200/90 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                <span>Artwork Story / Message (Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your cartoon character, inspiration, or medium..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none"
              />
            </div>

            {/* Friendly Error Banner */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 shadow-md"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Notification Banner */}
            <AnimatePresence>
              {uploadSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3 shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-emerald-300">Artwork Uploaded Successfully!</div>
                    <div className="text-[11px] text-emerald-200/80 mt-0.5">
                      Opening WhatsApp to send your artwork to our studio...
                    </div>
                    {lastUploadedUrl && (
                      <a
                        href={lastUploadedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[10px] font-mono text-emerald-400 underline underline-offset-2 mt-1 hover:text-emerald-300"
                      >
                        Preview Uploaded Link
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Studio Info Note */}
            <div className="px-3.5 py-2.5 rounded-xl bg-amber-950/30 border border-amber-500/15 text-[11px] text-amber-200/70 leading-relaxed">
              <span className="font-bold text-amber-300">💡 How it works:</span> Clicking the button uploads your artwork to our studio server, creates a direct gallery link, and opens WhatsApp with your message ready to send!
            </div>

            {/* WhatsApp Send Button */}
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-3.5 px-6 rounded-xl font-black font-display text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 cursor-pointer ${
                isUploading
                  ? 'bg-amber-700/60 text-amber-200 cursor-wait'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-[0_6px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)] active:scale-[0.99]'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>PROCESSING & UPLOADING ARTWORK...</span>
                </>
              ) : (
                <>
                  <span>Send Artwork on WhatsApp 💬</span>
                </>
              )}
            </button>

            {/* Studio WhatsApp Destination Indicator */}
            <div className="text-center">
              <span className="text-[10px] font-mono text-amber-400/60">
                Connected to Studio WhatsApp: {formatPhoneNumber(CONTACT_CONFIG.whatsappNumber)}
              </span>
            </div>

          </div>
        </div>
      </form>
    </motion.div>
  );
};
