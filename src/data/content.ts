export interface Hall {
  id: string;
  name: string;
  capacity: string;
  priceRange: string;
  shortDescription: string;
  image: string;
  features: string[];
}

export const halls: Hall[] = [
  {
    id: 'grand-ballroom',
    name: 'The Grand Ballroom',
    capacity: '500 - 800 guests',
    priceRange: '$3,000 - $5,000',
    shortDescription: 'Our most luxurious space, perfect for grand weddings and large corporate galas. Features crystal chandeliers and a spacious dance floor.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600',
    features: ['Crystal Chandeliers', 'Built-in Stage', 'VIP Suite', 'Premium Audio/Visual']
  },
  {
    id: 'sapphire-hall',
    name: 'Sapphire Hall',
    capacity: '200 - 400 guests',
    priceRange: '$1,500 - $2,800',
    shortDescription: 'An elegant, versatile space ideal for mid-sized receptions, birthday parties, and conferences. Offers beautiful natural lighting.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1600',
    features: ['Natural Lighting', 'Flexible Seating', 'Private Bar', 'Courtyard Access']
  },
  {
    id: 'emerald-lounge',
    name: 'Emerald Lounge',
    capacity: '50 - 150 guests',
    priceRange: '$800 - $1,200',
    shortDescription: 'An intimate, sophisticated setting for corporate meetings, bridal showers, and private dinners.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600',
    features: ['Intimate Atmosphere', 'Lounge Seating', 'Dedicated Server', 'Custom Lighting']
  }
];

export const galleryImages = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1530103862676-de8892b12a15?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=800',
];
