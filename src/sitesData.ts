export type Site = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  url: string;
  domain: string;
  faviconUrl?: string;
  screenshotStyle: string;
  screenshotUrl?: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  tags: string[];
  status: 'Active' | 'Broken' | 'Needs Review' | 'Verified' | 'Archived';
  
  whatIsThisSiteFor?: string;
  primaryUseCase?: string;
  useCases: string[];
  bestFor?: string[];
  notBestFor?: string[];
  workflowFit?: string;
  
  accessType: 'Free' | 'Paid' | 'Freemium' | 'Subscription' | 'One-time Purchase' | 'Invite Only' | 'Account Required' | 'Unknown';
  pricingNote?: string;
  subscriptionStatus: 'None' | 'Active' | 'Trial' | 'Cancelled' | 'Expired' | 'Unknown';
  planName?: string;
  renewalDate?: string;
  paymentMethodNote?: string;
  accountRequired: boolean;
  loginUrl?: string;
  
  hasCredentials: boolean;
  username?: string;
  email?: string;
  passwordMasked?: string;
  passwordHint?: string;
  credentialNotes?: string;
  lastCredentialUpdate?: string;
  twoFactorEnabled?: boolean;
  recoveryEmail?: string;
  backupCodesStored?: boolean;
  securityNotes?: string;
  
  rating: number;
  qualityScore: number;
  reliabilityScore: number;
  importance: 'Low' | 'Medium' | 'High' | 'Critical';
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Rarely' | 'Archive';
  lastVisited?: string;
  dateAdded: string;
  updatedAt: string;
  lastChecked: string;
  owner?: string;
  createdBy: string;
  source?: string;
  
  toolType?: string;
  platform: ('Web' | 'macOS' | 'Windows' | 'iOS' | 'Android' | 'Browser Extension' | 'API')[];
  relatedResourceIds?: string[];
  relatedSiteIds?: string[];
  alternatives?: string[];
  integrations?: string[];
  
  privateNotes?: string;
  publicNotes?: string;
  usageTips?: string[];
  setupSteps?: string[];
  strengths?: string[];
  limitations?: string[];
  warnings?: string[];
  renewalNotes?: string;
  
  isBookmarked: boolean;
  isFavorite: boolean;
  isPinned: boolean;
  isArchived: boolean;
  isBroken: boolean;
  isVerified: boolean;
  isHandpicked: boolean;
  isNew: boolean;
  hasLogin: boolean;
  hasSubscription: boolean;
  needsReview: boolean;
  
  curationStatus: 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Needs Metadata' | 'Broken';
  editorNote?: string;
  curationNote?: string;
};

export const sitesTree: Record<string, string[]> = {
  "Design Tools": [
    "Figma Plugins",
    "Color Tools",
    "Typography Tools",
    "Wireframing",
    "Prototyping",
    "Design Systems"
  ],
  "AI Tools": [
    "Image Generation",
    "Video Generation",
    "Coding AI",
    "Writing AI",
    "Research AI",
    "Automation AI"
  ],
  "Inspiration": [
    "Landing Pages",
    "SaaS UI",
    "Portfolio Sites",
    "Branding",
    "Motion",
    "3D",
    "Awards / Galleries"
  ],
  "Asset Libraries": [
    "Mockups",
    "Icons",
    "Fonts",
    "Illustrations",
    "3D Assets",
    "Stock Photos",
    "Textures",
    "Video Assets"
  ],
  "Marketplaces": [
    "Templates",
    "Framer",
    "Webflow",
    "Figma",
    "Gumroad",
    "Lemon Squeezy",
    "UI Kits"
  ],
  "Learning": [
    "Courses",
    "YouTube Channels",
    "Blogs",
    "Documentation",
    "Design Education",
    "Business / Freelance"
  ],
  "SaaS Tools": [
    "Project Management",
    "Analytics",
    "Email",
    "CRM",
    "Automation",
    "Payments",
    "Forms"
  ],
  "Developer Tools": [
    "Hosting",
    "APIs",
    "Code Libraries",
    "GitHub Tools",
    "Testing",
    "Databases",
    "Dev Utilities"
  ],
  "Productivity": [
    "Notes",
    "Task Management",
    "Calendars",
    "Time Tracking",
    "Knowledge Base",
    "Focus Tools"
  ],
  "Communities": [
    "Discord",
    "Slack",
    "Forums",
    "Design Communities",
    "Maker Communities"
  ],
  "Accounts / Portals": [
    "Client Portals",
    "Subscription Accounts",
    "Vendor Accounts",
    "Hosting Accounts",
    "Marketplaces Login"
  ],
  "Subscriptions": [
    "Software",
    "Asset Subscriptions",
    "Media",
    "Cloud Storage"
  ]
};

