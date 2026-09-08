export interface ContactConfig {
  whatsappNumber: string;
  defaultStudioName: string;
  maxFileSizeMB: number;
  allowedMimeTypes: string[];
  allowedExtensions: string[];
}

export const CONTACT_CONFIG: ContactConfig = {
  // Configured WhatsApp number (can be overridden via VITE_WHATSAPP_NUMBER in .env)
  // Format should include country code without '+' or special symbols for WhatsApp API URL
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || '917088205958').replace(/[^0-9]/g, ''),
  defaultStudioName: 'Abhay Pratap Cartoon Studio',
  maxFileSizeMB: 10,
  allowedMimeTypes: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif']
};

/**
 * Builds the WhatsApp web / mobile click-to-chat URL with pre-filled message
 */
export function buildWhatsAppArtShareUrl(params: {
  name: string;
  userMessage?: string;
  artworkUrl: string;
  phone?: string;
}): string {
  const phone = params.phone || CONTACT_CONFIG.whatsappNumber;
  
  const greeting = `Hey! 👋 I’m ${params.name.trim()}.`;
  const intent = `I’d like to share my cartoon artwork with you! 🎨`;
  const messagePart = params.userMessage && params.userMessage.trim()
    ? `\nMessage: ${params.userMessage.trim()}`
    : '';
  const artworkPart = `\nArtwork: ${params.artworkUrl.trim()}`;

  const fullText = `${greeting}\n${intent}${messagePart}\n\n${artworkPart}`;
  const encodedText = encodeURIComponent(fullText);

  return `https://wa.me/${phone}?text=${encodedText}`;
}

export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('91') && digits.length === 12) {
    return `+91 ${digits.slice(2)}`;
  }
  return `+${digits}`;
}

