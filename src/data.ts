export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  creator: string;
  creatorId: string;
  sourceName: string;
  sourceUrl: string;
  priceType: string;
  price: number;
  license: string;
  rating: number;
  qualityScore: number;
  saves: number;
  dateAdded: string;
  updatedAt: string;
  tools: string[];
  fileTypes: string[];
  thumbnailStyle: string;
  isFeatured: boolean;
  isHandpicked: boolean;
  isNew: boolean;
  isBookmarked: boolean;
  isFavorite: boolean;
  useCases: string[];
  relatedResourceIds: string[];
  
  // EXTREME DETAIL FIELDS
  longDescription?: string;
  difficulty?: string;
  resourceType?: string;
  commercialUse?: 'Yes' | 'No' | 'Unknown';
  attributionRequired?: 'Yes' | 'No' | 'Unknown';
  fileSize?: string;
  numberOfFiles?: number;
  version?: string;
  lastChecked?: string;
  status?: 'Active' | 'Broken' | 'Needs Review' | 'Verified';
  curationNote?: string;
  limitations?: string[];
  pros?: string[];
  cons?: string[];
  usageTips?: string[];
  
  // COMPACT DETAILING FIELDS
  slug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  creatorAvatar?: string;
  creatorInitial?: string;
  sourceReliability?: 'High' | 'Medium' | 'Low' | 'Unknown';
  platformCompatibility?: string[];
  includedFormats?: string[];
  bestFor?: string[];
  notBestFor?: string[];
  editorNote?: string;
  previewGallery?: string[];
  previewCaptions?: string[];
  previewCount?: number;
  alternativeResourceIds?: string[];
  moreFromSourceIds?: string[];
  views?: number;
  licenseNote?: string;
  visualStyle?: string;
  colorStyle?: string;
};

export const tree: Record<string, string[]> = {
  "Mockups": [
    "Device Mockups",
    "iPhone",
    "MacBook",
    "iPad",
    "Apparel",
    "Packaging",
    "Posters",
    "Branding",
    "Social Media",
    "Scene Creators"
  ],
  "Fonts": [
    "Serif",
    "Sans Serif",
    "Display",
    "Variable",
    "Editorial",
    "Luxury",
    "Free Fonts",
    "Premium Fonts"
  ],
  "UI Kits": [
    "Mobile UI",
    "Web UI",
    "SaaS UI",
    "Dashboard UI",
    "Design Systems",
    "Components"
  ],
  "Tools": [
    "Design Tools",
    "AI Tools",
    "Productivity",
    "Developer Tools",
    "No-Code",
    "Automation"
  ],
  "Templates": [
    "Framer",
    "Webflow",
    "Figma",
    "Notion",
    "Presentations",
    "Portfolio"
  ],
  "Courses": [
    "UI/UX",
    "Branding",
    "Framer",
    "Figma",
    "3D",
    "Motion",
    "Freelancing"
  ],
  "Books": [
    "Product Design",
    "Branding",
    "Typography",
    "Business",
    "Creativity"
  ],
  "Icons": [
    "Outline",
    "Filled",
    "3D Icons",
    "Animated Icons",
    "App Icons"
  ],
  "3D Assets": [
    "Cinema 4D",
    "Blender",
    "Materials",
    "Product Scenes",
    "Abstract Scenes",
    "Lighting"
  ],
  "Branding": [
    "Brand Systems",
    "Logo Inspiration",
    "Color Palettes",
    "Guidelines",
    "Mockup Packs"
  ],
  "Landing Pages": [
    "SaaS",
    "Agency",
    "Product",
    "Portfolio",
    "Startup"
  ],
  "Motion": [
    "After Effects",
    "Rive",
    "Lottie",
    "UI Motion",
    "Product Videos"
  ]
};
export const categories = Object.keys(tree);