export const sitesCategories = Object.keys(sitesTree);

// Base factory to make generation easier
const createSite = (data: Partial<Site>): Site => ({
  id: data.id || `site-${Math.random().toString(36).substring(2, 9)}`,
  slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, '-') || 'site',
  name: data.name || 'Unknown Site',
  shortDescription: data.shortDescription || 'A useful site for design and development.',
  url: data.url || 'https://example.com',
  domain: data.domain || 'example.com',
  screenshotStyle: data.screenshotStyle || 'linear-gradient(135deg, hsl(210, 60%, 20%), hsl(220, 60%, 10%))',
  category: data.category || 'Asset Libraries',
  categorySlug: data.categorySlug || data.category?.toLowerCase().replace(/\s+/g, '-') || 'asset-libraries',
  subcategory: data.subcategory || 'Mockups',
  subcategorySlug: data.subcategorySlug || data.subcategory?.toLowerCase().replace(/\s+/g, '-') || 'mockups',
  tags: data.tags || ['design'],
  status: data.status || 'Active',
  useCases: data.useCases || ['Design', 'Inspiration'],
  accessType: data.accessType || 'Free',
  subscriptionStatus: data.subscriptionStatus || 'None',
  accountRequired: data.accountRequired || false,
  hasCredentials: data.hasCredentials || false,
  rating: data.rating || 4.5,
  qualityScore: data.qualityScore || 90,
  reliabilityScore: data.reliabilityScore || 90,
  importance: data.importance || 'Medium',
  frequency: data.frequency || 'Weekly',
  dateAdded: data.dateAdded || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  lastChecked: data.lastChecked || new Date().toISOString(),
  createdBy: data.createdBy || 'System',
  platform: data.platform || ['Web'],
  isBookmarked: data.isBookmarked || false,
  isFavorite: data.isFavorite || false,
  isPinned: data.isPinned || false,
  isArchived: data.isArchived || false,
  isBroken: data.isBroken || false,
  isVerified: data.isVerified || true,
  isHandpicked: data.isHandpicked || true,
  isNew: data.isNew || false,
  hasLogin: data.hasLogin || false,
  hasSubscription: data.hasSubscription || false,
  needsReview: data.needsReview || false,
  curationStatus: data.curationStatus || 'Approved',
  ...data
});

