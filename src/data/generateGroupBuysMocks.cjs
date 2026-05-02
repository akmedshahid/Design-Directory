const fs = require('fs');
const path = require('path');

const typesAndImports = `import { type PlanLevel } from './greatHallData';

export type GroupBuyStatus = 'Draft' | 'Requested' | 'Under Review' | 'Needs License Review' | 'Approved for Voting' | 'Voting' | 'Scheduled' | 'Active' | 'Collecting Payments' | 'Purchase Ready' | 'Purchased' | 'Delivered' | 'Completed' | 'Cancelled' | 'Rejected' | 'Refunded' | 'Disputed' | 'Archived';

export type GroupBuyType = 'Design Resource' | 'Course' | 'Template' | 'Tool' | 'Software' | 'Font' | 'UI Kit' | '3D Asset' | 'Subscription' | 'Site Access' | 'Community License' | 'Other';

export type ShareMethod = 'Equal Split' | 'Tiered Split' | 'Custom Shares' | 'Admin Defined';

export type TermsStatus = 'Not Checked' | 'Needs Review' | 'Allows Group Buy' | 'Team License Available' | 'Multi-seat Available' | 'Contact Seller Required' | 'Not Allowed' | 'Unknown';

export type LegalReviewStatus = 'Pending' | 'Approved' | 'Rejected' | 'Needs More Info';

export type DeliveryMethod = 'Direct License' | 'Team Seat' | 'Download Link' | 'Access Instructions' | 'Seller Invite' | 'Manual Delivery' | 'Unknown';

export type ParticipantStatus = 'Interested' | 'Joined' | 'Pending Approval' | 'Approved' | 'Payment Pending' | 'Payment Sent' | 'Paid' | 'Confirmed' | 'Delivered' | 'Refunded' | 'Cancelled' | 'Removed';

export type PaymentMethodType = 'Manual' | 'Stripe' | 'PayPal' | 'Bank Transfer' | 'Wise' | 'Crypto' | 'Other';

export type PaymentStatus = 'Pending' | 'Submitted' | 'Confirmed' | 'Failed' | 'Refunded' | 'Disputed';

export interface GroupBuyParticipant {
  userId: string;
  displayName: string;
  username: string;
  avatar: string;
  plan: PlanLevel;
  role: string;
  joinedAt: string;
  status: ParticipantStatus;
  shareAmount: number;
  amountPaid: number;
  paymentMethod?: PaymentMethodType;
  paymentReference?: string;
  paidAt?: string;
  confirmedByAdminId?: string;
  confirmedAt?: string;
  notes?: string;
  hasReceivedAccess: boolean;
  accessDeliveredAt?: string;
  refundAmount?: number;
  refundStatus?: string;
}

export interface GroupBuyPayment {
  id: string;
  groupBuyId: string;
  userId: string;
  participantName: string;
  amount: number;
  currency: string;
  method: PaymentMethodType;
  status: PaymentStatus;
  reference?: string;
  screenshotUrl?: string;
  submittedAt: string;
  confirmedAt?: string;
  confirmedBy?: string;
  notes?: string;
}

export interface GroupBuyChatMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  avatar: string;
  content: string;
  timestamp: string;
  pinned?: boolean;
}

export interface GroupBuyTimelineEvent {
  id: string;
  type: string;
  actorName: string;
  timestamp: string;
  details?: string;
}

export interface GroupBuy {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  productName: string;
  productUrl: string;
  sourceName: string;
  sourceUrl: string;
  creatorName: string;
  creatorUrl: string;
  imageUrl?: string;
  thumbnailStyle?: string;
  category: string;
  subcategory?: string;
  tags: string[];
  type: GroupBuyType;

  status: GroupBuyStatus;

  requestedByUserId: string;
  requestedAt: string;
  reviewedByAdminId?: string;
  reviewedAt?: string;
  votingStartDate?: string;
  votingEndDate?: string;
  scheduledDate?: string;
  paymentDeadline?: string;
  purchaseDate?: string;
  deliveryDate?: string;
  completedDate?: string;
  cancelledDate?: string;

  voteCount: number;
  voters: string[];
  voteGoal: number;
  priorityScore: number;
  adminPriority: number;
  commentsCount: number;

  originalPrice: number;
  currency: string;
  discountPrice?: number;
  expectedTotalCost: number;
  platformFee: number;
  processorFee: number;
  bufferAmount: number;
  finalTotalCost?: number;
  minimumParticipants: number;
  maximumParticipants?: number;
  currentParticipants: number;
  shareMethod: ShareMethod;
  estimatedSharePerUser: number;
  finalSharePerUser?: number;

  licenseType?: string;
  licenseUrl?: string;
  termsStatus: TermsStatus;
  legalReviewStatus: LegalReviewStatus;
  commercialUse: boolean;
  redistributionAllowed: boolean;
  teamUseAllowed: boolean;
  accountSharingAllowed: boolean;
  numberOfSeats?: number;
  allowedParticipants?: number;
  licenseNotes?: string;
  complianceChecklist: Record<string, boolean>;
  adminComplianceNote?: string;

  participants: GroupBuyParticipant[];
  waitlist: string[];
  declinedMembers: string[];
  invitedMembers: string[];
  participantLimit?: number;
  joinRequiresApproval: boolean;
  joinStatus: 'Open' | 'Waitlist' | 'Closed';

  paymentStatus: 'Pending' | 'Collecting' | 'Completed' | 'Refunded';
  totalPaid: number;
  totalRemaining: number;
  payments: GroupBuyPayment[];
  paymentInstructions?: string;
  paymentMethods: PaymentMethodType[];
  paymentConfirmationRequired: boolean;
  refundPolicy?: string;
  refundStatus?: string;
  paymentNotes?: string;

  deliveryMethod: DeliveryMethod;
  deliveryStatus: 'Pending' | 'Ready' | 'Delivered';
  deliveryNotes?: string;
  accessInstructions?: string;
  deliveredToParticipants: string[];
  deliveryFilesMetadata?: any;

  chatMessages: GroupBuyChatMessage[];
  pinnedMessages: string[];
  announcements: any[];
  updates: any[];
  attachments: any[];
  polls: any[];
  mentions: any[];

  relatedResourceIds: string[];
  relatedSiteIds: string[];
  relatedGreatHallRoomId?: string;
  relatedCollectionIds: string[];

  isPinned: boolean;
  isFeatured: boolean;
  isHighPriority: boolean;
  isPrivate: boolean;
  visibility: 'Public' | 'Private' | 'Plan-Restricted';
  requiredPlan: PlanLevel;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
}
`;

