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
    id: 'comfort-arinola',
    name: 'Comfort Arinola Hall',
    capacity: '800 (with tables) - 1000 (without tables)',
    priceRange: 'Contact Us',
    shortDescription: 'Our largest, fully air-conditioned space, perfect for grand weddings and large corporate galas. Featuring ample room for your biggest events.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600',
    features: ['Full Air-Conditioned', 'Orange Box Styling', 'Large Capacity', 'Flexible Layouts']
  },
  {
    id: 'atinuke-hall',
    name: 'Atinuke Hall',
    capacity: '200 (with tables) - 250 (without tables)',
    priceRange: 'Contact Us',
    shortDescription: 'An elegant, fully air-conditioned space ideal for mid-sized receptions, birthday parties, and conferences.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1600',
    features: ['Full Air-Conditioned', 'Purple Box Styling', 'Perfect for Mid-Size', 'Intimate Feel']
  },
  {
    id: 'victoria-hall',
    name: 'Victoria Hall B',
    capacity: '60 (with tables) - 80 (without tables)',
    priceRange: 'Contact Us',
    shortDescription: 'A comfortable, fully air-conditioned setting for corporate meetings, bridal showers, and smaller private dinners.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600',
    features: ['Full Air-Conditioned', 'Yellow Box Styling', 'Private Atmosphere', 'Meeting Ready']
  },
  {
    id: 'green-carpet',
    name: 'Green Carpet Area',
    capacity: '80 (with tables) - 100 (without tables)',
    priceRange: 'Contact Us',
    shortDescription: 'An open and welcoming green carpet area, perfect for cocktail hours, meet-and-greets, and specialized event segments.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1600',
    features: ['Green Box Styling', 'Open Area', 'Standing Events', 'Flexible setup']
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
