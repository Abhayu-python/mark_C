import { CharacterItem, TimelineMilestone, SocialLink } from '../types';

export const CHARACTERS_DATA: CharacterItem[] = [
  {
    id: 'c1',
    name: 'Doraemon',
    alias: 'The Gadget Cat from the Future',
    category: 'CLASSIC',
    era: 'Golden Anime Era',
    year: '1969',
    image: '/gallery/c7.jpg',
    description: 'Doraemon is a blue robotic cat from the 22nd century who travels back in time to help Nobita Nobi. With his magical 4D Pocket filled with futuristic gadgets, Doraemon turns ordinary days into unforgettable adventures.',
    story: 'Sent from the future to help Nobita build a better life, Doraemon becomes more than just a robotic helper—he becomes Nobita’s best friend. From Anywhere Doors and Bamboo-Copters to the Time Machine, his incredible gadgets take the duo across time and into countless hilarious and heartwarming adventures.',
    loreOrigin: 'Tokyo — Nobita Nobi’s Home',
    interestingFacts: [
      'Doraemon has a magical 4D Pocket that can store an enormous collection of futuristic gadgets.',
      'His most famous gadget is the Anywhere Door, which allows him to travel instantly to different places.',
      'Doraemon is extremely afraid of mice because one once chewed his ears while he was sleeping.'
    ],
    personalityTraits: ['Helpful', 'Loyal', 'Funny', 'Caring', 'Adventurous'],
    stats: {
      energy: 95,
      charm: 98,
      wit: 90,
      bravery: 93
    },
    voiceLine: '"Nobita! Don’t worry—I’ve got a gadget for that!"',
    accentColor: '#2196F3',
    secondaryColor: '#F44336',
    tags: ['Doraemon', 'Anime', 'Gadgets', 'Friendship', 'Adventure'],
    featured: true,
    signatureProp: '4D Pocket'
  },
  {
    id: 'c2',
    name: 'Tom & Jerry',
    alias: 'The Endless Cat & Mouse Chase',
    category: 'CLASSIC',
    era: 'Golden Cartoon Era',
    year: '1940',
    image: '/gallery/c2.jpg',
    description: 'Tom, the clever but often unlucky cat, and Jerry, the tiny and fearless mouse, are legendary rivals whose hilarious battles turn an ordinary house into a playground of endless chaos, tricks, and unforgettable adventures.',
    story: 'Tom and Jerry have spent countless days chasing, tricking, and outsmarting each other through houses, gardens, kitchens, and city streets. Although their rivalry is filled with wild traps and ridiculous schemes, their adventures often reveal an unexpected friendship hidden beneath all the chaos.',
    loreOrigin: 'A Classic House Somewhere in America',
    interestingFacts: [
      'Tom is constantly trying to catch Jerry, but Jerry usually finds a clever way to escape.',
      'Their adventures often rely on physical comedy, clever traps, and almost no dialogue.',
      'Despite their endless rivalry, Tom and Jerry sometimes work together when a bigger problem threatens them both.'
    ],
    personalityTraits: ['Mischievous', 'Clever', 'Competitive', 'Fearless', 'Playful'],
    stats: {
      energy: 99,
      charm: 97,
      wit: 98,
      bravery: 91
    },
    voiceLine: '"You may be fast, Jerry... but this time, I’ve got you!"',
    accentColor: '#42A5F5',
    secondaryColor: '#F5C542',
    tags: ['Tom', 'Jerry', 'Classic', 'Comedy', 'Rivalry', 'Friendship'],
    featured: true,
    signatureProp: 'Tom’s Mouse Trap'
  },
  {
    id: 'c3',
    name: 'Oggy and the Cockroaches',
    alias: 'The Blue Cat & The Tiny Troublemakers',
    category: 'CLASSIC',
    era: 'Golden Cartoon Era',
    year: '1998',
    image: '/gallery/c5.jpg',
    description: 'Oggy is a peaceful blue cat who dreams of a quiet life, but his plans are constantly destroyed by three mischievous cockroaches—Joey, Dee Dee, and Marky—who turn his home into a battlefield of endless comedy and chaos.',
    story: 'Oggy spends his days trying to enjoy a peaceful life, watching television, cooking delicious meals, and relaxing at home. Unfortunately, Joey, Dee Dee, and Marky are always ready with another prank. Their hilarious battles involve wild chases, ridiculous traps, unexpected teamwork, and complete household destruction.',
    loreOrigin: 'Oggy’s House — Somewhere in the Cartoon World',
    interestingFacts: [
      'Oggy is usually peaceful and kind, but the three cockroaches constantly push his patience to the limit.',
      'Joey, Dee Dee, and Marky each have different personalities, making their teamwork even more chaotic.',
      'Most of their adventures rely heavily on visual comedy, exaggerated expressions, clever tricks, and almost no dialogue.'
    ],
    personalityTraits: ['Peaceful', 'Funny', 'Patient', 'Determined', 'Protective'],
    stats: {
      energy: 98,
      charm: 95,
      wit: 93,
      bravery: 90
    },
    voiceLine: '"All I wanted was one peaceful day... is that really too much to ask?"',
    accentColor: '#2196F3',
    secondaryColor: '#FF9800',
    tags: ['Oggy', 'Cockroaches', 'Classic', 'Comedy', 'Chaos', 'Adventure'],
    featured: true,
    signatureProp: 'Oggy’s Frying Pan'
  },
  {
    id: 'c4',
    name: 'Shinchan Nohara',
    alias: 'The Mischievous Little Superhero',
    category: 'CLASSIC',
    era: 'Golden Anime Era',
    year: '1992',
    image: '/gallery/c10.jpg',
    description: 'Shinchan Nohara is a cheeky five-year-old whose fearless attitude, hilarious imagination, and endless mischief turn everyday life in Kasukabe into unforgettable adventures.',
    story: 'Living with his loving but frequently exhausted family in Kasukabe, Shinchan spends his days creating chaos wherever he goes. From annoying his parents and teachers to playing with his friends and dreaming up ridiculous adventures, his innocent confidence and unpredictable behavior make every ordinary day extraordinary.',
    loreOrigin: 'Kasukabe, Saitama — Nohara Family Home',
    interestingFacts: [
      'Shinchan is famous for his hilarious jokes, strange dance moves, and completely fearless attitude.',
      'He loves chocolate biscuits, action-hero shows, and spending time with his friends.',
      'Despite constantly causing trouble, Shinchan often shows a surprisingly caring and brave side when his family and friends need him.'
    ],
    personalityTraits: ['Mischievous', 'Funny', 'Fearless', 'Curious', 'Caring'],
    stats: {
      energy: 100,
      charm: 96,
      wit: 94,
      bravery: 89
    },
    voiceLine: '"Ohhh! I have a brilliant idea... and Mom is definitely not going to like it!"',
    accentColor: '#F44336',
    secondaryColor: '#FFD54F',
    tags: ['Shinchan', 'Anime', 'Comedy', 'Family', 'Mischief', 'Adventure'],
    featured: true,
    signatureProp: 'Action Mask'
  },
  {
    id: 'c5',
    name: 'Motu & Patlu',
    alias: 'The Funniest Duo of Furfuri Nagar',
    category: 'CLASSIC',
    era: 'Golden Cartoon Era',
    year: '2012',
    image: '/gallery/c11.jpg',
    description: 'Motu and Patlu are an unforgettable duo from Furfuri Nagar whose hilarious adventures, crazy plans, and constant trouble turn ordinary days into extraordinary comedy.',
    story: 'Motu loves samosas, while Patlu is the smarter and more sensible half of the duo. Together, they constantly find themselves caught in bizarre situations involving John the Don, Dr. Jhatka, Ghasitaram, and the other residents of Furfuri Nagar. Their friendship always helps them escape even the craziest problems.',
    loreOrigin: 'Furfuri Nagar — The Heart of Endless Adventures',
    interestingFacts: [
      'Motu has an incredible weakness for hot samosas and often gains extra energy after eating them.',
      'Patlu is usually the brains behind the duo and frequently saves Motu from his own crazy plans.',
      'Despite their constant arguments and accidents, Motu and Patlu always stand together when their friends need help.'
    ],
    personalityTraits: ['Funny', 'Loyal', 'Mischievous', 'Fearless', 'Friendly'],
    stats: {
      energy: 99,
      charm: 97,
      wit: 91,
      bravery: 94
    },
    voiceLine: '"Motu! Your samosa plan has gotten us into trouble again!"',
    accentColor: '#FF9800',
    secondaryColor: '#2196F3',
    tags: ['Motu Patlu', 'Comedy', 'Friendship', 'Furfuri Nagar', 'Adventure'],
    featured: true,
    signatureProp: 'Hot Samosa'
  },
  {
    id: 'c6',
    name: 'Mr. Bean',
    alias: 'The Man Who Turns Everything Into Chaos',
    category: 'CLASSIC',
    era: 'Golden Comedy Era',
    year: '1990',
    image: '/gallery/c12.jpg',
    description: 'Mr. Bean is a hilariously awkward and inventive character whose innocent-looking ideas frequently create complete chaos. With his unique expressions, unusual logic, and fearless imagination, even the simplest task becomes an unforgettable adventure.',
    story: 'Mr. Bean lives his everyday life with an unusual approach to solving problems. Whether he is cooking dinner, going shopping, attending a party, driving his tiny car, or simply trying to relax, his strange methods almost always lead to unexpected disasters. Yet somehow, his creativity and determination help him escape the chaos he creates.',
    loreOrigin: 'London — Mr. Bean’s Little World',
    interestingFacts: [
      'Mr. Bean rarely speaks, relying mainly on facial expressions, gestures, and physical comedy.',
      'His famous small green car and teddy bear Teddy are among the most recognizable parts of his world.',
      'Mr. Bean can turn the simplest everyday activity into a completely unpredictable adventure.'
    ],
    personalityTraits: ['Funny', 'Creative', 'Mischievous', 'Inventive', 'Unpredictable'],
    stats: {
      energy: 94,
      charm: 99,
      wit: 96,
      bravery: 87
    },
    voiceLine: '"Hmm... I have a plan. What could possibly go wrong?"',
    accentColor: '#4CAF50',
    secondaryColor: '#795548',
    tags: ['Mr Bean', 'Comedy', 'Classic', 'Chaos', 'Teddy', 'Adventure'],
    featured: true,
    signatureProp: 'Teddy'
  }
];