const ago = (days, hours = 0) => new Date(Date.now() - ((days * 24 + hours) * 60 * 60 * 1000)).toISOString();
const future = (days, hours = 0) => new Date(Date.now() + ((days * 24 + hours) * 60 * 60 * 1000)).toISOString();

// Hardcoded Members (Matches Great Hall)
const allMembers = [
  { id: 'm1', username: 'alexadmin', displayName: 'Alex Admin', role: 'Admin', plan: 'Admin', avatar: 'A' },
  { id: 'm2', username: 'elenar', displayName: 'Elena Rodriguez', role: 'Patron', plan: 'Patron', avatar: 'E' },
  { id: 'm3', username: 'markt', displayName: 'Mark Taylor', role: 'Collector', plan: 'Collector', avatar: 'M' },
  { id: 'm4', username: 'sofiac', displayName: 'Sofia Chen', role: 'Patron', plan: 'Patron', avatar: 'S' },
  { id: 'm5', username: 'danielb', displayName: 'Daniel Brooks', role: 'Collector', plan: 'Collector', avatar: 'D' },
  { id: 'm6', username: 'mirap', displayName: 'Mira Patel', role: 'Member', plan: 'Member', avatar: 'M' },
  { id: 'm7', username: 'leom', displayName: 'Leo Martin', role: 'Patron', plan: 'Patron', avatar: 'L' },
  { id: 'm8', username: 'hannaw', displayName: 'Hanna Weber', role: 'Collector', plan: 'Collector', avatar: 'H' },
  { id: 'm9', username: 'yusufk', displayName: 'Yusuf Khan', role: 'Patron', plan: 'Patron', avatar: 'Y' },
  { id: 'm10', username: 'claran', displayName: 'Clara Novak', role: 'Member', plan: 'Member', avatar: 'C' },
  { id: 'm11', username: 'omarr', displayName: 'Omar Reyes', role: 'Collector', plan: 'Collector', avatar: 'O' },
  { id: 'm12', username: 'ninah', displayName: 'Nina Hart', role: 'Patron', plan: 'Patron', avatar: 'N' },
  { id: 'viewer', username: 'you', displayName: 'You', role: 'Admin', plan: 'Admin', avatar: 'Y' }
];

