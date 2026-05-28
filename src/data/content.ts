const comfortArinola = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFNHmbvAF2erJ1sujVtaAzV4_dzeSe_dzgObpu8o8Au5ecxtVyHs5qbWi46CcW9FV0AHXi9gcXVIX9h8ver8DeCvwkiiVuW74E_hKFaMAANObglZtxiz0I1mxVZ-1FIZEkS5roE=s516-k-no';
const atinukeHall1 = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGpBU-eomLmuKAsQsXGt-VvtZDnmADWW70-aXbYfJHS3tBT2xxqe9TNEPaqagUabavHWHGC83UVndnKwnAveN_vfhB1qzYqF8HcbKOz8pDnrrj6axY7Ub5LQC8s8glQhhUbWRBOUA=s644-k-no';
const atinukeHall2 = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH9Yr5nFwH6g9DmwqfbwP41yFRZ3mexn78m5XRV6zSvnHVxQiTiSmT7eYbyXQT_MWG0o1wyVNbjsFF_DZkfgIZ-ngBXSKOk8rkQAobsIuR96kYKQTtnr6YeZOr74-bOTkoWvTbAgg=w222-h100-k-no';
const victoriaHall = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH9Yr5nFwH6g9DmwqfbwP41yFRZ3mexn78m5XRV6zSvnHVxQiTiSmT7eYbyXQT_MWG0o1wyVNbjsFF_DZkfgIZ-ngBXSKOk8rkQAobsIuR96kYKQTtnr6YeZOr74-bOTkoWvTbAgg=s644-k-no';

const greenCarpet = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGgqjDRymqyFtEAu2KCFKTEZsMqrugDL1FGzDIMoPnfQcarBGYyqqq5MIUoebLm4tjzj9YFTftV6NxkgJUXZRRYB0f0jMBFT3RW_i4aJ6PhJBV4gf-pPLy8Kws_3_IDRSwQADk=s644-k-no';

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
    capacity: '800 (with tables) - 1000 (without tables)',
    priceRange: 'Contact Us',
    shortDescription: 'Our largest, fully air-conditioned space, perfect for grand weddings and large corporate galas. Featuring ample room for your biggest events.',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGtqciw5DxVGoB09WBjLrj7D1Vjjh0x5CRM-b16tLrpCmQ1I4Om9GCil3RZJI1tfUrveVbyswAXbUoTy_XHDjEL2QuOaj2qgpvHgYduXUwBFetifBZhZFZQAv74QZbAnjEFRkaY=s516-k-no',
    images: [
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGtqciw5DxVGoB09WBjLrj7D1Vjjh0x5CRM-b16tLrpCmQ1I4Om9GCil3RZJI1tfUrveVbyswAXbUoTy_XHDjEL2QuOaj2qgpvHgYduXUwBFetifBZhZFZQAv74QZbAnjEFRkaY=s516-k-no',
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEn_oFAeUGPceq3Onso18X2PLUaxzR-CLxa2M4-F8tipxnOIWtra48qnlYA9PmoeyMnOgs2ZXjVwh_80pFD0OtgL9TsNRSQRWIPX8l-daYrcPlXFHp_aQlzGiEwAmqaQnOCpgcq=w203-h114-k-no',
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH_wNtIUJZwS-JRrRnbE2-iCjWTgNa4tF9fFlKhN03DTw0ftAjZz8CRsqiiFqbOLZJqdVt4ukUXbGGOxdASSUkV_v4ZYh4NU3p5K6JEogPPc5_d6kgL4ORVcKkioa_Oubmv7PIL-A=w222-h100-k-no',
      comfortArinola
    ],
    features: ['Full Air-Conditioned', 'Orange Box Styling', 'Large Capacity', 'Flexible Layouts']
  },
  {
    id: 'atinuke-hall',
    name: 'Atinuke Hall',
    capacity: '200 (with tables) - 250 (without tables)',
    priceRange: 'Contact Us',
    shortDescription: 'An elegant, fully air-conditioned space ideal for mid-sized receptions, birthday parties, and conferences.',
    image: atinukeHall1,
    images: [
      atinukeHall1,
      atinukeHall2
    ],
    features: ['Full Air-Conditioned', 'Purple Box Styling', 'Perfect for Mid-Size', 'Intimate Feel']
  },
  {
    id: 'victoria-hall',
    name: 'Victoria Hall B',
    capacity: '60 (with tables) - 80 (without tables)',
    priceRange: 'Contact Us',
    shortDescription: 'A comfortable, fully air-conditioned setting for corporate meetings, bridal showers, and smaller private dinners.',
    image: victoriaHall,
    features: ['Full Air-Conditioned', 'Yellow Box Styling', 'Private Atmosphere', 'Meeting Ready']
  },
  {
    id: 'green-carpet',
    name: 'Green Carpet Area',
    capacity: '80 (with tables) - 100 (without tables)',
    priceRange: 'Contact Us',
    shortDescription: 'An open and welcoming green carpet area, perfect for cocktail hours, meet-and-greets, and specialized event segments.',
    image: greenCarpet,
    features: ['Green Box Styling', 'Open Area', 'Standing Events', 'Flexible setup']
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
    src: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEn_oFAeUGPceq3Onso18X2PLUaxzR-CLxa2M4-F8tipxnOIWtra48qnlYA9PmoeyMnOgs2ZXjVwh_80pFD0OtgL9TsNRSQRWIPX8l-daYrcPlXFHp_aQlzGiEwAmqaQnOCpgcq=w203-h114-k-no',
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola - Grand Reception Layout'
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH_wNtIUJZwS-JRrRnbE2-iCjWTgNa4tF9fFlKhN03DTw0ftAjZz8CRsqiiFqbOLZJqdVt4ukUXbGGOxdASSUkV_v4ZYh4NU3p5K6JEogPPc5_d6kgL4ORVcKkioa_Oubmv7PIL-A=w222-h100-k-no',
    category: 'Comfort Arinola Hall',
    caption: 'Comfort Arinola - Exquisite Table Settings'
  },
  {
    src: greenCarpet,
    category: 'Green Carpet Area',
    caption: 'Vibrant outdoor segment and welcoming reception space'
  },
  {
    src: atinukeHall1,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Bright and Welcoming Banquet Setup'
  },
  {
    src: atinukeHall2,
    category: 'Atinuke Hall',
    caption: 'Atinuke Hall - Highly Refined and Stylish Seating Layout'
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