export const CATEGORIES: { id: string; label: string; count?: number }[] = [
  { id: 'ALL', label: 'All Cartoons' },
  { id: 'CLASSIC', label: 'Classic' },
  { id: 'COMEDY', label: 'Comedy' },
  { id: 'ANIME', label: 'Anime' },
  { id: 'ADVENTURE', label: 'Adventure' },
];

export const CREATOR_TIMELINE: TimelineMilestone[] = [
  {
    id: 'idea',
    phase: 'PHASE 01',
    title: 'THE IDEA',
    year: '2020',
    description: 'A childhood sketchbook filled with wild cartoon doodles sparks the dream of building a living, breathing animated digital universe.',
    highlight: 'Over 500 hand-drawn concepts and nostalgic cartoon memories cataloged.',
    iconName: 'Sparkles'
  },
  {
    id: 'collection',
    phase: 'PHASE 02',
    title: 'THE COLLECTION',
    year: '2022',
    description: 'Curating iconic silhouettes, vibrant personalities, and timeless storytelling into a cohesive interactive digital museum.',
    highlight: 'Classifying categories, character lore, traits, and cinematic environments.',
    iconName: 'Film'
  },
  {
    id: 'journey',
    phase: 'PHASE 03',
    title: 'THE JOURNEY',
    year: '2024',
    description: 'Merging modern 3D lighting, smooth parallax layers, and audio aesthetics to transform static artwork into an interactive animated spectacle.',
    highlight: 'Building cinematic depth, multi-layered atmospheres, and tactile micro-interactions.',
    iconName: 'Compass'
  },
  {
    id: 'future',
    phase: 'PHASE 04',
    title: 'THE FUTURE',
    year: '2026 & BEYOND',
    description: 'Expanding MRK C_COLLECTIONS into animated short films, community-submitted cartoon galleries, and interactive 3D virtual worlds.',
    highlight: 'Next-gen cartoon metaverse, database sync, and creator community hub.',
    iconName: 'Rocket'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Instagram',
    handle: '@mrk_c_collections',
    url: 'https://instagram.com',
    color: '#E1306C',
    icon: 'Instagram',
    description: 'Daily character art & behind-the-scenes sketches'
  },
  {
    platform: 'YouTube',
    handle: 'MRK C_COLLECTIONS',
    url: 'https://youtube.com',
    color: '#FF0000',
    icon: 'Youtube',
    description: 'Cinematic animated intros & story deep dives'
  },
  {
    platform: 'X / Twitter',
    handle: '@mrk_c_art',
    url: 'https://x.com/A__P__saini__',
    color: '#1DA1F2',
    icon: 'Twitter',
    description: 'Live updates, animation clips & concept drops'
  },
  {
    platform: 'GitHub',
    handle: 'mrk-c-collections',
    url: 'https://github.com/Abhayu-python',
    color: '#94A3B8',
    icon: 'Github',
    description: 'Open source web engine & design components'
  },
  {
    platform: 'LinkedIn',
    handle: 'MRK C Universe',
    url: 'https://linkedin.com',
    color: '#0A66C2',
    icon: 'Linkedin',
    description: 'Creative direction & industry collaborations'
  },
  {
    platform: 'Pinterest',
    handle: 'mrk_c_boards',
    url: 'https://pinterest.com',
    color: '#E60023',
    icon: 'Pinterest',
    description: 'Color palettes, moodboards & environment inspiration'
  }
];