export const resources: Resource[] = [
  {
    "id": "res-1",
    "title": "Premium Scene Creators 10",
    "description": "A high-end, premium scene creators asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "Scene Creators",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "scene-creators"
    ],
    "creator": "Framer Team",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 45,
    "license": "Extended",
    "rating": 4.7,
    "qualityScore": 90,
    "saves": 734,
    "dateAdded": "2026-02-19T09:52:30.487Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop",
      "Cinema 4D",
      "After Effects"
    ],
    "fileTypes": [
      ".psd",
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(122, 60%, 20%), hsl(5, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium scene creators asset designed to elevate your next project. Built specifically for Mockups workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Mockup",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "496.3 MB",
    "numberOfFiles": 23,
    "version": "1.0.0",
    "lastChecked": "2026-04-15T03:01:08.425Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-2",
    "title": "Premium iPhone 38",
    "description": "A high-end, premium iphone asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "iPhone",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "iphone"
    ],
    "creator": "Linear",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.5,
    "qualityScore": 93,
    "saves": 880,
    "dateAdded": "2026-04-28T15:56:58.985Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion"
    ],
    "fileTypes": [
      ".blend",
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(128, 60%, 20%), hsl(116, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium iphone asset designed to elevate your next project. Built specifically for Mockups workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Mockup",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "43.5 MB",
    "numberOfFiles": 39,
    "version": "1.1.0",
    "lastChecked": "2026-03-01T09:08:11.316Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-3",
    "title": "Premium MacBook 95",
    "description": "A high-end, premium macbook asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "MacBook",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "macbook"
    ],
    "creator": "Olsz",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.5,
    "qualityScore": 95,
    "saves": 1015,
    "dateAdded": "2026-04-05T20:33:46.658Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(312, 60%, 20%), hsl(102, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium macbook asset designed to elevate your next project. Built specifically for Mockups workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Mockup",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "497.6 MB",
    "numberOfFiles": 33,
    "version": "1.2.0",
    "lastChecked": "2026-02-11T09:29:49.146Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-4",
    "title": "Premium MacBook 44",
    "description": "A high-end, premium macbook asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "MacBook",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "macbook"
    ],
    "creator": "Stripe",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.6,
    "qualityScore": 91,
    "saves": 753,
    "dateAdded": "2026-03-01T18:56:22.205Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Spline",
      "Figma"
    ],
    "fileTypes": [
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(138, 60%, 20%), hsl(245, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium macbook asset designed to elevate your next project. Built specifically for Mockups workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Mockup",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "189.3 MB",
    "numberOfFiles": 22,
    "version": "1.3.0",
    "lastChecked": "2026-03-27T15:28:20.762Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-5",
    "title": "Premium iPhone 48",
    "description": "A high-end, premium iphone asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "iPhone",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "iphone"
    ],
    "creator": "Vercel",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 74,
    "license": "Personal",
    "rating": 5,
    "qualityScore": 92,
    "saves": 686,
    "dateAdded": "2026-03-27T05:29:48.613Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion"
    ],
    "fileTypes": [
      ".blend",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(341, 60%, 20%), hsl(122, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium iphone asset designed to elevate your next project. Built specifically for Mockups workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Mockup",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "59.1 MB",
    "numberOfFiles": 45,
    "version": "1.4.0",
    "lastChecked": "2026-02-13T15:00:22.565Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-6",
    "title": "Premium Posters 65",
    "description": "A high-end, premium posters asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "Posters",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "posters"
    ],
    "creator": "Vercel",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 50,
    "license": "Commercial",
    "rating": 4.7,
    "qualityScore": 99,
    "saves": 911,
    "dateAdded": "2026-03-13T09:14:38.686Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma",
      "Cinema 4D",
      "After Effects"
    ],
    "fileTypes": [
      ".svg",
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(355, 60%, 20%), hsl(0, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium posters asset designed to elevate your next project. Built specifically for Mockups workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Mockup",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "242.8 MB",
    "numberOfFiles": 40,
    "version": "1.0.0",
    "lastChecked": "2026-01-24T04:25:58.286Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-7",
    "title": "Premium iPhone 13",
    "description": "A high-end, premium iphone asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "iPhone",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "iphone"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.1,
    "qualityScore": 97,
    "saves": 471,
    "dateAdded": "2026-03-21T22:48:29.211Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion",
      "After Effects",
      "Webflow"
    ],
    "fileTypes": [
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(303, 60%, 20%), hsl(142, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium iphone asset designed to elevate your next project. Built specifically for Mockups workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Mockup",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "219.3 MB",
    "numberOfFiles": 19,
    "version": "1.1.0",
    "lastChecked": "2026-02-21T10:34:39.584Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-8",
    "title": "Premium Apparel 13",
    "description": "A high-end, premium apparel asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "Apparel",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "apparel"
    ],
    "creator": "Creative",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.2,
    "qualityScore": 90,
    "saves": 277,
    "dateAdded": "2026-03-22T05:37:24.081Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender",
      "Spline"
    ],
    "fileTypes": [
      ".blend",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(336, 60%, 20%), hsl(253, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium apparel asset designed to elevate your next project. Built specifically for Mockups workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Mockup",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "240.9 MB",
    "numberOfFiles": 7,
    "version": "1.2.0",
    "lastChecked": "2026-02-28T15:22:25.624Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-9",
    "title": "Premium iPad 61",
    "description": "A high-end, premium ipad asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "iPad",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "ipad"
    ],
    "creator": "Vercel",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.9,
    "qualityScore": 99,
    "saves": 786,
    "dateAdded": "2026-04-21T10:50:38.418Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Figma",
      "Blender"
    ],
    "fileTypes": [
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(8, 60%, 20%), hsl(105, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium ipad asset designed to elevate your next project. Built specifically for Mockups workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Mockup",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "269.4 MB",
    "numberOfFiles": 11,
    "version": "1.3.0",
    "lastChecked": "2026-02-09T07:49:23.190Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-10",
    "title": "Premium Social Media 61",
    "description": "A high-end, premium social media asset designed to elevate your next project. Built specifically for Mockups workflows.",
    "category": "Mockups",
    "subcategory": "Social Media",
    "tags": [
      "Premium",
      "Design",
      "mockups",
      "social-media"
    ],
    "creator": "Notion",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 83,
    "license": "Personal",
    "rating": 4.7,
    "qualityScore": 97,
    "saves": 931,
    "dateAdded": "2026-04-28T21:28:26.945Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive"
    ],
    "fileTypes": [
      ".zip",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(246, 60%, 20%), hsl(324, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium social media asset designed to elevate your next project. Built specifically for Mockups workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Mockup",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "308.7 MB",
    "numberOfFiles": 25,
    "version": "1.4.0",
    "lastChecked": "2026-04-25T07:43:34.046Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-11",
    "title": "Premium Serif 77",
    "description": "A high-end, premium serif asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Serif",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "serif"
    ],
    "creator": "Olsz",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.9,
    "qualityScore": 95,
    "saves": 629,
    "dateAdded": "2026-04-17T11:14:03.490Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow"
    ],
    "fileTypes": [
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(70, 60%, 20%), hsl(28, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium serif asset designed to elevate your next project. Built specifically for Fonts workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Font",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "394.8 MB",
    "numberOfFiles": 29,
    "version": "1.0.0",
    "lastChecked": "2026-01-18T23:35:59.236Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-12",
    "title": "Premium Luxury 56",
    "description": "A high-end, premium luxury asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Luxury",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "luxury"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.2,
    "qualityScore": 94,
    "saves": 298,
    "dateAdded": "2026-04-19T14:44:43.882Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender",
      "Framer"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(125, 60%, 20%), hsl(323, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium luxury asset designed to elevate your next project. Built specifically for Fonts workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Font",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "124.2 MB",
    "numberOfFiles": 50,
    "version": "1.1.0",
    "lastChecked": "2026-02-07T13:29:36.231Z",
    "status": "Verified",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-13",
    "title": "Premium Editorial 39",
    "description": "A high-end, premium editorial asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Editorial",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "editorial"
    ],
    "creator": "Apple",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.9,
    "qualityScore": 94,
    "saves": 759,
    "dateAdded": "2026-03-05T13:06:48.577Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow",
      "Framer",
      "After Effects"
    ],
    "fileTypes": [
      ".png",
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(74, 60%, 20%), hsl(84, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium editorial asset designed to elevate your next project. Built specifically for Fonts workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Font",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "366.9 MB",
    "numberOfFiles": 2,
    "version": "1.2.0",
    "lastChecked": "2026-03-27T23:20:27.899Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-14",
    "title": "Premium Variable 7",
    "description": "A high-end, premium variable asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Variable",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "variable"
    ],
    "creator": "Notion",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 82,
    "license": "Personal",
    "rating": 4.8,
    "qualityScore": 96,
    "saves": 101,
    "dateAdded": "2026-03-26T14:20:39.175Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion",
      "Cinema 4D"
    ],
    "fileTypes": [
      ".png",
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(97, 60%, 20%), hsl(212, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium variable asset designed to elevate your next project. Built specifically for Fonts workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Font",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "150.1 MB",
    "numberOfFiles": 37,
    "version": "1.3.0",
    "lastChecked": "2026-04-30T17:53:26.637Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-15",
    "title": "Premium Sans Serif 77",
    "description": "A high-end, premium sans serif asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Sans Serif",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "sans-serif"
    ],
    "creator": "Notion",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 56,
    "license": "Extended",
    "rating": 4.8,
    "qualityScore": 94,
    "saves": 741,
    "dateAdded": "2026-03-03T01:00:54.929Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D",
      "After Effects"
    ],
    "fileTypes": [
      ".psd",
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(312, 60%, 20%), hsl(14, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium sans serif asset designed to elevate your next project. Built specifically for Fonts workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Font",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "343.6 MB",
    "numberOfFiles": 3,
    "version": "1.4.0",
    "lastChecked": "2026-04-16T00:34:54.115Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-16",
    "title": "Premium Display 32",
    "description": "A high-end, premium display asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Display",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "display"
    ],
    "creator": "Creative",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 14,
    "license": "Personal",
    "rating": 4.9,
    "qualityScore": 99,
    "saves": 830,
    "dateAdded": "2026-04-01T16:22:48.729Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(146, 60%, 20%), hsl(336, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium display asset designed to elevate your next project. Built specifically for Fonts workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Font",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "501.3 MB",
    "numberOfFiles": 2,
    "version": "1.0.0",
    "lastChecked": "2026-03-21T13:25:10.100Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-17",
    "title": "Premium Free Fonts 89",
    "description": "A high-end, premium free fonts asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Free Fonts",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "free-fonts"
    ],
    "creator": "Framer Team",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.2,
    "qualityScore": 95,
    "saves": 1050,
    "dateAdded": "2026-02-09T22:03:11.103Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma",
      "Framer",
      "Photoshop"
    ],
    "fileTypes": [
      ".png",
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(172, 60%, 20%), hsl(220, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium free fonts asset designed to elevate your next project. Built specifically for Fonts workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Font",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "315.8 MB",
    "numberOfFiles": 9,
    "version": "1.1.0",
    "lastChecked": "2026-04-27T11:39:26.611Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-18",
    "title": "Premium Display 13",
    "description": "A high-end, premium display asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Display",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "display"
    ],
    "creator": "Framer Team",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.2,
    "qualityScore": 91,
    "saves": 933,
    "dateAdded": "2026-04-14T18:17:06.686Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator"
    ],
    "fileTypes": [
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(249, 60%, 20%), hsl(41, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium display asset designed to elevate your next project. Built specifically for Fonts workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Font",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "251.0 MB",
    "numberOfFiles": 4,
    "version": "1.2.0",
    "lastChecked": "2026-01-23T20:31:30.745Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-19",
    "title": "Premium Free Fonts 57",
    "description": "A high-end, premium free fonts asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Free Fonts",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "free-fonts"
    ],
    "creator": "Apple",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 10,
    "license": "Extended",
    "rating": 4.4,
    "qualityScore": 96,
    "saves": 315,
    "dateAdded": "2026-03-22T23:35:19.394Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Spline",
      "Illustrator"
    ],
    "fileTypes": [
      ".psd",
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(199, 60%, 20%), hsl(266, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium free fonts asset designed to elevate your next project. Built specifically for Fonts workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Font",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "316.1 MB",
    "numberOfFiles": 50,
    "version": "1.3.0",
    "lastChecked": "2026-02-17T12:29:43.228Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-20",
    "title": "Premium Sans Serif 60",
    "description": "A high-end, premium sans serif asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Sans Serif",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "sans-serif"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 59,
    "license": "Personal",
    "rating": 4.8,
    "qualityScore": 90,
    "saves": 274,
    "dateAdded": "2026-01-16T13:01:53.373Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop",
      "Figma"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(282, 60%, 20%), hsl(84, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium sans serif asset designed to elevate your next project. Built specifically for Fonts workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Font",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "105.9 MB",
    "numberOfFiles": 37,
    "version": "1.4.0",
    "lastChecked": "2026-03-05T06:48:57.222Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-21",
    "title": "Premium Serif 67",
    "description": "A high-end, premium serif asset designed to elevate your next project. Built specifically for Fonts workflows.",
    "category": "Fonts",
    "subcategory": "Serif",
    "tags": [
      "Premium",
      "Design",
      "fonts",
      "serif"
    ],
    "creator": "Notion",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.5,
    "qualityScore": 91,
    "saves": 189,
    "dateAdded": "2026-01-07T03:01:36.946Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "Spline"
    ],
    "fileTypes": [
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(2, 60%, 20%), hsl(52, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium serif asset designed to elevate your next project. Built specifically for Fonts workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Font",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "443.7 MB",
    "numberOfFiles": 2,
    "version": "1.0.0",
    "lastChecked": "2026-03-11T21:55:13.190Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-22",
    "title": "Premium Web UI 29",
    "description": "A high-end, premium web ui asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "Web UI",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "web-ui"
    ],
    "creator": "Vercel",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 37,
    "license": "Personal",
    "rating": 4.5,
    "qualityScore": 90,
    "saves": 625,
    "dateAdded": "2026-02-22T02:13:59.878Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Notion",
      "Photoshop"
    ],
    "fileTypes": [
      ".ai",
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(244, 60%, 20%), hsl(177, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium web ui asset designed to elevate your next project. Built specifically for UI Kits workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "UI Kit",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "42.7 MB",
    "numberOfFiles": 45,
    "version": "1.1.0",
    "lastChecked": "2026-03-30T10:38:41.205Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-23",
    "title": "Premium Mobile UI 48",
    "description": "A high-end, premium mobile ui asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "Mobile UI",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "mobile-ui"
    ],
    "creator": "Notion",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 57,
    "license": "Extended",
    "rating": 4.6,
    "qualityScore": 90,
    "saves": 975,
    "dateAdded": "2026-03-31T19:26:03.377Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer"
    ],
    "fileTypes": [
      ".svg",
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(137, 60%, 20%), hsl(121, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium mobile ui asset designed to elevate your next project. Built specifically for UI Kits workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "UI Kit",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "230.9 MB",
    "numberOfFiles": 18,
    "version": "1.2.0",
    "lastChecked": "2026-02-02T14:25:13.408Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-24",
    "title": "Premium SaaS UI 8",
    "description": "A high-end, premium saas ui asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "SaaS UI",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "saas-ui"
    ],
    "creator": "Stripe",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 17,
    "license": "Personal",
    "rating": 4.1,
    "qualityScore": 94,
    "saves": 431,
    "dateAdded": "2026-02-18T12:15:01.544Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma",
      "Webflow",
      "Spline"
    ],
    "fileTypes": [
      ".png",
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(147, 60%, 20%), hsl(298, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium saas ui asset designed to elevate your next project. Built specifically for UI Kits workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "UI Kit",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "409.5 MB",
    "numberOfFiles": 32,
    "version": "1.3.0",
    "lastChecked": "2026-02-21T09:46:59.414Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-25",
    "title": "Premium Dashboard UI 86",
    "description": "A high-end, premium dashboard ui asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "Dashboard UI",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "dashboard-ui"
    ],
    "creator": "Linear",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.9,
    "qualityScore": 94,
    "saves": 283,
    "dateAdded": "2026-02-05T15:06:47.325Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop",
      "Webflow"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(273, 60%, 20%), hsl(171, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium dashboard ui asset designed to elevate your next project. Built specifically for UI Kits workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "UI Kit",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "505.2 MB",
    "numberOfFiles": 33,
    "version": "1.4.0",
    "lastChecked": "2026-04-02T02:59:10.445Z",
    "status": "Needs Review",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-26",
    "title": "Premium SaaS UI 62",
    "description": "A high-end, premium saas ui asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "SaaS UI",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "saas-ui"
    ],
    "creator": "Stripe",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.4,
    "qualityScore": 98,
    "saves": 831,
    "dateAdded": "2026-03-03T06:01:25.833Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Rive"
    ],
    "fileTypes": [
      ".blend",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(221, 60%, 20%), hsl(344, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium saas ui asset designed to elevate your next project. Built specifically for UI Kits workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "UI Kit",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "308.6 MB",
    "numberOfFiles": 44,
    "version": "1.0.0",
    "lastChecked": "2026-04-26T17:41:55.004Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-27",
    "title": "Premium Mobile UI 99",
    "description": "A high-end, premium mobile ui asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "Mobile UI",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "mobile-ui"
    ],
    "creator": "Apple",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 62,
    "license": "Extended",
    "rating": 4.7,
    "qualityScore": 98,
    "saves": 597,
    "dateAdded": "2026-01-30T14:07:51.514Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Photoshop"
    ],
    "fileTypes": [
      ".c4d",
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(96, 60%, 20%), hsl(208, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium mobile ui asset designed to elevate your next project. Built specifically for UI Kits workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "UI Kit",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "262.3 MB",
    "numberOfFiles": 39,
    "version": "1.1.0",
    "lastChecked": "2026-02-12T00:40:00.149Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-28",
    "title": "Premium SaaS UI 31",
    "description": "A high-end, premium saas ui asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "SaaS UI",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "saas-ui"
    ],
    "creator": "Stripe",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 50,
    "license": "Extended",
    "rating": 4.3,
    "qualityScore": 99,
    "saves": 818,
    "dateAdded": "2026-04-15T07:54:32.150Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "Framer",
      "Spline"
    ],
    "fileTypes": [
      ".psd",
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(10, 60%, 20%), hsl(112, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium saas ui asset designed to elevate your next project. Built specifically for UI Kits workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "UI Kit",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "109.2 MB",
    "numberOfFiles": 9,
    "version": "1.2.0",
    "lastChecked": "2026-04-05T07:15:04.877Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-29",
    "title": "Premium Mobile UI 82",
    "description": "A high-end, premium mobile ui asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "Mobile UI",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "mobile-ui"
    ],
    "creator": "Framer Team",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.7,
    "qualityScore": 97,
    "saves": 426,
    "dateAdded": "2026-03-09T12:02:24.422Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma",
      "Illustrator",
      "Blender"
    ],
    "fileTypes": [
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(73, 60%, 20%), hsl(90, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium mobile ui asset designed to elevate your next project. Built specifically for UI Kits workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "UI Kit",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "48.7 MB",
    "numberOfFiles": 13,
    "version": "1.3.0",
    "lastChecked": "2026-04-26T21:33:05.359Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-30",
    "title": "Premium Design Systems 68",
    "description": "A high-end, premium design systems asset designed to elevate your next project. Built specifically for UI Kits workflows.",
    "category": "UI Kits",
    "subcategory": "Design Systems",
    "tags": [
      "Premium",
      "Design",
      "ui kits",
      "design-systems"
    ],
    "creator": "Vercel",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 23,
    "license": "Commercial",
    "rating": 4.7,
    "qualityScore": 92,
    "saves": 710,
    "dateAdded": "2026-03-02T07:53:18.850Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Figma"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(196, 60%, 20%), hsl(185, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium design systems asset designed to elevate your next project. Built specifically for UI Kits workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "UI Kit",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "407.4 MB",
    "numberOfFiles": 38,
    "version": "1.4.0",
    "lastChecked": "2026-04-04T12:39:34.648Z",
    "status": "Needs Review",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-31",
    "title": "Premium Productivity 13",
    "description": "A high-end, premium productivity asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Productivity",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "productivity"
    ],
    "creator": "StudioX",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 27,
    "license": "Open Source",
    "rating": 5,
    "qualityScore": 91,
    "saves": 193,
    "dateAdded": "2026-01-06T15:52:16.419Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer"
    ],
    "fileTypes": [
      ".psd",
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(334, 60%, 20%), hsl(95, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium productivity asset designed to elevate your next project. Built specifically for Tools workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "22.6 MB",
    "numberOfFiles": 38,
    "version": "1.0.0",
    "lastChecked": "2026-04-08T12:14:06.433Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-32",
    "title": "Premium Developer Tools 9",
    "description": "A high-end, premium developer tools asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Developer Tools",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "developer-tools"
    ],
    "creator": "Creative",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 5,
    "qualityScore": 96,
    "saves": 476,
    "dateAdded": "2026-01-30T02:05:02.482Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop",
      "Blender"
    ],
    "fileTypes": [
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(9, 60%, 20%), hsl(125, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium developer tools asset designed to elevate your next project. Built specifically for Tools workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "342.2 MB",
    "numberOfFiles": 1,
    "version": "1.1.0",
    "lastChecked": "2026-03-27T14:26:13.779Z",
    "status": "Verified",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-33",
    "title": "Premium Developer Tools 95",
    "description": "A high-end, premium developer tools asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Developer Tools",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "developer-tools"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4,
    "qualityScore": 95,
    "saves": 907,
    "dateAdded": "2026-03-11T18:56:22.271Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "Framer"
    ],
    "fileTypes": [
      ".svg",
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(192, 60%, 20%), hsl(336, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium developer tools asset designed to elevate your next project. Built specifically for Tools workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "393.3 MB",
    "numberOfFiles": 26,
    "version": "1.2.0",
    "lastChecked": "2026-04-21T05:30:14.981Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-34",
    "title": "Premium Automation 91",
    "description": "A high-end, premium automation asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Automation",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "automation"
    ],
    "creator": "Stripe",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 10,
    "license": "Extended",
    "rating": 4.8,
    "qualityScore": 99,
    "saves": 435,
    "dateAdded": "2026-04-04T18:15:01.420Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender",
      "Webflow"
    ],
    "fileTypes": [
      ".blend",
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(7, 60%, 20%), hsl(116, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium automation asset designed to elevate your next project. Built specifically for Tools workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "351.5 MB",
    "numberOfFiles": 21,
    "version": "1.3.0",
    "lastChecked": "2026-01-15T04:58:12.381Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-35",
    "title": "Premium Automation 64",
    "description": "A high-end, premium automation asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Automation",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "automation"
    ],
    "creator": "Vercel",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 13,
    "license": "Commercial",
    "rating": 4.9,
    "qualityScore": 98,
    "saves": 287,
    "dateAdded": "2026-03-26T10:01:21.594Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator"
    ],
    "fileTypes": [
      ".psd",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(69, 60%, 20%), hsl(95, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium automation asset designed to elevate your next project. Built specifically for Tools workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "115.3 MB",
    "numberOfFiles": 22,
    "version": "1.4.0",
    "lastChecked": "2026-04-12T06:32:26.277Z",
    "status": "Needs Review",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-36",
    "title": "Premium Productivity 18",
    "description": "A high-end, premium productivity asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Productivity",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "productivity"
    ],
    "creator": "Vercel",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.5,
    "qualityScore": 98,
    "saves": 715,
    "dateAdded": "2026-02-06T16:19:26.200Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator",
      "Spline"
    ],
    "fileTypes": [
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(250, 60%, 20%), hsl(353, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium productivity asset designed to elevate your next project. Built specifically for Tools workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "174.9 MB",
    "numberOfFiles": 39,
    "version": "1.0.0",
    "lastChecked": "2026-02-14T05:41:14.115Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-37",
    "title": "Premium Design Tools 54",
    "description": "A high-end, premium design tools asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Design Tools",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "design-tools"
    ],
    "creator": "Olsz",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 40,
    "license": "Commercial",
    "rating": 4.7,
    "qualityScore": 96,
    "saves": 440,
    "dateAdded": "2026-04-03T04:25:13.892Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator",
      "Blender",
      "Framer"
    ],
    "fileTypes": [
      ".svg",
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(61, 60%, 20%), hsl(104, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium design tools asset designed to elevate your next project. Built specifically for Tools workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "375.3 MB",
    "numberOfFiles": 44,
    "version": "1.1.0",
    "lastChecked": "2026-03-03T19:56:17.719Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-38",
    "title": "Premium Developer Tools 50",
    "description": "A high-end, premium developer tools asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Developer Tools",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "developer-tools"
    ],
    "creator": "Linear",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 80,
    "license": "Open Source",
    "rating": 4.1,
    "qualityScore": 95,
    "saves": 267,
    "dateAdded": "2026-02-11T22:47:40.895Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "After Effects",
      "Notion"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(253, 60%, 20%), hsl(205, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium developer tools asset designed to elevate your next project. Built specifically for Tools workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "243.9 MB",
    "numberOfFiles": 26,
    "version": "1.2.0",
    "lastChecked": "2026-02-16T05:12:51.499Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-39",
    "title": "Premium Productivity 90",
    "description": "A high-end, premium productivity asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Productivity",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "productivity"
    ],
    "creator": "Olsz",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.5,
    "qualityScore": 93,
    "saves": 1022,
    "dateAdded": "2026-04-05T11:25:15.068Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D",
      "Rive",
      "Spline"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(218, 60%, 20%), hsl(314, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium productivity asset designed to elevate your next project. Built specifically for Tools workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "404.9 MB",
    "numberOfFiles": 50,
    "version": "1.3.0",
    "lastChecked": "2026-04-03T06:02:12.581Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-40",
    "title": "Premium Automation 58",
    "description": "A high-end, premium automation asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Automation",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "automation"
    ],
    "creator": "Framer Team",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.9,
    "qualityScore": 90,
    "saves": 392,
    "dateAdded": "2026-02-25T16:09:56.618Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop",
      "Spline",
      "Cinema 4D"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(62, 60%, 20%), hsl(113, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium automation asset designed to elevate your next project. Built specifically for Tools workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "234.9 MB",
    "numberOfFiles": 47,
    "version": "1.4.0",
    "lastChecked": "2026-01-10T09:00:22.312Z",
    "status": "Needs Review",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-41",
    "title": "Premium Automation 10",
    "description": "A high-end, premium automation asset designed to elevate your next project. Built specifically for Tools workflows.",
    "category": "Tools",
    "subcategory": "Automation",
    "tags": [
      "Premium",
      "Design",
      "tools",
      "automation"
    ],
    "creator": "Olsz",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 72,
    "license": "Commercial",
    "rating": 5,
    "qualityScore": 98,
    "saves": 906,
    "dateAdded": "2026-04-06T21:28:08.881Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Spline",
      "Blender",
      "Rive"
    ],
    "fileTypes": [
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(221, 60%, 20%), hsl(201, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium automation asset designed to elevate your next project. Built specifically for Tools workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "32.9 MB",
    "numberOfFiles": 3,
    "version": "1.0.0",
    "lastChecked": "2026-04-03T18:53:30.601Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-42",
    "title": "Premium Webflow 70",
    "description": "A high-end, premium webflow asset designed to elevate your next project. Built specifically for Templates workflows.",
    "category": "Templates",
    "subcategory": "Webflow",
    "tags": [
      "Premium",
      "Design",
      "templates",
      "webflow"
    ],
    "creator": "Apple",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 81,
    "license": "Open Source",
    "rating": 4,
    "qualityScore": 90,
    "saves": 333,
    "dateAdded": "2026-01-31T05:17:47.643Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "After Effects",
      "Figma"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(324, 60%, 20%), hsl(185, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium webflow asset designed to elevate your next project. Built specifically for Templates workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "136.4 MB",
    "numberOfFiles": 43,
    "version": "1.1.0",
    "lastChecked": "2026-03-01T05:46:04.467Z",
    "status": "Verified",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-43",
    "title": "Premium Figma 68",
    "description": "A high-end, premium figma asset designed to elevate your next project. Built specifically for Templates workflows.",
    "category": "Templates",
    "subcategory": "Figma",
    "tags": [
      "Premium",
      "Design",
      "templates",
      "figma"
    ],
    "creator": "Stripe",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 52,
    "license": "Extended",
    "rating": 4.5,
    "qualityScore": 92,
    "saves": 947,
    "dateAdded": "2026-04-02T21:11:04.380Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Photoshop",
      "Figma"
    ],
    "fileTypes": [
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(52, 60%, 20%), hsl(3, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium figma asset designed to elevate your next project. Built specifically for Templates workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "77.9 MB",
    "numberOfFiles": 29,
    "version": "1.2.0",
    "lastChecked": "2026-03-22T16:12:14.953Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-44",
    "title": "Premium Webflow 7",
    "description": "A high-end, premium webflow asset designed to elevate your next project. Built specifically for Templates workflows.",
    "category": "Templates",
    "subcategory": "Webflow",
    "tags": [
      "Premium",
      "Design",
      "templates",
      "webflow"
    ],
    "creator": "Creative",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 32,
    "license": "Commercial",
    "rating": 4.5,
    "qualityScore": 96,
    "saves": 260,
    "dateAdded": "2026-02-07T11:46:11.718Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(162, 60%, 20%), hsl(208, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium webflow asset designed to elevate your next project. Built specifically for Templates workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "450.9 MB",
    "numberOfFiles": 36,
    "version": "1.3.0",
    "lastChecked": "2026-04-12T16:53:45.349Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-45",
    "title": "Premium Notion 84",
    "description": "A high-end, premium notion asset designed to elevate your next project. Built specifically for Templates workflows.",
    "category": "Templates",
    "subcategory": "Notion",
    "tags": [
      "Premium",
      "Design",
      "templates",
      "notion"
    ],
    "creator": "Framer Team",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 46,
    "license": "Open Source",
    "rating": 4.9,
    "qualityScore": 97,
    "saves": 1041,
    "dateAdded": "2026-01-31T11:02:22.018Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects",
      "Framer",
      "Rive"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(31, 60%, 20%), hsl(111, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium notion asset designed to elevate your next project. Built specifically for Templates workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "21.3 MB",
    "numberOfFiles": 27,
    "version": "1.4.0",
    "lastChecked": "2026-02-12T10:16:02.239Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-46",
    "title": "Premium Presentations 12",
    "description": "A high-end, premium presentations asset designed to elevate your next project. Built specifically for Templates workflows.",
    "category": "Templates",
    "subcategory": "Presentations",
    "tags": [
      "Premium",
      "Design",
      "templates",
      "presentations"
    ],
    "creator": "Stripe",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 19,
    "license": "Open Source",
    "rating": 4.8,
    "qualityScore": 92,
    "saves": 716,
    "dateAdded": "2026-02-01T08:21:04.995Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator",
      "Photoshop",
      "After Effects"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(292, 60%, 20%), hsl(281, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium presentations asset designed to elevate your next project. Built specifically for Templates workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "208.1 MB",
    "numberOfFiles": 48,
    "version": "1.0.0",
    "lastChecked": "2026-01-11T17:25:52.070Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-47",
    "title": "Premium Presentations 9",
    "description": "A high-end, premium presentations asset designed to elevate your next project. Built specifically for Templates workflows.",
    "category": "Templates",
    "subcategory": "Presentations",
    "tags": [
      "Premium",
      "Design",
      "templates",
      "presentations"
    ],
    "creator": "Notion",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.9,
    "qualityScore": 96,
    "saves": 648,
    "dateAdded": "2026-04-20T06:01:00.915Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop",
      "Rive"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(170, 60%, 20%), hsl(336, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium presentations asset designed to elevate your next project. Built specifically for Templates workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "180.8 MB",
    "numberOfFiles": 33,
    "version": "1.1.0",
    "lastChecked": "2026-01-22T12:07:39.427Z",
    "status": "Verified",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-48",
    "title": "Premium Portfolio 43",
    "description": "A high-end, premium portfolio asset designed to elevate your next project. Built specifically for Templates workflows.",
    "category": "Templates",
    "subcategory": "Portfolio",
    "tags": [
      "Premium",
      "Design",
      "templates",
      "portfolio"
    ],
    "creator": "Creative",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 54,
    "license": "Extended",
    "rating": 4.1,
    "qualityScore": 91,
    "saves": 242,
    "dateAdded": "2026-01-25T14:13:44.985Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma"
    ],
    "fileTypes": [
      ".zip",
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(173, 60%, 20%), hsl(318, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium portfolio asset designed to elevate your next project. Built specifically for Templates workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "449.3 MB",
    "numberOfFiles": 23,
    "version": "1.2.0",
    "lastChecked": "2026-02-03T18:56:26.679Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-49",
    "title": "Premium Framer 65",
    "description": "A high-end, premium framer asset designed to elevate your next project. Built specifically for Templates workflows.",
    "category": "Templates",
    "subcategory": "Framer",
    "tags": [
      "Premium",
      "Design",
      "templates",
      "framer"
    ],
    "creator": "Stripe",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.5,
    "qualityScore": 95,
    "saves": 629,
    "dateAdded": "2026-03-02T15:09:08.144Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator",
      "Spline",
      "Photoshop"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(127, 60%, 20%), hsl(116, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium framer asset designed to elevate your next project. Built specifically for Templates workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "82.6 MB",
    "numberOfFiles": 15,
    "version": "1.3.0",
    "lastChecked": "2026-02-07T00:09:49.286Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-50",
    "title": "Premium Figma 83",
    "description": "A high-end, premium figma asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "Figma",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "figma"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 53,
    "license": "Commercial",
    "rating": 4.3,
    "qualityScore": 99,
    "saves": 836,
    "dateAdded": "2026-02-01T21:00:20.314Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Rive"
    ],
    "fileTypes": [
      ".ai",
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(162, 60%, 20%), hsl(133, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium figma asset designed to elevate your next project. Built specifically for Courses workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "507.0 MB",
    "numberOfFiles": 33,
    "version": "1.4.0",
    "lastChecked": "2026-04-28T19:40:19.796Z",
    "status": "Needs Review",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-51",
    "title": "Premium Figma 98",
    "description": "A high-end, premium figma asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "Figma",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "figma"
    ],
    "creator": "StudioX",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 29,
    "license": "Extended",
    "rating": 4.2,
    "qualityScore": 92,
    "saves": 595,
    "dateAdded": "2026-03-05T11:48:26.224Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender",
      "Photoshop"
    ],
    "fileTypes": [
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(83, 60%, 20%), hsl(25, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium figma asset designed to elevate your next project. Built specifically for Courses workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "340.6 MB",
    "numberOfFiles": 13,
    "version": "1.0.0",
    "lastChecked": "2026-01-22T11:18:21.678Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-52",
    "title": "Premium 3D 85",
    "description": "A high-end, premium 3d asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "3D",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "3d"
    ],
    "creator": "Apple",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 60,
    "license": "Extended",
    "rating": 4.2,
    "qualityScore": 91,
    "saves": 511,
    "dateAdded": "2026-02-10T02:19:59.880Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "Cinema 4D"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(123, 60%, 20%), hsl(295, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium 3d asset designed to elevate your next project. Built specifically for Courses workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "141.1 MB",
    "numberOfFiles": 22,
    "version": "1.1.0",
    "lastChecked": "2026-02-05T06:56:39.080Z",
    "status": "Verified",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-53",
    "title": "Premium UI/UX 26",
    "description": "A high-end, premium ui/ux asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "UI/UX",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "ui/ux"
    ],
    "creator": "Olsz",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.9,
    "qualityScore": 90,
    "saves": 506,
    "dateAdded": "2026-04-27T12:51:45.932Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion"
    ],
    "fileTypes": [
      ".png",
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(257, 60%, 20%), hsl(178, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium ui/ux asset designed to elevate your next project. Built specifically for Courses workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "167.6 MB",
    "numberOfFiles": 25,
    "version": "1.2.0",
    "lastChecked": "2026-01-23T17:45:03.112Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-54",
    "title": "Premium Branding 67",
    "description": "A high-end, premium branding asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "Branding",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "branding"
    ],
    "creator": "Creative",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 30,
    "license": "Extended",
    "rating": 4.9,
    "qualityScore": 93,
    "saves": 943,
    "dateAdded": "2026-01-26T05:17:06.473Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects",
      "Illustrator",
      "Spline"
    ],
    "fileTypes": [
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(74, 60%, 20%), hsl(353, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium branding asset designed to elevate your next project. Built specifically for Courses workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "126.7 MB",
    "numberOfFiles": 38,
    "version": "1.3.0",
    "lastChecked": "2026-04-09T01:15:24.581Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-55",
    "title": "Premium Branding 34",
    "description": "A high-end, premium branding asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "Branding",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "branding"
    ],
    "creator": "Apple",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.8,
    "qualityScore": 99,
    "saves": 653,
    "dateAdded": "2026-02-05T00:15:14.704Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer"
    ],
    "fileTypes": [
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(216, 60%, 20%), hsl(107, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium branding asset designed to elevate your next project. Built specifically for Courses workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "302.8 MB",
    "numberOfFiles": 9,
    "version": "1.4.0",
    "lastChecked": "2026-02-12T23:13:45.601Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-56",
    "title": "Premium UI/UX 93",
    "description": "A high-end, premium ui/ux asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "UI/UX",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "ui/ux"
    ],
    "creator": "Framer Team",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.2,
    "qualityScore": 98,
    "saves": 371,
    "dateAdded": "2026-02-05T15:31:36.018Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma",
      "Webflow"
    ],
    "fileTypes": [
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(268, 60%, 20%), hsl(338, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium ui/ux asset designed to elevate your next project. Built specifically for Courses workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "170.2 MB",
    "numberOfFiles": 28,
    "version": "1.0.0",
    "lastChecked": "2026-03-30T01:23:29.620Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-57",
    "title": "Premium Framer 49",
    "description": "A high-end, premium framer asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "Framer",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "framer"
    ],
    "creator": "Apple",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 26,
    "license": "Commercial",
    "rating": 4.3,
    "qualityScore": 92,
    "saves": 946,
    "dateAdded": "2026-01-14T17:09:03.625Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow",
      "Spline"
    ],
    "fileTypes": [
      ".psd",
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(27, 60%, 20%), hsl(82, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium framer asset designed to elevate your next project. Built specifically for Courses workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "493.2 MB",
    "numberOfFiles": 37,
    "version": "1.1.0",
    "lastChecked": "2026-03-20T11:08:41.795Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-58",
    "title": "Premium Framer 39",
    "description": "A high-end, premium framer asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "Framer",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "framer"
    ],
    "creator": "Vercel",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 28,
    "license": "Open Source",
    "rating": 4.3,
    "qualityScore": 99,
    "saves": 1076,
    "dateAdded": "2026-03-31T14:50:15.146Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(183, 60%, 20%), hsl(334, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium framer asset designed to elevate your next project. Built specifically for Courses workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "290.2 MB",
    "numberOfFiles": 20,
    "version": "1.2.0",
    "lastChecked": "2026-02-25T00:54:18.421Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-59",
    "title": "Premium UI/UX 78",
    "description": "A high-end, premium ui/ux asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "UI/UX",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "ui/ux"
    ],
    "creator": "StudioX",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 83,
    "license": "Extended",
    "rating": 4.3,
    "qualityScore": 95,
    "saves": 681,
    "dateAdded": "2026-03-18T19:55:32.016Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Blender",
      "Illustrator"
    ],
    "fileTypes": [
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(175, 60%, 20%), hsl(154, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium ui/ux asset designed to elevate your next project. Built specifically for Courses workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "287.9 MB",
    "numberOfFiles": 37,
    "version": "1.3.0",
    "lastChecked": "2026-01-31T13:22:45.585Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-60",
    "title": "Premium Branding 69",
    "description": "A high-end, premium branding asset designed to elevate your next project. Built specifically for Courses workflows.",
    "category": "Courses",
    "subcategory": "Branding",
    "tags": [
      "Premium",
      "Design",
      "courses",
      "branding"
    ],
    "creator": "Creative",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 57,
    "license": "Extended",
    "rating": 4.2,
    "qualityScore": 97,
    "saves": 260,
    "dateAdded": "2026-01-23T21:01:49.095Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender"
    ],
    "fileTypes": [
      ".zip",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(301, 60%, 20%), hsl(173, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium branding asset designed to elevate your next project. Built specifically for Courses workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "484.3 MB",
    "numberOfFiles": 9,
    "version": "1.4.0",
    "lastChecked": "2026-04-08T10:31:35.274Z",
    "status": "Needs Review",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-61",
    "title": "Premium Creativity 79",
    "description": "A high-end, premium creativity asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Creativity",
    "tags": [
      "Premium",
      "Design",
      "books",
      "creativity"
    ],
    "creator": "Framer Team",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 35,
    "license": "Personal",
    "rating": 4.1,
    "qualityScore": 92,
    "saves": 781,
    "dateAdded": "2026-03-16T20:28:02.426Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(76, 60%, 20%), hsl(142, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium creativity asset designed to elevate your next project. Built specifically for Books workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "204.3 MB",
    "numberOfFiles": 22,
    "version": "1.0.0",
    "lastChecked": "2026-01-18T02:08:44.411Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-62",
    "title": "Premium Typography 98",
    "description": "A high-end, premium typography asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Typography",
    "tags": [
      "Premium",
      "Design",
      "books",
      "typography"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 59,
    "license": "Extended",
    "rating": 4.8,
    "qualityScore": 92,
    "saves": 357,
    "dateAdded": "2026-03-05T20:00:09.141Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop",
      "Spline",
      "Notion"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(333, 60%, 20%), hsl(50, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium typography asset designed to elevate your next project. Built specifically for Books workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "350.8 MB",
    "numberOfFiles": 3,
    "version": "1.1.0",
    "lastChecked": "2026-02-23T22:11:30.259Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-63",
    "title": "Premium Creativity 38",
    "description": "A high-end, premium creativity asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Creativity",
    "tags": [
      "Premium",
      "Design",
      "books",
      "creativity"
    ],
    "creator": "StudioX",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 25,
    "license": "Commercial",
    "rating": 4.8,
    "qualityScore": 97,
    "saves": 814,
    "dateAdded": "2026-04-12T13:20:28.226Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(337, 60%, 20%), hsl(125, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium creativity asset designed to elevate your next project. Built specifically for Books workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "315.5 MB",
    "numberOfFiles": 24,
    "version": "1.2.0",
    "lastChecked": "2026-04-09T01:19:49.080Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-64",
    "title": "Premium Business 43",
    "description": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Business",
    "tags": [
      "Premium",
      "Design",
      "books",
      "business"
    ],
    "creator": "StudioX",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.5,
    "qualityScore": 95,
    "saves": 669,
    "dateAdded": "2026-04-18T11:56:58.810Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(63, 60%, 20%), hsl(63, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "161.8 MB",
    "numberOfFiles": 12,
    "version": "1.3.0",
    "lastChecked": "2026-03-13T05:16:45.041Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-65",
    "title": "Premium Product Design 59",
    "description": "A high-end, premium product design asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Product Design",
    "tags": [
      "Premium",
      "Design",
      "books",
      "product-design"
    ],
    "creator": "Linear",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 63,
    "license": "Open Source",
    "rating": 4.1,
    "qualityScore": 90,
    "saves": 658,
    "dateAdded": "2026-04-21T22:28:34.031Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(55, 60%, 20%), hsl(248, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium product design asset designed to elevate your next project. Built specifically for Books workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "254.7 MB",
    "numberOfFiles": 7,
    "version": "1.4.0",
    "lastChecked": "2026-01-26T04:43:18.637Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-66",
    "title": "Premium Business 38",
    "description": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Business",
    "tags": [
      "Premium",
      "Design",
      "books",
      "business"
    ],
    "creator": "Creative",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 37,
    "license": "Extended",
    "rating": 4.6,
    "qualityScore": 95,
    "saves": 471,
    "dateAdded": "2026-04-28T01:04:37.104Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(186, 60%, 20%), hsl(0, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "245.7 MB",
    "numberOfFiles": 4,
    "version": "1.0.0",
    "lastChecked": "2026-04-20T07:27:10.991Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-67",
    "title": "Premium Creativity 20",
    "description": "A high-end, premium creativity asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Creativity",
    "tags": [
      "Premium",
      "Design",
      "books",
      "creativity"
    ],
    "creator": "Linear",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.6,
    "qualityScore": 92,
    "saves": 1050,
    "dateAdded": "2026-04-27T13:26:30.536Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects"
    ],
    "fileTypes": [
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(246, 60%, 20%), hsl(234, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium creativity asset designed to elevate your next project. Built specifically for Books workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "384.4 MB",
    "numberOfFiles": 37,
    "version": "1.1.0",
    "lastChecked": "2026-04-22T11:27:54.634Z",
    "status": "Verified",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-68",
    "title": "Premium Business 12",
    "description": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Business",
    "tags": [
      "Premium",
      "Design",
      "books",
      "business"
    ],
    "creator": "Notion",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 32,
    "license": "Commercial",
    "rating": 4.6,
    "qualityScore": 90,
    "saves": 946,
    "dateAdded": "2026-03-20T20:36:37.022Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "Framer",
      "Webflow"
    ],
    "fileTypes": [
      ".c4d",
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(67, 60%, 20%), hsl(141, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "209.5 MB",
    "numberOfFiles": 31,
    "version": "1.2.0",
    "lastChecked": "2026-01-06T20:30:48.363Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-69",
    "title": "Premium Typography 98",
    "description": "A high-end, premium typography asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Typography",
    "tags": [
      "Premium",
      "Design",
      "books",
      "typography"
    ],
    "creator": "Apple",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 58,
    "license": "Open Source",
    "rating": 4.6,
    "qualityScore": 91,
    "saves": 591,
    "dateAdded": "2026-03-04T01:41:51.694Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects"
    ],
    "fileTypes": [
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(108, 60%, 20%), hsl(157, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium typography asset designed to elevate your next project. Built specifically for Books workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "89.0 MB",
    "numberOfFiles": 6,
    "version": "1.3.0",
    "lastChecked": "2026-02-26T13:37:10.237Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-70",
    "title": "Premium Business 21",
    "description": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Business",
    "tags": [
      "Premium",
      "Design",
      "books",
      "business"
    ],
    "creator": "Vercel",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.6,
    "qualityScore": 98,
    "saves": 703,
    "dateAdded": "2026-03-01T03:59:34.883Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator",
      "Webflow"
    ],
    "fileTypes": [
      ".blend",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(76, 60%, 20%), hsl(64, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "366.9 MB",
    "numberOfFiles": 38,
    "version": "1.4.0",
    "lastChecked": "2026-02-05T21:49:45.879Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-71",
    "title": "Premium Product Design 40",
    "description": "A high-end, premium product design asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Product Design",
    "tags": [
      "Premium",
      "Design",
      "books",
      "product-design"
    ],
    "creator": "Creative",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4,
    "qualityScore": 91,
    "saves": 1084,
    "dateAdded": "2026-03-31T07:04:17.879Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "Blender"
    ],
    "fileTypes": [
      ".png",
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(340, 60%, 20%), hsl(217, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium product design asset designed to elevate your next project. Built specifically for Books workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "184.4 MB",
    "numberOfFiles": 27,
    "version": "1.0.0",
    "lastChecked": "2026-01-24T09:07:30.696Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-72",
    "title": "Premium Business 65",
    "description": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows.",
    "category": "Books",
    "subcategory": "Business",
    "tags": [
      "Premium",
      "Design",
      "books",
      "business"
    ],
    "creator": "Notion",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 31,
    "license": "Personal",
    "rating": 4.3,
    "qualityScore": 90,
    "saves": 159,
    "dateAdded": "2026-03-12T02:55:06.697Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator",
      "Photoshop"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(291, 60%, 20%), hsl(61, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium business asset designed to elevate your next project. Built specifically for Books workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "252.0 MB",
    "numberOfFiles": 45,
    "version": "1.1.0",
    "lastChecked": "2026-04-17T13:10:34.717Z",
    "status": "Verified",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-73",
    "title": "Premium 3D Icons 7",
    "description": "A high-end, premium 3d icons asset designed to elevate your next project. Built specifically for Icons workflows.",
    "category": "Icons",
    "subcategory": "3D Icons",
    "tags": [
      "Premium",
      "Design",
      "icons",
      "3d-icons"
    ],
    "creator": "Apple",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 80,
    "license": "Commercial",
    "rating": 4,
    "qualityScore": 94,
    "saves": 667,
    "dateAdded": "2026-01-11T21:37:20.610Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(92, 60%, 20%), hsl(45, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium 3d icons asset designed to elevate your next project. Built specifically for Icons workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "360.3 MB",
    "numberOfFiles": 35,
    "version": "1.2.0",
    "lastChecked": "2026-02-18T17:47:33.834Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-74",
    "title": "Premium Animated Icons 22",
    "description": "A high-end, premium animated icons asset designed to elevate your next project. Built specifically for Icons workflows.",
    "category": "Icons",
    "subcategory": "Animated Icons",
    "tags": [
      "Premium",
      "Design",
      "icons",
      "animated-icons"
    ],
    "creator": "Olsz",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.5,
    "qualityScore": 90,
    "saves": 978,
    "dateAdded": "2026-03-24T21:46:26.695Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D",
      "Spline",
      "Figma"
    ],
    "fileTypes": [
      ".ai",
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(118, 60%, 20%), hsl(3, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium animated icons asset designed to elevate your next project. Built specifically for Icons workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "102.7 MB",
    "numberOfFiles": 14,
    "version": "1.3.0",
    "lastChecked": "2026-04-23T12:10:48.380Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-75",
    "title": "Premium Animated Icons 8",
    "description": "A high-end, premium animated icons asset designed to elevate your next project. Built specifically for Icons workflows.",
    "category": "Icons",
    "subcategory": "Animated Icons",
    "tags": [
      "Premium",
      "Design",
      "icons",
      "animated-icons"
    ],
    "creator": "Linear",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4,
    "qualityScore": 97,
    "saves": 452,
    "dateAdded": "2026-02-20T07:52:16.154Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects",
      "Rive"
    ],
    "fileTypes": [
      ".ai",
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(103, 60%, 20%), hsl(227, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium animated icons asset designed to elevate your next project. Built specifically for Icons workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "440.7 MB",
    "numberOfFiles": 28,
    "version": "1.4.0",
    "lastChecked": "2026-01-19T01:58:16.960Z",
    "status": "Needs Review",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-76",
    "title": "Premium App Icons 97",
    "description": "A high-end, premium app icons asset designed to elevate your next project. Built specifically for Icons workflows.",
    "category": "Icons",
    "subcategory": "App Icons",
    "tags": [
      "Premium",
      "Design",
      "icons",
      "app-icons"
    ],
    "creator": "StudioX",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.3,
    "qualityScore": 93,
    "saves": 449,
    "dateAdded": "2026-04-20T01:30:55.843Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator"
    ],
    "fileTypes": [
      ".fig",
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(313, 60%, 20%), hsl(202, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium app icons asset designed to elevate your next project. Built specifically for Icons workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "408.2 MB",
    "numberOfFiles": 19,
    "version": "1.0.0",
    "lastChecked": "2026-03-18T15:22:47.980Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-77",
    "title": "Premium Outline 64",
    "description": "A high-end, premium outline asset designed to elevate your next project. Built specifically for Icons workflows.",
    "category": "Icons",
    "subcategory": "Outline",
    "tags": [
      "Premium",
      "Design",
      "icons",
      "outline"
    ],
    "creator": "Apple",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.9,
    "qualityScore": 94,
    "saves": 986,
    "dateAdded": "2026-04-04T04:53:15.533Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion",
      "Rive",
      "Illustrator"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(105, 60%, 20%), hsl(207, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium outline asset designed to elevate your next project. Built specifically for Icons workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "63.8 MB",
    "numberOfFiles": 19,
    "version": "1.1.0",
    "lastChecked": "2026-04-20T01:16:01.574Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-78",
    "title": "Premium 3D Icons 61",
    "description": "A high-end, premium 3d icons asset designed to elevate your next project. Built specifically for Icons workflows.",
    "category": "Icons",
    "subcategory": "3D Icons",
    "tags": [
      "Premium",
      "Design",
      "icons",
      "3d-icons"
    ],
    "creator": "StudioX",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.9,
    "qualityScore": 97,
    "saves": 429,
    "dateAdded": "2026-02-27T02:57:20.809Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop"
    ],
    "fileTypes": [
      ".blend",
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(21, 60%, 20%), hsl(239, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium 3d icons asset designed to elevate your next project. Built specifically for Icons workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "346.6 MB",
    "numberOfFiles": 12,
    "version": "1.2.0",
    "lastChecked": "2026-04-04T09:39:58.862Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-79",
    "title": "Premium App Icons 91",
    "description": "A high-end, premium app icons asset designed to elevate your next project. Built specifically for Icons workflows.",
    "category": "Icons",
    "subcategory": "App Icons",
    "tags": [
      "Premium",
      "Design",
      "icons",
      "app-icons"
    ],
    "creator": "Framer Team",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 81,
    "license": "Open Source",
    "rating": 4.6,
    "qualityScore": 98,
    "saves": 108,
    "dateAdded": "2026-03-28T17:02:32.654Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(86, 60%, 20%), hsl(313, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium app icons asset designed to elevate your next project. Built specifically for Icons workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "11.0 MB",
    "numberOfFiles": 19,
    "version": "1.3.0",
    "lastChecked": "2026-04-20T17:03:48.107Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-80",
    "title": "Premium App Icons 83",
    "description": "A high-end, premium app icons asset designed to elevate your next project. Built specifically for Icons workflows.",
    "category": "Icons",
    "subcategory": "App Icons",
    "tags": [
      "Premium",
      "Design",
      "icons",
      "app-icons"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.4,
    "qualityScore": 90,
    "saves": 1022,
    "dateAdded": "2026-03-28T19:04:58.211Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D",
      "Spline",
      "Webflow"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(41, 60%, 20%), hsl(241, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium app icons asset designed to elevate your next project. Built specifically for Icons workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "13.3 MB",
    "numberOfFiles": 34,
    "version": "1.4.0",
    "lastChecked": "2026-04-10T04:48:42.443Z",
    "status": "Needs Review",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-81",
    "title": "Premium Abstract Scenes 69",
    "description": "A high-end, premium abstract scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Abstract Scenes",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "abstract-scenes"
    ],
    "creator": "StudioX",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 69,
    "license": "Open Source",
    "rating": 4.1,
    "qualityScore": 98,
    "saves": 965,
    "dateAdded": "2026-03-27T16:21:15.315Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(123, 60%, 20%), hsl(83, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium abstract scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "72.4 MB",
    "numberOfFiles": 35,
    "version": "1.0.0",
    "lastChecked": "2026-01-21T02:32:07.234Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-82",
    "title": "Premium Cinema 4D 47",
    "description": "A high-end, premium cinema 4d asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Cinema 4D",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "cinema-4d"
    ],
    "creator": "Stripe",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.1,
    "qualityScore": 91,
    "saves": 930,
    "dateAdded": "2026-03-02T21:58:55.337Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow",
      "After Effects"
    ],
    "fileTypes": [
      ".ai",
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(282, 60%, 20%), hsl(276, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium cinema 4d asset designed to elevate your next project. Built specifically for 3D Assets workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "227.9 MB",
    "numberOfFiles": 21,
    "version": "1.1.0",
    "lastChecked": "2026-02-02T02:16:35.975Z",
    "status": "Verified",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-83",
    "title": "Premium Product Scenes 85",
    "description": "A high-end, premium product scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Product Scenes",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "product-scenes"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.8,
    "qualityScore": 94,
    "saves": 965,
    "dateAdded": "2026-01-11T16:14:59.841Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop"
    ],
    "fileTypes": [
      ".fig",
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(246, 60%, 20%), hsl(42, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium product scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "144.8 MB",
    "numberOfFiles": 14,
    "version": "1.2.0",
    "lastChecked": "2026-03-30T11:59:22.907Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-84",
    "title": "Premium Cinema 4D 82",
    "description": "A high-end, premium cinema 4d asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Cinema 4D",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "cinema-4d"
    ],
    "creator": "Framer Team",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.9,
    "qualityScore": 95,
    "saves": 595,
    "dateAdded": "2026-04-15T06:53:02.148Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Spline",
      "Rive",
      "Webflow"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(277, 60%, 20%), hsl(335, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium cinema 4d asset designed to elevate your next project. Built specifically for 3D Assets workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "148.8 MB",
    "numberOfFiles": 24,
    "version": "1.3.0",
    "lastChecked": "2026-03-12T02:39:44.368Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-85",
    "title": "Premium Lighting 58",
    "description": "A high-end, premium lighting asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Lighting",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "lighting"
    ],
    "creator": "Framer Team",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 5,
    "qualityScore": 92,
    "saves": 397,
    "dateAdded": "2026-01-20T22:01:58.872Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Spline"
    ],
    "fileTypes": [
      ".blend",
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(77, 60%, 20%), hsl(303, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium lighting asset designed to elevate your next project. Built specifically for 3D Assets workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "326.2 MB",
    "numberOfFiles": 38,
    "version": "1.4.0",
    "lastChecked": "2026-04-16T02:28:45.144Z",
    "status": "Needs Review",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-86",
    "title": "Premium Blender 94",
    "description": "A high-end, premium blender asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Blender",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "blender"
    ],
    "creator": "Notion",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 19,
    "license": "Extended",
    "rating": 4,
    "qualityScore": 98,
    "saves": 1050,
    "dateAdded": "2026-01-27T19:53:31.903Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Illustrator"
    ],
    "fileTypes": [
      ".png",
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(255, 60%, 20%), hsl(187, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium blender asset designed to elevate your next project. Built specifically for 3D Assets workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "456.8 MB",
    "numberOfFiles": 32,
    "version": "1.0.0",
    "lastChecked": "2026-04-22T17:02:49.967Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-87",
    "title": "Premium Abstract Scenes 20",
    "description": "A high-end, premium abstract scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Abstract Scenes",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "abstract-scenes"
    ],
    "creator": "Notion",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 35,
    "license": "Commercial",
    "rating": 4.8,
    "qualityScore": 97,
    "saves": 813,
    "dateAdded": "2026-04-23T11:34:15.237Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop"
    ],
    "fileTypes": [
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(68, 60%, 20%), hsl(223, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium abstract scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "131.4 MB",
    "numberOfFiles": 1,
    "version": "1.1.0",
    "lastChecked": "2026-03-04T22:41:31.859Z",
    "status": "Verified",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-88",
    "title": "Premium Abstract Scenes 82",
    "description": "A high-end, premium abstract scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Abstract Scenes",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "abstract-scenes"
    ],
    "creator": "Stripe",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.7,
    "qualityScore": 99,
    "saves": 385,
    "dateAdded": "2026-04-15T20:58:55.333Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D",
      "Spline"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(182, 60%, 20%), hsl(48, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium abstract scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "367.1 MB",
    "numberOfFiles": 42,
    "version": "1.2.0",
    "lastChecked": "2026-01-31T18:28:28.693Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-89",
    "title": "Premium Product Scenes 44",
    "description": "A high-end, premium product scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows.",
    "category": "3D Assets",
    "subcategory": "Product Scenes",
    "tags": [
      "Premium",
      "Design",
      "3d assets",
      "product-scenes"
    ],
    "creator": "Framer Team",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 27,
    "license": "Personal",
    "rating": 4.6,
    "qualityScore": 91,
    "saves": 809,
    "dateAdded": "2026-03-18T20:24:30.720Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma",
      "Spline"
    ],
    "fileTypes": [
      ".zip",
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(109, 60%, 20%), hsl(135, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium product scenes asset designed to elevate your next project. Built specifically for 3D Assets workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "310.4 MB",
    "numberOfFiles": 7,
    "version": "1.3.0",
    "lastChecked": "2026-04-12T19:04:50.558Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-90",
    "title": "Premium Color Palettes 83",
    "description": "A high-end, premium color palettes asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Color Palettes",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "color-palettes"
    ],
    "creator": "Creative",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 33,
    "license": "Open Source",
    "rating": 4.2,
    "qualityScore": 96,
    "saves": 630,
    "dateAdded": "2026-02-05T17:08:17.456Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender",
      "After Effects"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(126, 60%, 20%), hsl(248, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium color palettes asset designed to elevate your next project. Built specifically for Branding workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "131.7 MB",
    "numberOfFiles": 13,
    "version": "1.4.0",
    "lastChecked": "2026-01-10T01:12:12.869Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-91",
    "title": "Premium Brand Systems 32",
    "description": "A high-end, premium brand systems asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Brand Systems",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "brand-systems"
    ],
    "creator": "Vercel",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.7,
    "qualityScore": 98,
    "saves": 210,
    "dateAdded": "2026-02-03T21:40:03.806Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(106, 60%, 20%), hsl(140, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium brand systems asset designed to elevate your next project. Built specifically for Branding workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "482.2 MB",
    "numberOfFiles": 50,
    "version": "1.0.0",
    "lastChecked": "2026-03-13T12:46:24.124Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-92",
    "title": "Premium Mockup Packs 9",
    "description": "A high-end, premium mockup packs asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Mockup Packs",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "mockup-packs"
    ],
    "creator": "Creative",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.5,
    "qualityScore": 94,
    "saves": 418,
    "dateAdded": "2026-04-07T01:40:51.179Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(35, 60%, 20%), hsl(136, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium mockup packs asset designed to elevate your next project. Built specifically for Branding workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "37.1 MB",
    "numberOfFiles": 38,
    "version": "1.1.0",
    "lastChecked": "2026-04-05T19:02:52.718Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-93",
    "title": "Premium Mockup Packs 41",
    "description": "A high-end, premium mockup packs asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Mockup Packs",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "mockup-packs"
    ],
    "creator": "Stripe",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.5,
    "qualityScore": 95,
    "saves": 539,
    "dateAdded": "2026-04-04T09:00:32.218Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender",
      "Cinema 4D",
      "Illustrator"
    ],
    "fileTypes": [
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(9, 60%, 20%), hsl(168, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium mockup packs asset designed to elevate your next project. Built specifically for Branding workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "408.4 MB",
    "numberOfFiles": 4,
    "version": "1.2.0",
    "lastChecked": "2026-02-07T02:43:48.556Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-94",
    "title": "Premium Logo Inspiration 21",
    "description": "A high-end, premium logo inspiration asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Logo Inspiration",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "logo-inspiration"
    ],
    "creator": "Linear",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 73,
    "license": "Extended",
    "rating": 4.7,
    "qualityScore": 91,
    "saves": 969,
    "dateAdded": "2026-02-25T15:18:18.769Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D"
    ],
    "fileTypes": [
      ".psd",
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(16, 60%, 20%), hsl(109, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium logo inspiration asset designed to elevate your next project. Built specifically for Branding workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "481.0 MB",
    "numberOfFiles": 20,
    "version": "1.3.0",
    "lastChecked": "2026-03-21T16:34:05.523Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-95",
    "title": "Premium Brand Systems 58",
    "description": "A high-end, premium brand systems asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Brand Systems",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "brand-systems"
    ],
    "creator": "Linear",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 55,
    "license": "Personal",
    "rating": 4.4,
    "qualityScore": 95,
    "saves": 464,
    "dateAdded": "2026-04-28T11:58:37.152Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(230, 60%, 20%), hsl(86, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium brand systems asset designed to elevate your next project. Built specifically for Branding workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "341.3 MB",
    "numberOfFiles": 49,
    "version": "1.4.0",
    "lastChecked": "2026-02-10T01:30:07.957Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-96",
    "title": "Premium Logo Inspiration 89",
    "description": "A high-end, premium logo inspiration asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Logo Inspiration",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "logo-inspiration"
    ],
    "creator": "Olsz",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 36,
    "license": "Commercial",
    "rating": 4.3,
    "qualityScore": 95,
    "saves": 138,
    "dateAdded": "2026-01-16T08:32:43.369Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Notion"
    ],
    "fileTypes": [
      ".psd",
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(198, 60%, 20%), hsl(90, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium logo inspiration asset designed to elevate your next project. Built specifically for Branding workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "128.5 MB",
    "numberOfFiles": 46,
    "version": "1.0.0",
    "lastChecked": "2026-02-15T17:03:45.143Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-97",
    "title": "Premium Mockup Packs 7",
    "description": "A high-end, premium mockup packs asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Mockup Packs",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "mockup-packs"
    ],
    "creator": "Notion",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 60,
    "license": "Personal",
    "rating": 4.8,
    "qualityScore": 93,
    "saves": 980,
    "dateAdded": "2026-04-12T10:19:58.832Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow",
      "Spline",
      "After Effects"
    ],
    "fileTypes": [
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(278, 60%, 20%), hsl(112, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium mockup packs asset designed to elevate your next project. Built specifically for Branding workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "363.3 MB",
    "numberOfFiles": 25,
    "version": "1.1.0",
    "lastChecked": "2026-04-16T12:21:20.901Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-98",
    "title": "Premium Mockup Packs 54",
    "description": "A high-end, premium mockup packs asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Mockup Packs",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "mockup-packs"
    ],
    "creator": "Linear",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.6,
    "qualityScore": 99,
    "saves": 508,
    "dateAdded": "2026-03-23T07:52:27.921Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects"
    ],
    "fileTypes": [
      ".ai"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(290, 60%, 20%), hsl(92, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium mockup packs asset designed to elevate your next project. Built specifically for Branding workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "287.2 MB",
    "numberOfFiles": 34,
    "version": "1.2.0",
    "lastChecked": "2026-04-18T07:55:25.380Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-99",
    "title": "Premium Guidelines 78",
    "description": "A high-end, premium guidelines asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Guidelines",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "guidelines"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 16,
    "license": "Commercial",
    "rating": 4.7,
    "qualityScore": 92,
    "saves": 226,
    "dateAdded": "2026-01-08T22:08:55.902Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender",
      "Spline",
      "Cinema 4D"
    ],
    "fileTypes": [
      ".ai",
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(291, 60%, 20%), hsl(249, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium guidelines asset designed to elevate your next project. Built specifically for Branding workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "314.0 MB",
    "numberOfFiles": 2,
    "version": "1.3.0",
    "lastChecked": "2026-02-22T08:09:42.151Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-100",
    "title": "Premium Brand Systems 26",
    "description": "A high-end, premium brand systems asset designed to elevate your next project. Built specifically for Branding workflows.",
    "category": "Branding",
    "subcategory": "Brand Systems",
    "tags": [
      "Premium",
      "Design",
      "branding",
      "brand-systems"
    ],
    "creator": "Creative",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 47,
    "license": "Personal",
    "rating": 4.4,
    "qualityScore": 90,
    "saves": 1083,
    "dateAdded": "2026-02-22T18:04:28.075Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Spline",
      "Illustrator",
      "Cinema 4D"
    ],
    "fileTypes": [
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(42, 60%, 20%), hsl(160, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium brand systems asset designed to elevate your next project. Built specifically for Branding workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "112.9 MB",
    "numberOfFiles": 8,
    "version": "1.4.0",
    "lastChecked": "2026-04-13T10:08:02.441Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-101",
    "title": "Premium Agency 5",
    "description": "A high-end, premium agency asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "Agency",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "agency"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.8,
    "qualityScore": 92,
    "saves": 919,
    "dateAdded": "2026-01-13T14:05:43.629Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer"
    ],
    "fileTypes": [
      ".ai",
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(23, 60%, 20%), hsl(37, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium agency asset designed to elevate your next project. Built specifically for Landing Pages workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "19.6 MB",
    "numberOfFiles": 41,
    "version": "1.0.0",
    "lastChecked": "2026-01-13T12:01:09.711Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-102",
    "title": "Premium Startup 46",
    "description": "A high-end, premium startup asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "Startup",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "startup"
    ],
    "creator": "Linear",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 5,
    "qualityScore": 98,
    "saves": 981,
    "dateAdded": "2026-03-03T17:19:46.481Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow"
    ],
    "fileTypes": [
      ".zip",
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(288, 60%, 20%), hsl(174, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium startup asset designed to elevate your next project. Built specifically for Landing Pages workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "246.3 MB",
    "numberOfFiles": 33,
    "version": "1.1.0",
    "lastChecked": "2026-02-03T19:40:08.345Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-103",
    "title": "Premium SaaS 10",
    "description": "A high-end, premium saas asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "SaaS",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "saas"
    ],
    "creator": "Apple",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.3,
    "qualityScore": 95,
    "saves": 788,
    "dateAdded": "2026-03-17T02:05:56.570Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma",
      "Framer"
    ],
    "fileTypes": [
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(49, 60%, 20%), hsl(51, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium saas asset designed to elevate your next project. Built specifically for Landing Pages workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "498.5 MB",
    "numberOfFiles": 37,
    "version": "1.2.0",
    "lastChecked": "2026-02-25T01:16:46.263Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-104",
    "title": "Premium Portfolio 55",
    "description": "A high-end, premium portfolio asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "Portfolio",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "portfolio"
    ],
    "creator": "Olsz",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 44,
    "license": "Commercial",
    "rating": 4.1,
    "qualityScore": 96,
    "saves": 319,
    "dateAdded": "2026-03-03T13:24:29.249Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Photoshop",
      "Spline"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(62, 60%, 20%), hsl(332, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium portfolio asset designed to elevate your next project. Built specifically for Landing Pages workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "133.1 MB",
    "numberOfFiles": 12,
    "version": "1.3.0",
    "lastChecked": "2026-01-27T13:02:28.963Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-105",
    "title": "Premium Product 81",
    "description": "A high-end, premium product asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "Product",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "product"
    ],
    "creator": "Creative",
    "creatorId": "c-4",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 29,
    "license": "Open Source",
    "rating": 4.1,
    "qualityScore": 90,
    "saves": 428,
    "dateAdded": "2026-04-23T02:36:19.075Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Spline",
      "Notion",
      "After Effects"
    ],
    "fileTypes": [
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(196, 60%, 20%), hsl(73, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium product asset designed to elevate your next project. Built specifically for Landing Pages workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "447.7 MB",
    "numberOfFiles": 32,
    "version": "1.4.0",
    "lastChecked": "2026-01-10T07:03:01.660Z",
    "status": "Needs Review",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-106",
    "title": "Premium Agency 19",
    "description": "A high-end, premium agency asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "Agency",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "agency"
    ],
    "creator": "Apple",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 10,
    "license": "Extended",
    "rating": 4.7,
    "qualityScore": 94,
    "saves": 366,
    "dateAdded": "2026-03-23T01:04:06.145Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Blender"
    ],
    "fileTypes": [
      ".fig"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(218, 60%, 20%), hsl(66, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium agency asset designed to elevate your next project. Built specifically for Landing Pages workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "128.8 MB",
    "numberOfFiles": 14,
    "version": "1.0.0",
    "lastChecked": "2026-01-08T02:49:09.298Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-107",
    "title": "Premium Portfolio 36",
    "description": "A high-end, premium portfolio asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "Portfolio",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "portfolio"
    ],
    "creator": "Framer Team",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 62,
    "license": "Commercial",
    "rating": 4.3,
    "qualityScore": 99,
    "saves": 415,
    "dateAdded": "2026-01-20T04:25:03.741Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Webflow",
      "Blender"
    ],
    "fileTypes": [
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(144, 60%, 20%), hsl(153, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium portfolio asset designed to elevate your next project. Built specifically for Landing Pages workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "367.0 MB",
    "numberOfFiles": 15,
    "version": "1.1.0",
    "lastChecked": "2026-02-08T14:10:59.426Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-108",
    "title": "Premium SaaS 68",
    "description": "A high-end, premium saas asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "SaaS",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "saas"
    ],
    "creator": "Olsz",
    "creatorId": "c-5",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.2,
    "qualityScore": 90,
    "saves": 441,
    "dateAdded": "2026-03-02T06:06:25.763Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive",
      "Webflow",
      "Framer"
    ],
    "fileTypes": [
      ".png",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(86, 60%, 20%), hsl(279, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium saas asset designed to elevate your next project. Built specifically for Landing Pages workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "247.4 MB",
    "numberOfFiles": 43,
    "version": "1.2.0",
    "lastChecked": "2026-02-25T05:18:34.738Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-109",
    "title": "Premium Startup 72",
    "description": "A high-end, premium startup asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "Startup",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "startup"
    ],
    "creator": "Linear",
    "creatorId": "c-6",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Extended",
    "rating": 4.1,
    "qualityScore": 97,
    "saves": 484,
    "dateAdded": "2026-02-13T00:51:19.782Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma"
    ],
    "fileTypes": [
      ".png"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(109, 60%, 20%), hsl(220, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium startup asset designed to elevate your next project. Built specifically for Landing Pages workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "212.7 MB",
    "numberOfFiles": 36,
    "version": "1.3.0",
    "lastChecked": "2026-03-19T18:01:22.863Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-110",
    "title": "Premium Startup 32",
    "description": "A high-end, premium startup asset designed to elevate your next project. Built specifically for Landing Pages workflows.",
    "category": "Landing Pages",
    "subcategory": "Startup",
    "tags": [
      "Premium",
      "Design",
      "landing pages",
      "startup"
    ],
    "creator": "Framer Team",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 16,
    "license": "Personal",
    "rating": 4.9,
    "qualityScore": 96,
    "saves": 382,
    "dateAdded": "2026-01-17T16:04:01.358Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(92, 60%, 20%), hsl(132, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium startup asset designed to elevate your next project. Built specifically for Landing Pages workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "221.1 MB",
    "numberOfFiles": 30,
    "version": "1.4.0",
    "lastChecked": "2026-03-04T11:18:03.008Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-111",
    "title": "Premium UI Motion 82",
    "description": "A high-end, premium ui motion asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "UI Motion",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "ui-motion"
    ],
    "creator": "Olsz",
    "creatorId": "c-3",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 25,
    "license": "Open Source",
    "rating": 4.6,
    "qualityScore": 98,
    "saves": 217,
    "dateAdded": "2026-04-04T14:03:12.338Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Illustrator"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(290, 60%, 20%), hsl(52, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium ui motion asset designed to elevate your next project. Built specifically for Motion workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "139.0 MB",
    "numberOfFiles": 41,
    "version": "1.0.0",
    "lastChecked": "2026-02-08T09:57:36.307Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-112",
    "title": "Premium Product Videos 67",
    "description": "A high-end, premium product videos asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "Product Videos",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "product-videos"
    ],
    "creator": "Stripe",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 21,
    "license": "Extended",
    "rating": 4.3,
    "qualityScore": 94,
    "saves": 643,
    "dateAdded": "2026-03-15T05:07:04.755Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Spline",
      "Blender",
      "Notion"
    ],
    "fileTypes": [
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(90, 60%, 20%), hsl(164, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium product videos asset designed to elevate your next project. Built specifically for Motion workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "278.6 MB",
    "numberOfFiles": 6,
    "version": "1.1.0",
    "lastChecked": "2026-03-24T23:07:30.537Z",
    "status": "Verified",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-113",
    "title": "Premium After Effects 12",
    "description": "A high-end, premium after effects asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "After Effects",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "after-effects"
    ],
    "creator": "Stripe",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 86,
    "license": "Extended",
    "rating": 4.6,
    "qualityScore": 95,
    "saves": 718,
    "dateAdded": "2026-03-16T22:39:13.838Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects",
      "Spline"
    ],
    "fileTypes": [
      ".psd",
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(206, 60%, 20%), hsl(215, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium after effects asset designed to elevate your next project. Built specifically for Motion workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "492.0 MB",
    "numberOfFiles": 8,
    "version": "1.2.0",
    "lastChecked": "2026-03-05T03:24:15.474Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-114",
    "title": "Premium UI Motion 52",
    "description": "A high-end, premium ui motion asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "UI Motion",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "ui-motion"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Personal",
    "rating": 4.2,
    "qualityScore": 96,
    "saves": 351,
    "dateAdded": "2026-03-27T10:08:00.130Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator"
    ],
    "fileTypes": [
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(160, 60%, 20%), hsl(340, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium ui motion asset designed to elevate your next project. Built specifically for Motion workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "333.4 MB",
    "numberOfFiles": 48,
    "version": "1.3.0",
    "lastChecked": "2026-03-23T10:01:19.809Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-115",
    "title": "Premium Lottie 71",
    "description": "A high-end, premium lottie asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "Lottie",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "lottie"
    ],
    "creator": "Apple",
    "creatorId": "c-7",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Open Source",
    "rating": 4.1,
    "qualityScore": 90,
    "saves": 684,
    "dateAdded": "2026-02-07T17:27:47.188Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Cinema 4D"
    ],
    "fileTypes": [
      ".zip",
      ".svg"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(354, 60%, 20%), hsl(206, 60%, 10%))",
    "isFeatured": true,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium lottie asset designed to elevate your next project. Built specifically for Motion workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "140.8 MB",
    "numberOfFiles": 35,
    "version": "1.4.0",
    "lastChecked": "2026-01-28T18:49:32.458Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-116",
    "title": "Premium UI Motion 18",
    "description": "A high-end, premium ui motion asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "UI Motion",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "ui-motion"
    ],
    "creator": "Stripe",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 75,
    "license": "Open Source",
    "rating": 4.8,
    "qualityScore": 94,
    "saves": 601,
    "dateAdded": "2026-01-12T14:53:09.117Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Figma"
    ],
    "fileTypes": [
      ".blend"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(22, 60%, 20%), hsl(209, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium ui motion asset designed to elevate your next project. Built specifically for Motion workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "71.3 MB",
    "numberOfFiles": 44,
    "version": "1.0.0",
    "lastChecked": "2026-03-19T05:03:22.797Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-117",
    "title": "Premium Rive 67",
    "description": "A high-end, premium rive asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "Rive",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "rive"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-9",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Free",
    "price": 0,
    "license": "Commercial",
    "rating": 4.7,
    "qualityScore": 97,
    "saves": 368,
    "dateAdded": "2026-03-16T00:20:52.757Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects",
      "Webflow",
      "Framer"
    ],
    "fileTypes": [
      ".blend",
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(284, 60%, 20%), hsl(342, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium rive asset designed to elevate your next project. Built specifically for Motion workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "141.3 MB",
    "numberOfFiles": 23,
    "version": "1.1.0",
    "lastChecked": "2026-03-16T23:25:04.359Z",
    "status": "Verified",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-118",
    "title": "Premium After Effects 43",
    "description": "A high-end, premium after effects asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "After Effects",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "after-effects"
    ],
    "creator": "DesignLabs",
    "creatorId": "c-8",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 42,
    "license": "Extended",
    "rating": 4,
    "qualityScore": 97,
    "saves": 388,
    "dateAdded": "2026-01-14T12:54:32.126Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Framer",
      "Notion",
      "Illustrator"
    ],
    "fileTypes": [
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(228, 60%, 20%), hsl(246, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium after effects asset designed to elevate your next project. Built specifically for Motion workflows. Meticulously crafted to ensure the highest quality standards, saving you hours of manual work. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Intermediate",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "19.3 MB",
    "numberOfFiles": 41,
    "version": "1.2.0",
    "lastChecked": "2026-03-03T14:35:47.602Z",
    "status": "Active",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-119",
    "title": "Premium Rive 37",
    "description": "A high-end, premium rive asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "Rive",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "rive"
    ],
    "creator": "Vercel",
    "creatorId": "c-0",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 52,
    "license": "Commercial",
    "rating": 4.3,
    "qualityScore": 95,
    "saves": 503,
    "dateAdded": "2026-03-15T08:08:28.626Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "After Effects",
      "Notion",
      "Figma"
    ],
    "fileTypes": [
      ".zip"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(183, 60%, 20%), hsl(319, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": true,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium rive asset designed to elevate your next project. Built specifically for Motion workflows. A versatile asset that fits seamlessly into both modern and classic design languages. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Advanced",
    "resourceType": "Asset",
    "commercialUse": "No",
    "attributionRequired": "Yes",
    "fileSize": "305.9 MB",
    "numberOfFiles": 37,
    "version": "1.3.0",
    "lastChecked": "2026-03-26T01:49:07.874Z",
    "status": "Active",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-120",
    "title": "Premium UI Motion 38",
    "description": "A high-end, premium ui motion asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "UI Motion",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "ui-motion"
    ],
    "creator": "Olsz",
    "creatorId": "c-1",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Freemium",
    "price": 86,
    "license": "Extended",
    "rating": 4.3,
    "qualityScore": 93,
    "saves": 735,
    "dateAdded": "2026-01-14T19:46:00.491Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Rive"
    ],
    "fileTypes": [
      ".zip",
      ".psd"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(25, 60%, 20%), hsl(88, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": true,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium ui motion asset designed to elevate your next project. Built specifically for Motion workflows. Perfect for client presentations, offering a polished, professional look right out of the box. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Pro",
    "resourceType": "Asset",
    "commercialUse": "Unknown",
    "attributionRequired": "Unknown",
    "fileSize": "146.4 MB",
    "numberOfFiles": 11,
    "version": "1.4.0",
    "lastChecked": "2026-03-24T00:19:55.950Z",
    "status": "Needs Review",
    "curationNote": "An absolute must-have for any serious designer. The attention to detail here is incredible.",
    "limitations": [
      "None identified"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  },
  {
    "id": "res-121",
    "title": "Premium After Effects 49",
    "description": "A high-end, premium after effects asset designed to elevate your next project. Built specifically for Motion workflows.",
    "category": "Motion",
    "subcategory": "After Effects",
    "tags": [
      "Premium",
      "Design",
      "motion",
      "after-effects"
    ],
    "creator": "Stripe",
    "creatorId": "c-2",
    "sourceName": "Curated Resource",
    "sourceUrl": "https://example.com",
    "priceType": "Paid",
    "price": 49,
    "license": "Extended",
    "rating": 4.1,
    "qualityScore": 95,
    "saves": 863,
    "dateAdded": "2026-02-19T03:52:39.812Z",
    "updatedAt": "2026-05-01T19:23:40.210Z",
    "tools": [
      "Illustrator",
      "After Effects"
    ],
    "fileTypes": [
      ".png",
      ".c4d"
    ],
    "thumbnailStyle": "linear-gradient(135deg, hsl(252, 60%, 20%), hsl(79, 60%, 10%))",
    "isFeatured": false,
    "isHandpicked": false,
    "isNew": false,
    "isBookmarked": false,
    "isFavorite": false,
    "useCases": [
      "Web Design",
      "Prototyping",
      "Client Presentation"
    ],
    "relatedResourceIds": [],
    "longDescription": "A high-end, premium after effects asset designed to elevate your next project. Built specifically for Motion workflows. This exceptional resource provides unparalleled value for your creative workflow. It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    "difficulty": "Beginner",
    "resourceType": "Asset",
    "commercialUse": "Yes",
    "attributionRequired": "No",
    "fileSize": "168.9 MB",
    "numberOfFiles": 21,
    "version": "1.0.0",
    "lastChecked": "2026-03-15T14:48:36.556Z",
    "status": "Active",
    "limitations": [
      "May require paid fonts",
      "Not compatible with older software versions"
    ],
    "pros": [
      "High resolution",
      "Well organized",
      "Easy to customize"
    ],
    "cons": [
      "Large file size",
      "Steep learning curve"
    ],
    "usageTips": [
      "Try adjusting the master components first",
      "Check the included documentation for setup instructions"
    ]
  }
];
