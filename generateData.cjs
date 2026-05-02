const fs = require('fs');

const tree = {
  'Mockups': ['Device Mockups', 'iPhone', 'MacBook', 'iPad', 'Apparel', 'Packaging', 'Posters', 'Branding', 'Social Media', 'Scene Creators'],
  'Fonts': ['Serif', 'Sans Serif', 'Display', 'Variable', 'Editorial', 'Luxury', 'Free Fonts', 'Premium Fonts'],
  'UI Kits': ['Mobile UI', 'Web UI', 'SaaS UI', 'Dashboard UI', 'Design Systems', 'Components'],
  'Tools': ['Design Tools', 'AI Tools', 'Productivity', 'Developer Tools', 'No-Code', 'Automation'],
  'Templates': ['Framer', 'Webflow', 'Figma', 'Notion', 'Presentations', 'Portfolio'],
  'Courses': ['UI/UX', 'Branding', 'Framer', 'Figma', '3D', 'Motion', 'Freelancing'],
  'Books': ['Product Design', 'Branding', 'Typography', 'Business', 'Creativity'],
  'Icons': ['Outline', 'Filled', '3D Icons', 'Animated Icons', 'App Icons'],
  '3D Assets': ['Cinema 4D', 'Blender', 'Materials', 'Product Scenes', 'Abstract Scenes', 'Lighting'],
  'Branding': ['Brand Systems', 'Logo Inspiration', 'Color Palettes', 'Guidelines', 'Mockup Packs'],
  'Landing Pages': ['SaaS', 'Agency', 'Product', 'Portfolio', 'Startup'],
  'Motion': ['After Effects', 'Rive', 'Lottie', 'UI Motion', 'Product Videos']
};

const creators = ['Apple', 'Linear', 'Notion', 'Framer Team', 'Vercel', 'Stripe', 'Olsz', 'Creative', 'DesignLabs', 'StudioX'];
const pricing = ['Free', 'Paid', 'Freemium'];
const license = ['Personal', 'Commercial', 'Open Source', 'Extended'];
const toolsList = ['Figma', 'Framer', 'Webflow', 'Photoshop', 'Illustrator', 'Blender', 'Cinema 4D', 'After Effects', 'Notion', 'Spline', 'Rive'];
const filesList = ['.fig', '.zip', '.psd', '.ai', '.blend', '.c4d', '.png', '.svg'];

let resources = [];
let idCounter = 1;

Object.keys(tree).forEach(cat => {
  const subcats = tree[cat];
  
  const count = Math.floor(Math.random() * 5) + 8;
  
  for (let i = 0; i < count; i++) {
    const subcat = subcats[Math.floor(Math.random() * subcats.length)];
    const priceType = pricing[Math.floor(Math.random() * pricing.length)];
    const price = priceType === 'Free' ? 0 : Math.floor(Math.random() * 80) + 10;
    
    const toolsCount = Math.floor(Math.random() * 3) + 1;
    const tools = [];
    for(let j=0; j<toolsCount; j++) {
      const t = toolsList[Math.floor(Math.random() * toolsList.length)];
      if(!tools.includes(t)) tools.push(t);
    }
    
    const filesCount = Math.floor(Math.random() * 2) + 1;
    const fileTypes = [];
    for(let j=0; j<filesCount; j++) {
      const t = filesList[Math.floor(Math.random() * filesList.length)];
      if(!fileTypes.includes(t)) fileTypes.push(t);
    }

    resources.push({
      id: "res-" + (idCounter++),
      title: "Premium " + subcat + " " + Math.floor(Math.random() * 100),
      description: "A high-end, premium " + subcat.toLowerCase() + " asset designed to elevate your next project. Built specifically for " + cat + " workflows.",
      category: cat,
      subcategory: subcat,
      tags: ['Premium', 'Design', cat.toLowerCase(), subcat.toLowerCase().replace(/ /g, '-')],
      creator: creators[Math.floor(Math.random() * creators.length)],
      creatorId: "c-" + Math.floor(Math.random() * 10),
      sourceName: 'Curated Resource',
      sourceUrl: 'https://example.com',
      priceType,
      price,
      license: license[Math.floor(Math.random() * license.length)],
      rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
      qualityScore: Math.floor(Math.random() * 10 + 90),
      saves: Math.floor(Math.random() * 1000 + 100),
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      updatedAt: new Date().toISOString(),
      tools,
      fileTypes,
      thumbnailStyle: "linear-gradient(135deg, hsl(" + Math.floor(Math.random() * 360) + ", 60%, 20%), hsl(" + Math.floor(Math.random() * 360) + ", 60%, 10%))",
      isFeatured: Math.random() > 0.8,
      isHandpicked: Math.random() > 0.5,
      isNew: Math.random() > 0.8,
      isBookmarked: false,
      isFavorite: false,
      useCases: ['Web Design', 'Prototyping', 'Client Presentation'],
      relatedResourceIds: []
    });
  }
});

const fileContent = "export type Resource = {\n" +
  "  id: string;\n" +
  "  title: string;\n" +
  "  description: string;\n" +
  "  category: string;\n" +
  "  subcategory: string;\n" +
  "  tags: string[];\n" +
  "  creator: string;\n" +
  "  creatorId: string;\n" +
  "  sourceName: string;\n" +
  "  sourceUrl: string;\n" +
  "  priceType: string;\n" +
  "  price: number;\n" +
  "  license: string;\n" +
  "  rating: number;\n" +
  "  qualityScore: number;\n" +
  "  saves: number;\n" +
  "  dateAdded: string;\n" +
  "  updatedAt: string;\n" +
  "  tools: string[];\n" +
  "  fileTypes: string[];\n" +
  "  thumbnailStyle: string;\n" +
  "  isFeatured: boolean;\n" +
  "  isHandpicked: boolean;\n" +
  "  isNew: boolean;\n" +
  "  isBookmarked: boolean;\n" +
  "  isFavorite: boolean;\n" +
  "  useCases: string[];\n" +
  "  relatedResourceIds: string[];\n" +
  "};\n\n" +
  "export const tree: Record<string, string[]> = " + JSON.stringify(tree, null, 2) + ";\n" +
  "export const categories = Object.keys(tree);\n\n" +
  "export const resources: Resource[] = " + JSON.stringify(resources, null, 2) + ";\n";

fs.writeFileSync('src/data.ts', fileContent);
console.log('Data generated successfully: src/data.ts');