const categories = ['Templates', 'Design Resource', 'Course', '3D Asset', 'Font', 'UI Kit', 'Software', 'Subscription'];
const subCategories = ['Framer', 'Webflow', 'Cinema 4D', 'Figma', 'Typography', 'SaaS', 'E-commerce'];
const statuses = [
  'Requested', 'Needs License Review', 'Approved for Voting', 'Voting', 
  'Scheduled', 'Active', 'Collecting Payments', 'Purchase Ready', 
  'Purchased', 'Delivered', 'Completed', 'Cancelled', 'Refunded'
];

// Generate Base Titles
const titles = [
  "Premium iPhone Mockup Library", "Advanced Cinema 4D Material Pack", "Motion UI Course Cohort Access",
  "Brand Identity Presentation System", "Webflow Components Pro Pack", "Ultimate Framer Components Bundle",
  "SaaS Dashboard UI Kit Team License", "3D Icon Pack Extended License", "Design Systems Masterclass Team Seat",
  "UI8 Mockup Mega Bundle", "Spline Scene Library Access", "Premium Typeface Family Team License",
  "Landing Page Inspiration Archive", "Product Render Lighting Library", "Editorial Presentation Template System",
  "Figma Plugin Dev Course", "Abstract Geometric 3D Shapes", "Dark Mode UI Component Kit",
  "Vintage Serif Typeface Collection", "Premium Sound Effects Bundle", "B2B SaaS Framer Template",
  "After Effects Animation Curves Presets", "High-End Packaging Mockups", "Fintech Mobile App UI Kit",
  "Grid System Poster Layouts", "Web3 Dashboard Figma File", "Creative Agency Webflow Template",
  "Minimalist E-commerce Theme", "Procreate Brush Mega Pack", "Video Editing Transitions Pack",
  "High-Resolution Grain Textures", "3D Glassmorphism Assets", "Notion Workspace Templates",
  "Tailwind CSS Pro Components", "React Native Startup Kit", "Premium Lottie Animations",
  "Photography Preset Bundle", "Isometric City 3D Models", "Voxel Art Asset Pack",
  "Retro Game Audio Collection", "Futuristic HUD Elements", "Hand-drawn SVG Illustrations",
  "Clean Sans Serif Font Family", "Real Estate Website Template", "Fitness App UI Kit",
  "Restaurant Menu Design System", "Travel Blog Webflow Template", "Crypto Wallet Mobile UI",
  "Dashboard Chart Library", "Social Media Templates Pack"
];

const mockGroupBuys = [];

