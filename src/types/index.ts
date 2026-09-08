export type CategoryType = 
  | 'ALL'
  | 'CLASSIC'
  | 'ADVENTURE'
  | 'COMEDY'
  | 'FANTASY'
  | 'ANIME'
  | 'RETRO'
  | 'MOVIES'
  | 'ORIGINAL';

export interface CharacterStats {
  energy: number; // 0 - 100
  charm: number;  // 0 - 100
  wit: number;    // 0 - 100
  bravery: number;// 0 - 100
}

export interface CharacterItem {
  id: string;
  name: string;
  alias: string;
  category: CategoryType;
  era: string;
  year?: string;
  image: string;
  thumbnail?: string;
  description: string;
  story: string;
  loreOrigin: string;
  interestingFacts: string[];
  personalityTraits: string[];
  stats: CharacterStats;
  voiceLine: string;
  accentColor: string;
  secondaryColor: string;
  tags: string[];
  featured: boolean;
  signatureProp?: string;
}

export type AmbienceMood = 'day' | 'sunset' | 'night';

export interface TimelineMilestone {
  id: string;
  phase: string;
  title: string;
  year: string;
  description: string;
  highlight: string;
  iconName: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  color: string;
  icon: string;
  description: string;
}
