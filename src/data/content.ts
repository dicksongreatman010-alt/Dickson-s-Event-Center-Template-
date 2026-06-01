const comfortArinola = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/comfortArinola';
const atinukeHallNew = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/atinukeHallNew';
const pentonImage1 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/pentonImage1';
const pentonImage2 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/pentonImage2';
const pentonImage3 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/pentonImage3';
const pentonImage4 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/pentonImage4';
const pentonImage5 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/pentonImage5';
const pentonImage6 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/pentonImage6';
const pentonImage7 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/pentonImage7';
const pentonImage8 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/pentonImage8';

const atinukeHall1 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/atinukeHall1';
const victoriaHall = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/victoriaHall';
const victoriaHallB = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/victoriaHallB';

const greenCarpet = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/greenCarpet';
const radiantDrapery = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/radiantDrapery';
const meetingRoomImage = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/victoriaHallB3';

// Comfort Arinola Hall Uploads
const comfortArinola1 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/comfortArinola1';
const comfortArinola2 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/comfortArinola2';
const comfortArinola3 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/comfortArinola3';
const comfortArinola4 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/comfortArinola4';
const comfortArinola5 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/comfortArinola5';
const comfortArinola6 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/comfortArinola6';

// Atinuke Hall A Uploads
const atinukeHallA = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/atinukeHallA';
const atinukeHallA2 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/atinukeHallA2';
const atinukeHallA3 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/atinukeHallA3';

// Green Carpet Area Uploads
const greenCarpetArea1 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/greenCarpetArea1';

// Outside & Parking lot Uploads
const outsideView = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/outsideView';
const outsideView2 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/outsideView2';
const parkingLotExtended = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/parkingLotExtended';
const parkingLotMerged = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/parkingLotMerged';
const parkingLotJpeg = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/parkingLotJpeg';
const parkingLotJpg = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/parkingLotJpg';

// Victoria Hall B Uploads
const victoriaHallB2 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/victoriaHallB2';
const victoriaHallB3 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/victoriaHallB3';
const victoriaHallB4 = 'https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/victoriaHallB4';

export interface Hall {
  id: string;
  name: string;
  capacity: string;
  priceRange: string;
  shortDescription: string;
  image: string;
  images?: string[]; // Multiple showcase images for gallery
  features: string[];
}

export const halls: Hall[] = [
  {
    id: 'comfort-arinola',
    name: 'Comfort Arinola Hall',
    capacity: '500 Seats (with tables) or 1000 Seats (without tables)',
    priceRange: '₦1,500,000.00',
    shortDescription: 'Our largest, fully air-conditioned space, perfect for grand weddings and large corporate galas. Featuring ample room for your biggest events.',
    image: pentonImage3,
    images: [
      pentonImage3,
      pentonImage4,
      pentonImage5,
      comfortArinola,
      radiantDrapery,
      comfortArinola1,
      comfortArinola2,
      comfortArinola3,
      comfortArinola4,
      comfortArinola5,
      comfortArinola6
    ],
    features: ['Full Air-Conditioned', 'Orange Box Styling', 'Large Capacity', 'Flexible Layouts', 'Private Changing Room', 'VAT Inclusive']
  },
  {
    id: 'atinuke-hall',
    name: 'Atinuke Hall A',
    capacity: '200 Seats (tables) or 250 Seats (without tables)',
    priceRange: '₦500,000.00',
    shortDescription: 'An elegant, fully air-conditioned space with extension and video link, ideal for mid-sized receptions, birthday parties, and conferences.',
    image: atinukeHallNew,
    images: [
      atinukeHallNew,
      pentonImage1,
      atinukeHall1,
      atinukeHallA,
      atinukeHallA2,
      atinukeHallA3
    ],
    features: ['Full Air-Conditioned', 'Purple Box Styling', 'With Extension & Video Link', 'Private Changing Room', 'Perfect for Mid-Size', 'VAT Inclusive']
  },
  {
    id: 'victoria-hall',
    name: 'Victoria Hall B',
    capacity: '60 Seats (with tables) or 80 Seats (without tables)',
    priceRange: '₦400,000.00',
    shortDescription: 'A comfortable, fully air-conditioned setting for corporate meetings, bridal showers, and smaller private dinners.',
    image: victoriaHall,
    images: [
      victoriaHall,
      victoriaHallB,
      victoriaHallB2,
      victoriaHallB3,
      victoriaHallB4
    ],
    features: ['Full Air-Conditioned', 'Yellow Box Styling', 'Private Atmosphere', 'Private Changing Room', 'Meeting Ready', 'VAT Inclusive']
  },
  {
    id: 'meeting-room',
    name: 'Meeting Room',
    capacity: '40 Seats (with tables) or 50 Seats (without tables)',
    priceRange: '₦150,000.00',
    shortDescription: 'A professional, fully air-conditioned environment designed for corporate training sessions, executive seminars, and private group discussions.',
    image: meetingRoomImage,
    images: [
      meetingRoomImage
    ],
    features: ['Full Air-Conditioned', 'Corporate Atmosphere', 'Private & Quiet', 'Meeting Ready', 'VAT Inclusive']
  },
  {
    id: 'green-carpet-1',
    name: 'Green Carpet Canopy One',
    capacity: '80 Seats (with tables) or 100 Seats (without tables)',
    priceRange: '₦200,000.00',
    shortDescription: 'An open and welcoming green carpet area with canopy coverage, perfect for cocktail hours, meet-and-greets, and specialized outdoor segments.',
    image: greenCarpet,
    images: [
      greenCarpet,
      greenCarpetArea1
    ],
    features: ['Green Box Styling', 'Premium Canopies', 'Open Air Feel', 'Standing Events welcome', 'VAT Inclusive']
  },
  {
    id: 'green-carpet-2',
    name: 'Green Carpet Canopy Two',
    capacity: '50 Seats (with tables) or 80 Seats (without tables)',
    priceRange: '₦150,000.00',
    shortDescription: 'A cozy, premium covered open carpet area ideal for smaller gatherings, intimate garden parties, family events, or brand activations.',
    image: greenCarpet,
    images: [
      greenCarpet,
      greenCarpetArea1
    ],
    features: ['Green Box Styling', 'Premium Canopies', 'Cosy Layout', 'Perfect for Small Groups', 'VAT Inclusive']
  }
];