export const sites: Site[] = [
  createSite({
    id: 's-1',
    name: 'Figma Community',
    slug: 'figma-community',
    domain: 'figma.com/community',
    url: 'https://figma.com/community',
    shortDescription: 'The official marketplace for Figma plugins, UI kits, and templates.',
    longDescription: 'Explore thousands of free and premium resources created by the Figma community. From plugins that automate your workflow to comprehensive design systems.',
    category: 'Design Tools',
    subcategory: 'Figma Plugins',
    tags: ['figma', 'plugins', 'templates', 'community'],
    accessType: 'Freemium',
    accountRequired: true,
    hasCredentials: true,
    hasLogin: true,
    username: 'designer@example.com',
    passwordMasked: 'demo-password-hidden',
    importance: 'Critical',
    frequency: 'Daily',
    rating: 4.9,
    qualityScore: 98,
    screenshotStyle: 'linear-gradient(135deg, hsl(10, 80%, 20%), hsl(30, 80%, 10%))',
    useCases: ['Finding plugins', 'Downloading UI kits', 'Inspiration'],
    bestFor: ['Figma users', 'Product designers'],
    strengths: ['Massive library', 'Official platform', 'One-click install'],
  }),
  createSite({
    id: 's-2',
    name: 'Mobbin',
    slug: 'mobbin',
    domain: 'mobbin.com',
    url: 'https://mobbin.com',
    shortDescription: 'The world\'s largest UI & UX reference library for mobile and web apps.',
    category: 'Inspiration',
    subcategory: 'SaaS UI',
    tags: ['ui', 'ux', 'mobile', 'web', 'patterns'],
    accessType: 'Subscription',
    accountRequired: true,
    hasCredentials: true,
    hasLogin: true,
    hasSubscription: true,
    subscriptionStatus: 'Active',
    username: 'designer@example.com',
    passwordMasked: 'demo-password-hidden',
    importance: 'High',
    frequency: 'Weekly',
    rating: 4.8,
    qualityScore: 95,
    screenshotStyle: 'linear-gradient(135deg, hsl(220, 10%, 15%), hsl(220, 10%, 5%))',
    useCases: ['UI research', 'UX flows', 'Competitor analysis'],
  }),
  createSite({
    id: 's-3',
    name: 'Awwwards',
    slug: 'awwwards',
    domain: 'awwwards.com',
    url: 'https://www.awwwards.com',
    shortDescription: 'Website awards recognizing the talent and effort of the best web designers, developers and agencies.',
    category: 'Inspiration',
    subcategory: 'Awards / Galleries',
    tags: ['web design', 'awards', 'inspiration', 'agencies'],
    accessType: 'Free',
    accountRequired: false,
    importance: 'Medium',
    frequency: 'Weekly',
    rating: 4.6,
    qualityScore: 92,
    screenshotStyle: 'linear-gradient(135deg, hsl(0, 0%, 20%), hsl(0, 0%, 0%))',
    useCases: ['Visual inspiration', 'Trend spotting', 'Agency discovery'],
  }),
  createSite({
    id: 's-4',
    name: 'UI8',
    slug: 'ui8',
    domain: 'ui8.net',
    url: 'https://ui8.net',
    shortDescription: '100% curated digital marketplace with a growing library of high-quality UX/UI design resources.',
    category: 'Marketplaces',
    subcategory: 'UI Kits',
    tags: ['ui kits', 'mockups', 'premium', 'marketplace'],
    accessType: 'Paid',
    accountRequired: true,
    hasCredentials: true,
    hasLogin: true,
    username: 'purchases@example.com',
    passwordMasked: 'demo-password-hidden',
    importance: 'High',
    frequency: 'Monthly',
    rating: 4.7,
    qualityScore: 94,
    screenshotStyle: 'linear-gradient(135deg, hsl(260, 60%, 20%), hsl(280, 60%, 10%))',
    useCases: ['Purchasing UI kits', 'Premium mockups', '3D assets'],
  }),
  createSite({
    id: 's-5',
    name: 'Godly',
    slug: 'godly',
    domain: 'godly.website',
    url: 'https://godly.website',
    shortDescription: 'Astronomically good web design inspiration from the best sites on the internet.',
    category: 'Inspiration',
    subcategory: 'Landing Pages',
    tags: ['web design', 'landing pages', 'inspiration'],
    accessType: 'Free',
    accountRequired: false,
    importance: 'Medium',
    frequency: 'Weekly',
    rating: 4.9,
    qualityScore: 96,
    screenshotStyle: 'linear-gradient(135deg, hsl(200, 60%, 20%), hsl(220, 60%, 10%))',
    useCases: ['Web design inspiration', 'Motion design reference'],
  }),
  createSite({
    id: 's-6',
    name: 'Vercel',
    slug: 'vercel',
    domain: 'vercel.com',
    url: 'https://vercel.com',
    shortDescription: 'Develop. Preview. Ship. The frontend cloud.',
    category: 'Developer Tools',
    subcategory: 'Hosting',
    tags: ['hosting', 'next.js', 'frontend', 'deployment'],
    accessType: 'Freemium',
    accountRequired: true,
    hasCredentials: true,
    hasLogin: true,
    hasSubscription: true,
    subscriptionStatus: 'Active',
    username: 'dev@example.com',
    passwordMasked: 'demo-password-hidden',
    twoFactorEnabled: true,
    importance: 'Critical',
    frequency: 'Daily',
    rating: 4.9,
    qualityScore: 99,
    screenshotStyle: 'linear-gradient(135deg, hsl(0, 0%, 10%), hsl(0, 0%, 0%))',
    useCases: ['Hosting projects', 'Analytics', 'CI/CD'],
  }),
  createSite({
    id: 's-7',
    name: 'Spline',
    slug: 'spline',
    domain: 'spline.design',
    url: 'https://spline.design',
    shortDescription: '3D design tool for the web. Create interactive 3D experiences right in your browser.',
    category: 'Asset Libraries',
    subcategory: '3D Assets',
    tags: ['3d', 'web', 'interactive', 'design tool'],
    accessType: 'Freemium',
    accountRequired: true,
    hasCredentials: true,
    hasLogin: true,
    username: 'designer@example.com',
    passwordMasked: 'demo-password-hidden',
    importance: 'High',
    frequency: 'Weekly',
    rating: 4.8,
    qualityScore: 95,
    screenshotStyle: 'linear-gradient(135deg, hsl(320, 60%, 20%), hsl(340, 60%, 10%))',
    useCases: ['Creating 3D scenes', 'Web interactions', 'Exporting to code'],
  }),
  createSite({
    id: 's-8',
    name: 'Midjourney',
    slug: 'midjourney',
    domain: 'midjourney.com',
    url: 'https://midjourney.com',
    shortDescription: 'An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.',
    category: 'AI Tools',
    subcategory: 'Image Generation',
    tags: ['ai', 'image generation', 'art', 'discord'],
    accessType: 'Subscription',
    accountRequired: true,
    hasCredentials: true,
    hasLogin: true,
    hasSubscription: true,
    subscriptionStatus: 'Active',
    username: 'creative@example.com',
    passwordMasked: 'demo-password-hidden',
    importance: 'High',
    frequency: 'Daily',
    rating: 4.9,
    qualityScore: 97,
    screenshotStyle: 'linear-gradient(135deg, hsl(280, 40%, 20%), hsl(300, 40%, 10%))',
    useCases: ['Concept art', 'Stock photo alternatives', 'Texture generation'],
  }),
  createSite({
    id: 's-9',
    name: 'Typewolf',
    slug: 'typewolf',
    domain: 'typewolf.com',
    url: 'https://typewolf.com',
    shortDescription: 'What\'s trending in type. Typography inspiration for the modern web.',
    category: 'Design Tools',
    subcategory: 'Typography Tools',
    tags: ['typography', 'fonts', 'inspiration', 'web design'],
    accessType: 'Free',
    accountRequired: false,
    importance: 'Medium',
    frequency: 'Monthly',
    rating: 4.7,
    qualityScore: 93,
    screenshotStyle: 'linear-gradient(135deg, hsl(40, 30%, 20%), hsl(40, 30%, 10%))',
    useCases: ['Font pairing', 'Typography trends', 'Finding foundries'],
  }),
  createSite({
    id: 's-10',
    name: 'Stripe',
    slug: 'stripe',
    domain: 'stripe.com',
    url: 'https://stripe.com',
    shortDescription: 'Financial infrastructure platform for the internet.',
    category: 'SaaS Tools',
    subcategory: 'Payments',
    tags: ['payments', 'finance', 'business', 'api'],
    accessType: 'Paid',
    accountRequired: true,
    hasCredentials: true,
    hasLogin: true,
    username: 'admin@example.com',
    passwordMasked: 'demo-password-hidden',
    twoFactorEnabled: true,
    importance: 'Critical',
    frequency: 'Weekly',
    rating: 4.9,
    qualityScore: 99,
    screenshotStyle: 'linear-gradient(135deg, hsl(240, 70%, 30%), hsl(240, 70%, 15%))',
    useCases: ['Payment processing', 'Invoicing', 'Financial reports'],
  }),
  createSite({
    id: 's-12',
    name: 'Godly',
    slug: 'godly',
    domain: 'godly.website',
    url: 'https://godly.website',
    shortDescription: 'Astronomically good web design inspiration from all over the internet.',
    category: 'Asset Libraries',
    subcategory: 'UI Kits',
    tags: ['inspiration', 'web design', 'gallery'],
    accessType: 'Free',
    rating: 4.8,
    screenshotStyle: 'linear-gradient(135deg, hsl(200, 30%, 15%), hsl(200, 30%, 5%))',
  }),
  createSite({
    id: 's-13',
    name: 'Mobbin',
    slug: 'mobbin',
    domain: 'mobbin.com',
    url: 'https://mobbin.com',
    shortDescription: 'Discover real-world design inspiration. Featuring over 100,000 fully searchable mobile & web screenshots.',
    category: 'Asset Libraries',
    subcategory: 'UI Kits',
    tags: ['mobile', 'app design', 'ux', 'patterns'],
    accessType: 'Freemium',
    hasLogin: true,
    rating: 4.9,
    screenshotStyle: 'linear-gradient(135deg, hsl(0, 0%, 20%), hsl(0, 0%, 5%))',
  }),
  createSite({
    id: 's-14',
    name: 'Framer',
    slug: 'framer',
    domain: 'framer.com',
    url: 'https://framer.com',
    shortDescription: 'The web builder for creative pros. Design and ship your dream site.',
    category: 'Design Tools',
    subcategory: 'Prototyping',
    tags: ['website builder', 'no-code', 'react', 'design'],
    accessType: 'Freemium',
    accountRequired: true,
    hasLogin: true,
    hasCredentials: true,
    username: 'designer@example.com',
    passwordMasked: 'hidden',
    rating: 4.8,
    screenshotStyle: 'linear-gradient(135deg, hsl(210, 80%, 60%), hsl(280, 80%, 50%))',
  }),
  createSite({
    id: 's-15',
    name: 'LottieFiles',
    slug: 'lottiefiles',
    domain: 'lottiefiles.com',
    url: 'https://lottiefiles.com',
    shortDescription: 'Lightweight, scalable animations for your ads, apps, and websites.',
    category: 'Asset Libraries',
    subcategory: 'Motion / Video',
    tags: ['animation', 'json', 'after effects', 'lottie'],
    accessType: 'Freemium',
    hasLogin: true,
    rating: 4.7,
    screenshotStyle: 'linear-gradient(135deg, hsl(170, 70%, 40%), hsl(190, 70%, 30%))',
  }),
  createSite({
    id: 's-16',
    name: 'Rive',
    slug: 'rive',
    domain: 'rive.app',
    url: 'https://rive.app',
    shortDescription: 'Build interactive animations that run anywhere.',
    category: 'Design Tools',
    subcategory: 'Prototyping',
    tags: ['animation', 'interactive', 'state machine', 'game dev'],
    accessType: 'Freemium',
    hasLogin: true,
    rating: 4.8,
    screenshotStyle: 'linear-gradient(135deg, hsl(340, 70%, 50%), hsl(360, 70%, 40%))',
  }),
  createSite({
    id: 's-17',
    name: 'Notion',
    slug: 'notion',
    domain: 'notion.so',
    url: 'https://notion.so',
    shortDescription: 'The connected workspace where better, faster work happens.',
    category: 'Productivity',
    subcategory: 'Knowledge Base',
    tags: ['wiki', 'docs', 'projects', 'tasks'],
    accessType: 'Freemium',
    accountRequired: true,
    hasLogin: true,
    hasCredentials: true,
    username: 'team@example.com',
    passwordMasked: 'hidden',
    rating: 4.9,
    screenshotStyle: 'linear-gradient(135deg, hsl(0, 0%, 95%), hsl(0, 0%, 90%))',
  }),
  createSite({
    id: 's-18',
    name: 'Supabase',
    slug: 'supabase',
    domain: 'supabase.com',
    url: 'https://supabase.com',
    shortDescription: 'The open source Firebase alternative.',
    category: 'Developer Tools',
    subcategory: 'Databases',
    tags: ['database', 'auth', 'postgres', 'backend'],
    accessType: 'Freemium',
    accountRequired: true,
    hasLogin: true,
    rating: 4.8,
    screenshotStyle: 'linear-gradient(135deg, hsl(150, 60%, 30%), hsl(150, 60%, 15%))',
  })
];