for (let i = 0; i < 50; i++) {
  const status = statuses[i % statuses.length];
  const title = titles[i % titles.length] || `Group Buy Item ${i}`;
  const price = Math.floor(Math.random() * 800) + 150;
  const maxParts = Math.floor(Math.random() * 15) + 5;
  const currentParts = (status === 'Requested' || status === 'Voting') ? 0 : Math.floor(Math.random() * maxParts) + 1;
  const sharePrice = parseFloat((price / maxParts).toFixed(2));
  
  const creator = allMembers[i % allMembers.length];
  
  let legalStatus = 'Approved';
  if (status === 'Requested' || status === 'Needs License Review') legalStatus = 'Pending';
  
  // Participants
  const participants = [];
  const payments = [];
  const chatMessages = [];
  const timeline = [];
  
  timeline.push({ id: `tl-${i}-1`, type: 'requested', actorName: creator.displayName, timestamp: ago(40 + i) });
  
  if (legalStatus === 'Approved') {
    timeline.push({ id: `tl-${i}-2`, type: 'approved', actorName: 'Alex Admin', timestamp: ago(35 + i) });
  }

  // Determine Payment Status
  let paymentStatus = 'Pending';
  if (['Collecting Payments', 'Purchase Ready'].includes(status)) paymentStatus = 'Collecting';
  if (['Purchased', 'Delivered', 'Completed'].includes(status)) paymentStatus = 'Completed';
  if (['Refunded'].includes(status)) paymentStatus = 'Refunded';

  let totalPaid = 0;

  if (currentParts > 0) {
    const participantMembers = [...allMembers].sort(() => 0.5 - Math.random()).slice(0, currentParts);
    // Guarantee Viewer in roughly 20% of active ones
    if (i % 5 === 0 && !participantMembers.find(m => m.id === 'viewer')) {
      participantMembers[0] = allMembers.find(m => m.id === 'viewer');
    }

    participantMembers.forEach((m, idx) => {
      let pStatus = 'Joined';
      let pPaid = 0;
      
      if (paymentStatus === 'Collecting') {
        pStatus = idx % 2 === 0 ? 'Paid' : 'Payment Pending';
        if (pStatus === 'Paid') pPaid = sharePrice;
      } else if (paymentStatus === 'Completed') {
        pStatus = status === 'Delivered' || status === 'Completed' ? 'Delivered' : 'Confirmed';
        pPaid = sharePrice;
      } else if (paymentStatus === 'Refunded') {
        pStatus = 'Refunded';
        pPaid = 0;
      }
      
      totalPaid += pPaid;

      participants.push({
        userId: m.id,
        displayName: m.displayName,
        username: m.username,
        avatar: m.avatar,
        plan: m.plan,
        role: m.role,
        joinedAt: ago(30 - idx),
        status: pStatus,
        shareAmount: sharePrice,
        amountPaid: pPaid,
        paymentMethod: pPaid > 0 ? 'Stripe' : undefined,
        paidAt: pPaid > 0 ? ago(20 - idx) : undefined,
        confirmedAt: pPaid > 0 ? ago(19 - idx) : undefined,
        hasReceivedAccess: pStatus === 'Delivered',
        accessDeliveredAt: pStatus === 'Delivered' ? ago(5 - idx) : undefined
      });

      if (pPaid > 0) {
        payments.push({
          id: `pay-${i}-${idx}`,
          groupBuyId: `gb-${i}`,
          userId: m.id,
          participantName: m.displayName,
          amount: pPaid,
          currency: 'USD',
          method: 'Stripe',
          status: 'Confirmed',
          submittedAt: ago(20 - idx),
          confirmedAt: ago(19 - idx),
          confirmedBy: 'm1'
        });
      }
    });
  }

  // Add Chats for active/completed ones
  if (['Collecting Payments', 'Purchased', 'Delivered', 'Completed'].includes(status)) {
    chatMessages.push({
      id: `chat-${i}-1`,
      authorId: 'm1', authorName: 'Alex Admin', authorRole: 'Admin', avatar: 'A',
      content: `Welcome to the group buy! We have hit our goal of ${currentParts} participants. Payments are now open.`,
      timestamp: ago(21),
      pinned: true
    });
    chatMessages.push({
      id: `chat-${i}-2`,
      authorId: participants[0]?.userId || 'm2', authorName: participants[0]?.displayName || 'Elena', authorRole: 'Member', avatar: 'E',
      content: `Awesome! Just sent my payment via Stripe. Let me know when it clears.`,
      timestamp: ago(20)
    });
    chatMessages.push({
      id: `chat-${i}-3`,
      authorId: 'm1', authorName: 'Alex Admin', authorRole: 'Admin', avatar: 'A',
      content: `Confirmed! We need ${maxParts - currentParts + 1} more payments before we execute the purchase.`,
      timestamp: ago(19)
    });
    
    if (status === 'Delivered' || status === 'Completed') {
      chatMessages.push({
        id: `chat-${i}-4`,
        authorId: 'm1', authorName: 'Alex Admin', authorRole: 'Admin', avatar: 'A',
        content: `The purchase is complete! I am distributing the team seats to everyone's email now. Check your inboxes.`,
        timestamp: ago(6)
      });
      chatMessages.push({
        id: `chat-${i}-5`,
        authorId: participants[participants.length-1]?.userId || 'm3', authorName: participants[participants.length-1]?.displayName || 'Mark', authorRole: 'Member', avatar: 'M',
        content: `Got it! Everything looks great. Thanks for organizing.`,
        timestamp: ago(5)
      });
      timeline.push({ id: `tl-${i}-3`, type: 'purchased', actorName: 'Alex Admin', timestamp: ago(6) });
      timeline.push({ id: `tl-${i}-4`, type: 'delivered', actorName: 'Alex Admin', timestamp: ago(5) });
      timeline.push({ id: `tl-${i}-5`, type: 'completed', actorName: 'Alex Admin', timestamp: ago(1) });
    }
  }

  mockGroupBuys.push({
    id: `gb-${i + 1}`,
    slug: title.toLowerCase().replace(/\\s+/g, '-'),
    title: title,
    shortDescription: `A collective group-buy for ${title}. Securing a team or extended license to split costs.`,
    longDescription: `This group-buy aims to secure access to ${title}. By joining forces, we can distribute the high cost of the team/extended license among the community. The product features incredible components and assets that will greatly speed up our workflows. Please ensure you agree to the usage terms before joining.`,
    productName: title,
    productUrl: 'https://example.com/product',
    sourceName: 'Design Studio',
    sourceUrl: 'https://example.com',
    creatorName: 'Studio Team',
    creatorUrl: 'https://example.com/team',
    category: categories[i % categories.length],
    tags: ['Premium', 'Agency', 'Team License'],
    type: 'Design Resource',
    status: status,
    requestedByUserId: creator.id,
    requestedAt: ago(40 + i),
    reviewedByAdminId: 'm1',
    reviewedAt: ago(35 + i),
    votingStartDate: (status !== 'Requested' && status !== 'Needs License Review') ? ago(34 + i) : undefined,
    votingEndDate: (status === 'Voting') ? future(5) : ago(25 + i),
    scheduledDate: ['Scheduled', 'Active', 'Collecting Payments', 'Purchased', 'Delivered', 'Completed'].includes(status) ? ago(20) : undefined,
    paymentDeadline: ['Collecting Payments'].includes(status) ? future(2) : undefined,
    purchaseDate: ['Purchased', 'Delivered', 'Completed'].includes(status) ? ago(6) : undefined,
    deliveryDate: ['Delivered', 'Completed'].includes(status) ? ago(5) : undefined,
    completedDate: status === 'Completed' ? ago(1) : undefined,
    cancelledDate: status === 'Cancelled' ? ago(2) : undefined,

    voteCount: Math.floor(Math.random() * 50) + 10,
    voters: [],
    voteGoal: 15,
    priorityScore: Math.floor(Math.random() * 100),
    adminPriority: Math.floor(Math.random() * 100),
    commentsCount: Math.floor(Math.random() * 20),

    originalPrice: price,
    currency: 'USD',
    expectedTotalCost: price,
    platformFee: 0,
    processorFee: 10,
    bufferAmount: 5,
    finalTotalCost: price + 15,
    minimumParticipants: 5,
    maximumParticipants: maxParts,
    currentParticipants: currentParts,
    shareMethod: 'Equal Split',
    estimatedSharePerUser: sharePrice,
    finalSharePerUser: sharePrice,

    licenseType: 'Team / Extended',
    termsStatus: 'Team License Available',
    legalReviewStatus: legalStatus,
    commercialUse: true,
    redistributionAllowed: false,
    teamUseAllowed: true,
    accountSharingAllowed: false,
    numberOfSeats: maxParts,
    complianceChecklist: { verifiedSeller: true, teamLicense: true },

    participants: participants,
    waitlist: [],
    declinedMembers: [],
    invitedMembers: [],
    participantLimit: maxParts,
    joinRequiresApproval: false,
    joinStatus: currentParts >= maxParts ? 'Closed' : 'Open',

    paymentStatus: paymentStatus,
    totalPaid: parseFloat(totalPaid.toFixed(2)),
    totalRemaining: parseFloat(((currentParts * sharePrice) - totalPaid).toFixed(2)),
    payments: payments,
    paymentInstructions: 'Please send your exact share via Stripe checkout. A link will be provided in the chat.',
    paymentMethods: ['Stripe', 'Crypto', 'Wise'],
    paymentConfirmationRequired: true,

    deliveryMethod: 'Seller Invite',
    deliveryStatus: status === 'Delivered' || status === 'Completed' ? 'Delivered' : 'Pending',
    deliveredToParticipants: participants.filter(p => p.hasReceivedAccess).map(p => p.userId),
    
    chatMessages: chatMessages,
    pinnedMessages: chatMessages.filter(m => m.pinned).map(m => m.id),
    announcements: [],
    updates: [],
    attachments: [],
    polls: [],
    mentions: [],

    relatedResourceIds: status === 'Completed' ? ['RES-101', 'RES-102'] : [],
    relatedSiteIds: [],
    relatedCollectionIds: [],

    isPinned: i % 10 === 0,
    isFeatured: i % 5 === 0,
    isHighPriority: i % 7 === 0,
    isPrivate: false,
    visibility: 'Public',
    requiredPlan: 'Member',
    createdAt: ago(40 + i),
    updatedAt: ago(1),
    lastActivityAt: ago(1)
  });
}

const output = typesAndImports + `\n\nexport const mockGroupBuys: GroupBuy[] = ${JSON.stringify(mockGroupBuys, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, 'groupBuysData.ts'), output);
console.log('Generated groupBuysData.ts successfully!');