export interface GalleryItem {
  src: string;
  category: string;
  caption: string;
}

export const galleryImages: GalleryItem[] = [
  {
    src: radiantDrapery,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola - Radiant Drapery & Golden Spheres'
  },
  {
    src: greenCarpet,
    category: 'Green Carpet Area',
    caption: 'Vibrant outdoor segment and welcoming reception space'
  },
  {
    src: atinukeHallNew,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Exquisite Main Stage & Banquet Design'
  },
  {
    src: pentonImage1,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Premium Seating & Lighting Showcase'
  },
  {
    src: pentonImage2,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Front view of the Main Banquet Area'
  },
  {
    src: pentonImage3,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Spectacular Stage Setup & Lighting'
  },
  {
    src: pentonImage4,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Luxury VIP Lounge & Reception View'
  },
  {
    src: pentonImage5,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Majestic Seating Layout For Grand Galas'
  },
  {
    src: pentonImage6,
    category: 'Green Carpet Area',
    caption: 'Green Carpet Area - Elegant Walkway Entrance'
  },
  {
    src: pentonImage7,
    category: 'Green Carpet Area',
    caption: 'Green Carpet Area - Glamorous Outdoor Photo Wall Setup'
  },
  {
    src: pentonImage8,
    category: 'Victoria Hall B',
    caption: 'Victoria Hall B - Elegant & Luxury Social Reception setup'
  },
  {
    src: atinukeHall1,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Bright and Welcoming Banquet Setup'
  },
  {
    src: victoriaHall,
    category: 'Victoria Hall B',
    caption: 'Victoria Hall B - Sophisticated Intimate Banquet'
  },
  {
    src: victoriaHallB,
    category: 'Victoria Hall B',
    caption: 'Victoria Hall B - Luxury Seating & Exquisite Backdrop Setting'
  },
  {
    src: comfortArinola,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola - Playful & Lively Celebration Area'
  },
  // Comfort Arinola Hall uploads
  {
    src: comfortArinola1,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Luxurious Main Banquet Arrangement'
  },
  {
    src: comfortArinola2,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Exquisite Stage Design Close-up'
  },
  {
    src: comfortArinola3,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Vibrant Decor details & Overhead Lighting'
  },
  {
    src: comfortArinola4,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Radiant Ambiance & Social Lounge'
  },
  {
    src: comfortArinola5,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Ornate Draperies & Premium Floral Settings'
  },
  {
    src: comfortArinola6,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola Hall - Spectacular Stage Setup & VIP Backdrop'
  },
  // Atinuke Hall uploads
  {
    src: atinukeHallA,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Rich Ceremony Seating & Lighting Aesthetics'
  },
  {
    src: atinukeHallA2,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Professional Conference & Stage Backdrop Setup'
  },
  {
    src: atinukeHallA3,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Sparkling Banquet Layout'
  },
  // Green Carpet Area
  {
    src: greenCarpetArea1,
    category: 'Green Carpet Area',
    caption: 'Green Carpet Area - Welcoming Canopy Entrance Setup'
  },
  // Victoria Hall B uploads
  {
    src: victoriaHallB2,
    category: 'Victoria Hall B',
    caption: 'Victoria Hall B - Sophisticated Royalty Banquet Seating'
  },
  {
    src: victoriaHallB3,
    category: 'Victoria Hall B',
    caption: 'Victoria Hall B - Charming Yellow Box Uplighting & Pillars'
  },
  {
    src: victoriaHallB4,
    category: 'Victoria Hall B',
    caption: 'Victoria Hall B - Intimate Social Celebration Setup'
  },
  // Exterior & Parking lot uploads
  {
    src: outsideView,
    category: 'Exterior & Parking',
    caption: 'Pentonrise - Gated Estate Entrance & Venue Frontage'
  },
  {
    src: outsideView2,
    category: 'Exterior & Parking',
    caption: 'Pentonrise - Broad Exterior Architecture View under Oyo Sunshine'
  },
  {
    src: parkingLotExtended,
    category: 'Exterior & Parking',
    caption: 'Pentonrise - Spacious Secondary Parking Security Zone'
  },
  {
    src: parkingLotMerged,
    category: 'Exterior & Parking',
    caption: 'Pentonrise - Paved Two-Way Driveways & Expansive Grounds'
  },
  {
    src: parkingLotJpeg,
    category: 'Exterior & Parking',
    caption: 'Pentonrise - Vast Main Parking Facility with Modern Layout'
  },
  {
    src: parkingLotJpg,
    category: 'Exterior & Parking',
    caption: 'Pentonrise - Clean Perimeter Fencing & Well-Lit Security Walks'
  }
];

