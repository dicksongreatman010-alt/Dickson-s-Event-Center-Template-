const comfortArinola = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFNHmbvAF2erJ1sujVtaAzV4_dzeSe_dzgObpu8o8Au5ecxtVyHs5qbWi46CcW9FV0AHXi9gcXVIX9h8ver8DeCvwkiiVuW74E_hKFaMAANObglZtxiz0I1mxVZ-1FIZEkS5roE=s516-k-no';
const atinukeHallNew = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.54%20AM%20(1).jpeg';
const pentonImage1 = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.54%20AM%20(2).jpeg';
const pentonImage2 = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.54%20AM.jpeg';
const pentonImage3 = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.55%20AM%20(1).jpeg';
const pentonImage4 = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.55%20AM%20(2).jpeg';
const pentonImage5 = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.55%20AM.jpeg';
const pentonImage6 = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.13.21%20AM%20(2).jpeg';
const pentonImage7 = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.13.21%20AM.jpeg';
const pentonImage8 = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Pentonrise/uy.jpeg';

const atinukeHall1 = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGpBU-eomLmuKAsQsXGt-VvtZDnmADWW70-aXbYfJHS3tBT2xxqe9TNEPaqagUabavHWHGC83UVndnKwnAveN_vfhB1qzYqF8HcbKOz8pDnrrj6axY7Ub5LQC8s8glQhhUbWRBOUA=s644-k-no';
const victoriaHall = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH9Yr5nFwH6g9DmwqfbwP41yFRZ3mexn78m5XRV6zSvnHVxQiTiSmT7eYbyXQT_MWG0o1wyVNbjsFF_DZkfgIZ-ngBXSKOk8rkQAobsIuR96kYKQTtnr6YeZOr74-bOTkoWvTbAgg=s644-k-no';

const greenCarpet = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGgqjDRymqyFtEAu2KCFKTEZsMqrugDL1FGzDIMoPnfQcarBGYyqqq5MIUoebLm4tjzj9YFTftV6NxkgJUXZRRYB0f0jMBFT3RW_i4aJ6PhJBV4gf-pPLy8Kws_3_IDRSwQADk=s644-k-no';
const meetingRoomImage = pentonImage2;

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
    capacity: '800 Seats (with tables) or 1000 Seats (without tables)',
    priceRange: '₦1,500,000.00',
    shortDescription: 'Our largest, fully air-conditioned space, perfect for grand weddings and large corporate galas. Featuring ample room for your biggest events.',
    image: pentonImage3,
    images: [
      pentonImage3,
      pentonImage4,
      pentonImage5,
      comfortArinola,
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGtqciw5DxVGoB09WBjLrj7D1Vjjh0x5CRM-b16tLrpCmQ1I4Om9GCil3RZJI1tfUrveVbyswAXbUoTy_XHDjEL2QuOaj2qgpvHgYduXUwBFetifBZhZFZQAv74QZbAnjEFRkaY=s516-k-no'
    ],
    features: ['Full Air-Conditioned', 'Orange Box Styling', 'Large Capacity', 'Flexible Layouts', 'VAT Inclusive']
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
      atinukeHall1
    ],
    features: ['Full Air-Conditioned', 'Purple Box Styling', 'With Extension & Video Link', 'Perfect for Mid-Size', 'VAT Inclusive']
  },
  {
    id: 'victoria-hall',
    name: 'Victoria Hall B',
    capacity: '60 Seats (with tables) or 80 Seats (without tables)',
    priceRange: '₦400,000.00',
    shortDescription: 'A comfortable, fully air-conditioned setting for corporate meetings, bridal showers, and smaller private dinners.',
    image: victoriaHall,
    images: [
      victoriaHall
    ],
    features: ['Full Air-Conditioned', 'Yellow Box Styling', 'Private Atmosphere', 'Meeting Ready', 'VAT Inclusive']
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
      greenCarpet
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
      greenCarpet
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
    src: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGtqciw5DxVGoB09WBjLrj7D1Vjjh0x5CRM-b16tLrpCmQ1I4Om9GCil3RZJI1tfUrveVbyswAXbUoTy_XHDjEL2QuOaj2qgpvHgYduXUwBFetifBZhZFZQAv74QZbAnjEFRkaY=s516-k-no',
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
    src: comfortArinola,
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola - Playful & Lively Celebration Area'
  }
];

