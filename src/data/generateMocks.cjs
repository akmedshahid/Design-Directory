const fs = require('fs');
const path = require('path');

const types = `// Models for Great Hall V2

export type GreatHallAccess = 'Open' | 'Member' | 'Collector' | 'Patron' | 'Admin';
export type GreatHallRole = 'Admin' | 'Patron' | 'Collector' | 'Member';

export interface GreatHallRoomPreview {
  id: string;
  name: string;
  description: string;
  iconLabel: string;
  memberCount: number;
  onlineCount: number;
  unreadCount: number;
  access: GreatHallAccess;
  accent: string;
  memberIds: string[];
  about?: string;
  linkedRoomIds?: string[];
  linkedRequestIds?: string[];
  linkedResourceIds?: string[];
  linkedSiteIds?: string[];
  fileAttachments?: { id: string; name: string; url: string; type: string; size: string; uploadedBy: string; uploadedAt: string; }[];
  tags?: string[];
  rules?: string[];
}

export interface GreatHallGroupPreview {
  id: string;
  name: string;
  description: string;
  iconLabel: string;
  memberCount: number;
  access: Exclude<GreatHallAccess, 'Open'>;
  accent: string;
  about: string;
  memberIds: string[];
  linkedRoomIds: string[];
  linkedRequestIds: string[];
}

export interface GreatHallChatMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: GreatHallRole;
  avatar: string;
  content: string;
  timestamp: string;
  pinned?: boolean;
  attachments?: { type: 'file' | 'image' | 'gif' | 'resource' | 'site' | 'request'; url?: string; name?: string; targetId?: string; }[];
  reactions?: { emoji: string; count: number; userIds: string[] }[];
  replyToId?: string;
  isSystem?: boolean;
}

export interface GreatHallConversation {
  id: string;
  memberId: string;
  memberName: string;
  memberRole: GreatHallRole;
  avatar: string;
  online: boolean;
  unreadCount: number;
  updatedAt: string;
  messages: GreatHallChatMessage[];
}


export type PlanLevel = 'Member' | 'Collector' | 'Patron' | 'Admin';
export type RequestStatus = 'Open' | 'In Progress' | 'Fulfilled' | 'Solved' | 'Expired' | 'Closed' | 'Archived';
export type RequestPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface GHTimelineEvent {
  id: string;
  type: 'created' | 'status_change' | 'suggestion_added' | 'solution_marked';
  actorId: string;
  actorName: string;
  timestamp: string;
  details?: string;
}

export interface GHReply {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: PlanLevel;
  avatar: string;
  content: string;
  timestamp: string;
  isSolution?: boolean;
  upvotes: number;
}

export interface GHSuggestion {
  id: string;
  resourceId?: string; // Links to global resource ID
  siteId?: string;     // Links to global site ID
  externalUrl?: string;
  title: string;
  description: string;
  suggestedBy: string;
  suggestedById: string;
  upvotes: number;
  isAccepted: boolean;
  attachment?: { type: string; url: string; name: string };
}

export interface GHRequest {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  authorId: string;
  authorName: string;
  authorRole: PlanLevel;
  avatar: string;
  category: string;
  tags: string[];
  status: RequestStatus;
  priority: RequestPriority;
  visibility: 'public' | 'group' | 'private';
  upvotes: number;
  watchers: number;
  replies: GHReply[];
  suggestions: GHSuggestion[];
  timeline: GHTimelineEvent[];
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  autoDeleteAfterDays?: number;
  requiredPlan?: PlanLevel;
  thumbnailStyle?: string;
  thumbnailUrl?: string;
  requestType?: string;
  attachments?: { id: string; name: string; url: string; type: string; }[];
  fulfillment?: {
    fulfilledBy: string;
    fulfilledAt: string;
    type: 'resource' | 'site' | 'file' | 'link' | 'text';
    linkedId?: string;
    linkedUrl?: string;
    addedToResources?: boolean;
    addedToSites?: boolean;
  };
  pushedToResources?: string;
  pushedToSites?: string;
}

export interface GHMember {
  id: string;
  username: string;
  displayName: string;
  role: PlanLevel;
  level: number;
  bio: string;
  tags: string[];
  joinedAt: string;
  avatar: string;
  online: boolean;
  socials: {
    twitter?: string;
    github?: string;
    dribbble?: string;
    website?: string;
  };
  roomsJoined?: string[];
  requestsCreated?: number;
  solvedRequests?: number;
  repliesCount?: number;
  sharedResources?: number;
  recentActivity: {
    type: 'request' | 'resource_submit' | 'reply' | 'room_join' | 'site_submit' | 'dm_action' | 'group_participation';
    targetId: string;
    title: string;
    date: string;
  }[];
}

export interface GHSavedItem {
  id: string;
  type: 'request' | 'post' | 'reply' | 'file' | 'resource' | 'site' | 'suggestion';
  title: string;
  description?: string;
  savedAt: string;
  targetId: string;
  targetRoute: string;
}

export interface GHNotification {
  id: string;
  type: 'dm' | 'mention' | 'request_reply' | 'request_fulfilled' | 'suggestion_accepted' | 'room_announcement' | 'file_shared' | 'admin_update' | 'member_joined' | 'request_expiring' | 'pushed_to_resources' | 'pushed_to_sites';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  targetRoute: string;
}

export interface GHAdminQueueItem {
  id: string;
  status: 'pending' | 'reviewed' | 'resolved';
  type: 'pending_request' | 'flagged_comment' | 'reported_message' | 'suggested_resource' | 'suggested_site' | 'fulfillment_review' | 'expired_request' | 'room_moderation' | 'member_report';
  submittedBy: string;
  date: string;
  reason: string;
  linkedItemId?: string;
  reviewNotes?: string;
  adminActions?: string[];
}

export const conversationIdForMember = (memberId: string) => \`thread-\${memberId}\`;
`;

const ago = (hours, minutes = 0) => new Date(Date.now() - ((hours * 60) + minutes) * 60 * 1000).toISOString();

const members = {
  'm1': { id: 'm1', username: 'alexadmin', displayName: 'Alex Admin', role: 'Admin', level: 42, bio: 'Platform curator and lead designer. Always looking for the next great tool.', tags: ['UI/UX', 'Framer', 'Systems'], joinedAt: 'Jan 2024', avatar: 'A', online: true, socials: { twitter: '@curator' }, roomsJoined: ['general-chat', 'announcements', 'admin-room'], requestsCreated: 15, solvedRequests: 42, repliesCount: 300, sharedResources: 150, recentActivity: [{ type: 'reply', targetId: 'REQ-1', title: 'Replied to Dark Mode SaaS request', date: ago(2) }, { type: 'resource_submit', targetId: 'RES-101', title: 'Curated new Dark Mode UI kit', date: ago(24) }] },
  'm2': { id: 'm2', username: 'elenar', displayName: 'Elena Rodriguez', role: 'Patron', level: 18, bio: 'Product Designer @ Fintech startup. Passionate about micro-interactions.', tags: ['Product', 'Motion', 'Finance'], joinedAt: 'Mar 2024', avatar: 'E', online: true, socials: { dribbble: 'elenadesigns' }, roomsJoined: ['general-chat', 'design-feedback', 'motion-3d'], requestsCreated: 5, solvedRequests: 2, repliesCount: 45, sharedResources: 10, recentActivity: [{ type: 'request', targetId: 'REQ-1', title: 'Requested: Looking for dark mode SaaS mockups', date: ago(5) }, { type: 'room_join', targetId: 'motion-3d', title: 'Joined Motion & 3D room', date: ago(48) }] },
  'm3': { id: 'm3', username: 'markt', displayName: 'Mark Taylor', role: 'Collector', level: 12, bio: 'Freelance web designer specializing in Webflow and Framer transitions.', tags: ['Webflow', 'Framer', 'Freelance'], joinedAt: 'Apr 2024', avatar: 'M', online: false, socials: {}, roomsJoined: ['general-chat', 'framer-development'], requestsCreated: 8, solvedRequests: 5, repliesCount: 88, sharedResources: 5, recentActivity: [{ type: 'reply', targetId: 'REQ-2', title: 'Replied to Serif Fonts request', date: ago(24) }] },
  'm4': { id: 'm4', username: 'sofiac', displayName: 'Sofia Chen', role: 'Patron', level: 25, bio: 'Motion designer crafting fluid interactions and 3D scenes.', tags: ['Motion', 'After Effects', 'Framer'], joinedAt: 'Feb 2024', avatar: 'S', online: true, socials: { twitter: '@sofiac' }, roomsJoined: ['motion-3d', 'showcase'], requestsCreated: 2, solvedRequests: 18, repliesCount: 150, sharedResources: 25, recentActivity: [{ type: 'resource_submit', targetId: 'RES-102', title: 'Shared Fluid Motion Kit', date: ago(72) }, { type: 'reply', targetId: 'REQ-13', title: 'Replied to UI transitions request', date: ago(12) }] },
  'm5': { id: 'm5', username: 'danielb', displayName: 'Daniel Brooks', role: 'Collector', level: 15, bio: 'Framer developer building high-end landing pages for SaaS.', tags: ['React', 'Framer', 'Code'], joinedAt: 'May 2024', avatar: 'D', online: true, socials: { github: 'danb' }, roomsJoined: ['framer-development', 'landing-page-reviews'], requestsCreated: 4, solvedRequests: 12, repliesCount: 65, sharedResources: 8, recentActivity: [{ type: 'reply', targetId: 'REQ-3', title: 'Replied to Framer template request', date: ago(1) }] },
  'm6': { id: 'm6', username: 'mirap', displayName: 'Mira Patel', role: 'Member', level: 8, bio: 'Brand designer focused on identity and systems.', tags: ['Branding', 'Typography', 'Logo'], joinedAt: 'Jun 2024', avatar: 'M', online: false, socials: {}, roomsJoined: ['branding-lab', 'typography'], requestsCreated: 3, solvedRequests: 1, repliesCount: 12, sharedResources: 2, recentActivity: [{ type: 'request', targetId: 'REQ-4', title: 'Requested: Need Cinema 4D materials', date: ago(48) }] },
  'm7': { id: 'm7', username: 'leom', displayName: 'Leo Martin', role: 'Patron', level: 30, bio: '3D artist creating abstract hero scenes.', tags: ['3D', 'Cinema 4D', 'Blender'], joinedAt: 'Jan 2024', avatar: 'L', online: true, socials: { dribbble: 'leomartin' }, roomsJoined: ['motion-3d', 'showcase'], requestsCreated: 1, solvedRequests: 25, repliesCount: 210, sharedResources: 40, recentActivity: [{ type: 'reply', targetId: 'REQ-4', title: 'Suggested Material Pack for C4D', date: ago(24) }] },
  'm8': { id: 'm8', username: 'hannaw', displayName: 'Hanna Weber', role: 'Collector', level: 14, bio: 'Typography researcher and editorial designer.', tags: ['Typography', 'Editorial', 'Print'], joinedAt: 'Jul 2024', avatar: 'H', online: false, socials: {}, roomsJoined: ['typography', 'design-feedback'], requestsCreated: 6, solvedRequests: 8, repliesCount: 54, sharedResources: 12, recentActivity: [{ type: 'reply', targetId: 'REQ-2', title: 'Suggested Newsreader font', date: ago(4) }] },
  'm9': { id: 'm9', username: 'yusufk', displayName: 'Yusuf Khan', role: 'Patron', level: 22, bio: 'AI workflow builder for creative agencies.', tags: ['AI', 'Workflows', 'Automation'], joinedAt: 'Feb 2024', avatar: 'Y', online: true, socials: { twitter: '@yusufk' }, roomsJoined: ['ai-workflows', 'tools-workflows'], requestsCreated: 7, solvedRequests: 14, repliesCount: 110, sharedResources: 18, recentActivity: [{ type: 'request', targetId: 'REQ-5', title: 'Requested: Looking for AI video tools', date: ago(6) }] },
  'm10': { id: 'm10', username: 'claran', displayName: 'Clara Novak', role: 'Member', level: 5, bio: 'UI systems designer building scaleable libraries.', tags: ['Figma', 'Systems', 'UI'], joinedAt: 'Aug 2024', avatar: 'C', online: true, socials: {}, roomsJoined: ['figma-systems', 'design-feedback'], requestsCreated: 2, solvedRequests: 0, repliesCount: 8, sharedResources: 1, recentActivity: [{ type: 'reply', targetId: 'REQ-7', title: 'Replied to Dashboard tables request', date: ago(2) }] },
  'm11': { id: 'm11', username: 'omarr', displayName: 'Omar Reyes', role: 'Collector', level: 17, bio: 'Webflow specialist and technical SEO.', tags: ['Webflow', 'SEO', 'Development'], joinedAt: 'May 2024', avatar: 'O', online: false, socials: { github: 'omarr' }, roomsJoined: ['tools-workflows', 'landing-page-reviews'], requestsCreated: 5, solvedRequests: 4, repliesCount: 42, sharedResources: 6, recentActivity: [{ type: 'request', targetId: 'REQ-12', title: 'Requested: Find pricing page references', date: ago(24) }] },
  'm12': { id: 'm12', username: 'ninah', displayName: 'Nina Hart', role: 'Patron', level: 28, bio: 'Creative director managing multiple brand accounts.', tags: ['Direction', 'Strategy', 'Branding'], joinedAt: 'Jan 2024', avatar: 'N', online: false, socials: {}, roomsJoined: ['branding-lab', 'premium-lounge'], requestsCreated: 12, solvedRequests: 10, repliesCount: 165, sharedResources: 22, recentActivity: [{ type: 'request', targetId: 'REQ-8', title: 'Requested: Need packaging mockups', date: ago(72) }] },
  'm13': { id: 'm13', username: 'quietuser', displayName: 'Sam Quiet', role: 'Member', level: 1, bio: 'Observing and learning.', tags: ['Learning'], joinedAt: 'Oct 2024', avatar: 'S', online: false, socials: {}, roomsJoined: ['general-chat'], requestsCreated: 0, solvedRequests: 0, repliesCount: 0, sharedResources: 0, recentActivity: [] },
  'viewer': { id: 'viewer', username: 'you', displayName: 'You', role: 'Admin', level: 50, bio: 'Platform Builder.', tags: ['Engineering'], joinedAt: 'Today', avatar: 'Y', online: true, socials: {}, roomsJoined: ['admin-room', 'general-chat'], requestsCreated: 0, solvedRequests: 0, repliesCount: 0, sharedResources: 0, recentActivity: [] }
};

const requestsData = [
  { id: 'REQ-1', slug: 'dark-mode-saas', title: 'Looking for high-quality dark mode SaaS dashboard mockups', status: 'Open', priority: 'high', cat: 'Mockups' },
  { id: 'REQ-2', slug: 'serif-fonts-editorial', title: 'Need clean serif fonts for an editorial identity', status: 'Solved', priority: 'normal', cat: 'Typography' },
  { id: 'REQ-3', slug: 'framer-agency-template', title: 'Find a premium Framer agency template', status: 'In Progress', priority: 'high', cat: 'Templates' },
  { id: 'REQ-4', slug: 'c4d-materials', title: 'Need Cinema 4D material libraries for product renders', status: 'Open', priority: 'normal', cat: '3D Assets' },
  { id: 'REQ-5', slug: 'ai-video-workflows', title: 'Looking for AI image-to-video workflow tools', status: 'Open', priority: 'urgent', cat: 'Tools' },
  { id: 'REQ-6', slug: 'onboarding-flows', title: 'Need onboarding flow references for a mobile app', status: 'In Progress', priority: 'normal', cat: 'Inspiration' },
  { id: 'REQ-7', slug: 'dashboard-tables', title: 'Looking for dashboard table UI examples', status: 'Open', priority: 'low', cat: 'Inspiration' },
  { id: 'REQ-8', slug: 'supplement-packaging', title: 'Need packaging mockups for supplement brand', status: 'Closed', priority: 'normal', cat: 'Mockups' },
  { id: 'REQ-9', slug: 'fintech-icons', title: 'Find premium icon systems for fintech UI', status: 'Fulfilled', priority: 'high', cat: 'Icons' },
  { id: 'REQ-10', slug: 'brand-guidelines', title: 'Looking for brand guideline presentation templates', status: 'Open', priority: 'normal', cat: 'Templates' },
  { id: 'REQ-11', slug: '3d-abstract-hero', title: 'Need 3D abstract hero scene resources', status: 'Open', priority: 'normal', cat: '3D Assets' },
  { id: 'REQ-12', slug: 'pricing-pages', title: 'Find high-end pricing page references', status: 'Fulfilled', priority: 'low', cat: 'Inspiration' },
  { id: 'REQ-13', slug: 'animation-curves', title: 'Need animation curves for smooth UI transitions', status: 'Expired', priority: 'normal', cat: 'Motion' },
  { id: 'REQ-14', slug: 'figma-variables', title: 'Looking for Figma variable systems templates', status: 'Archived', priority: 'high', cat: 'Templates' },
  { id: 'REQ-15', slug: 'webflow-ecommerce', title: 'Need Webflow e-commerce best practices', status: 'Open', priority: 'normal', cat: 'Development' }
];

const requests = requestsData.map((req, i) => {
  const authorKeys = Object.keys(members).filter(k => k !== 'viewer' && k !== 'm13');
  const authorId = authorKeys[i % authorKeys.length];
  const author = members[authorId];
  
  let fulfillmentData = undefined;
  if (req.status === 'Fulfilled' || req.status === 'Solved') {
    fulfillmentData = {
      fulfilledBy: 'm1',
      fulfilledAt: ago(i * 2),
      type: i % 2 === 0 ? 'resource' : 'site',
      linkedId: i % 2 === 0 ? 'RES-101' : 'SITE-202',
      linkedUrl: '/app/resources/RES-101',
      addedToResources: i % 2 === 0,
      addedToSites: i % 2 !== 0
    };
  }

  return {
    id: req.id,
    slug: req.slug,
    title: req.title,
    shortDesc: `I'm currently looking for best-in-class resources for ${req.title.toLowerCase()} to reference in an upcoming project.`,
    longDesc: `Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for ${req.title.toLowerCase()}. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.`,
    authorId, authorName: author.displayName, authorRole: author.role, avatar: author.avatar,
    category: req.cat,
    tags: [req.cat, 'Premium', 'References'],
    status: req.status,
    priority: req.priority,
    visibility: 'public',
    upvotes: Math.floor(Math.random() * 50) + 15,
    watchers: Math.floor(Math.random() * 20) + 5,
    createdAt: ago(100 + i),
    updatedAt: ago(i),
    expiresAt: req.status === 'Open' ? ago(-100) : undefined,
    autoDeleteAfterDays: 30,
    requiredPlan: 'Member',
    requestType: 'Resource Request',
    attachments: [
      { id: `att-${req.id}-1`, name: 'visual_reference_01.jpg', url: '#', type: 'image/jpeg' },
      { id: `att-${req.id}-2`, name: 'moodboard.fig', url: '#', type: 'application/x-figma' }
    ],
    fulfillment: fulfillmentData,
    pushedToResources: fulfillmentData?.addedToResources ? fulfillmentData.linkedId : undefined,
    pushedToSites: fulfillmentData?.addedToSites ? fulfillmentData.linkedId : undefined,
    suggestions: [
      { id: `sug-${req.id}-1`, title: 'SaaS Design System Pro', description: 'This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.', externalUrl: 'https://ui8.net', suggestedBy: 'Alex Admin', suggestedById: 'm1', upvotes: 24, isAccepted: req.status === 'Fulfilled' || req.status === 'Solved' },
      { id: `sug-${req.id}-2`, title: 'Linear App References', description: 'You should look at how Linear structures their tables and modals. I saved a collection here.', siteId: 'SITE-12', suggestedBy: 'Elena Rodriguez', suggestedById: 'm2', upvotes: 12, isAccepted: false },
      { id: `sug-${req.id}-3`, title: 'Custom Zip Archive', description: 'I compiled a few screenshots from my last project. Hope this helps!', attachment: { type: 'application/zip', url: '#', name: 'references.zip' }, suggestedBy: 'Mark Taylor', suggestedById: 'm3', upvotes: 8, isAccepted: false },
      { id: `sug-${req.id}-4`, title: 'Godly Website', description: 'Godly has a great filter for this exact style.', externalUrl: 'https://godly.website', suggestedBy: 'Nina Hart', suggestedById: 'm12', upvotes: 15, isAccepted: false }
    ],
    replies: [
      { id: `rep-${req.id}-1`, authorId: 'm4', authorName: 'Sofia Chen', authorRole: 'Patron', avatar: 'S', content: 'I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.', timestamp: ago(40), upvotes: 14 },
      { id: `rep-${req.id}-2`, authorId: 'm5', authorName: 'Daniel Brooks', authorRole: 'Collector', avatar: 'D', content: 'Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.', timestamp: ago(35), upvotes: 8 },
      { id: `rep-${req.id}-3`, authorId: 'm6', authorName: 'Mira Patel', authorRole: 'Member', avatar: 'M', content: 'Does anyone have a free alternative? Im just exploring this for a personal concept right now.', timestamp: ago(30), upvotes: 2 },
      { id: `rep-${req.id}-4`, authorId: 'm7', authorName: 'Leo Martin', authorRole: 'Patron', avatar: 'L', content: 'I have some C4D files I can share directly if you DM me. Too large to upload here.', timestamp: ago(25), upvotes: 16 },
      { id: `rep-${req.id}-5`, authorId: 'm8', authorName: 'Hanna Weber', authorRole: 'Collector', avatar: 'H', content: 'Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.', timestamp: ago(15), upvotes: 5 }
    ],
    timeline: [
      { id: `tl-${req.id}-1`, type: 'created', actorId: authorId, actorName: author.displayName, timestamp: ago(100 + i) },
      { id: `tl-${req.id}-2`, type: 'suggestion_added', actorId: 'm1', actorName: 'Alex Admin', timestamp: ago(90), details: 'Suggested SaaS Design System Pro' },
      { id: `tl-${req.id}-3`, type: 'suggestion_added', actorId: 'm2', actorName: 'Elena Rodriguez', timestamp: ago(85), details: 'Suggested Linear App References' },
      { id: `tl-${req.id}-4`, type: 'status_change', actorId: 'm1', actorName: 'Alex Admin', timestamp: ago(80), details: `Status changed to ${req.status}` },
      { id: `tl-${req.id}-5`, type: 'suggestion_added', actorId: 'm3', actorName: 'Mark Taylor', timestamp: ago(70), details: 'Added Custom Zip Archive' },
      ...(req.status === 'Fulfilled' || req.status === 'Solved' ? [{ id: `tl-${req.id}-6`, type: 'solution_marked', actorId: authorId, actorName: author.displayName, timestamp: ago(60), details: `Accepted SaaS Design System Pro` }] : [])
    ]
  };
});

const roomsDataList = [
  { id: 'general-chat', name: 'General Lounge', desc: 'Daily conversations, intros, and quick links across the community.', access: 'Open', accent: 'rgba(92, 108, 255, 0.18)', tags: ['Community', 'Chat'], rules: ['Be respectful', 'No spam'] },
  { id: 'announcements', name: 'Announcements', desc: 'Curator notes, releases, and important updates for all members.', access: 'Open', accent: 'rgba(245, 158, 11, 0.18)', tags: ['Updates', 'News'] },
  { id: 'design-feedback', name: 'Design Feedback', desc: 'Work-in-progress reviews for interfaces, motion, and product polish.', access: 'Member', accent: 'rgba(59, 130, 246, 0.18)', tags: ['Feedback', 'Critique'] },
  { id: 'resource-requests', name: 'Resource Requests', desc: 'Open threads for references, files, tools, and hard-to-find assets.', access: 'Collector', accent: 'rgba(16, 185, 129, 0.18)', tags: ['Requests', 'Assets'] },
  { id: 'showcase', name: 'Showcase', desc: 'Launches, experiments, and high-signal work worth studying.', access: 'Member', accent: 'rgba(236, 72, 153, 0.18)', tags: ['Showcase', 'Inspiration'] },
  { id: 'framer-development', name: 'Framer Development', desc: 'Framer-heavy site launches, components, and CMS setups.', access: 'Collector', accent: 'linear-gradient(135deg, #5C6CFF, #181C34)', tags: ['Framer', 'Code'] },
  { id: 'figma-systems', name: 'Figma Systems', desc: 'System libraries, token structure, and documentation habits.', access: 'Collector', accent: 'linear-gradient(135deg, #F59E0B, #281A0F)', tags: ['Figma', 'Systems'] },
  { id: 'motion-3d', name: 'Motion & 3D', desc: 'Critique and references for scenes, motion studies, and product renders.', access: 'Patron', accent: 'linear-gradient(135deg, #10B981, #0E161B)', tags: ['3D', 'Motion'] },
  { id: 'ai-workflows', name: 'AI Workflows', desc: 'Pipelines, automation, and AI integration for creative agencies.', access: 'Patron', accent: 'rgba(168, 85, 247, 0.18)', tags: ['AI', 'Automation'] },
  { id: 'typography', name: 'Typography', desc: 'Typeface pairings, editorial design, and foundry discussions.', access: 'Member', accent: 'rgba(239, 68, 68, 0.18)', tags: ['Fonts', 'Editorial'] },
  { id: 'branding-lab', name: 'Branding Lab', desc: 'Identity systems, guidelines, and brand strategy.', access: 'Member', accent: 'rgba(14, 165, 233, 0.18)', tags: ['Brand', 'Identity'] },
  { id: 'landing-page-reviews', name: 'Landing Page Reviews', desc: 'Conversion optimization, copy, and hero section teardowns.', access: 'Member', accent: 'rgba(249, 115, 22, 0.18)', tags: ['Marketing', 'Web'] },
  { id: 'tools-workflows', name: 'Tools & Workflows', desc: 'Private notes on production setups and software stacks.', access: 'Collector', accent: 'rgba(99, 102, 241, 0.18)', tags: ['Productivity', 'Setup'] },
  { id: 'premium-lounge', name: 'Premium Lounge', desc: 'Exclusive chat for Patron members.', access: 'Patron', accent: 'linear-gradient(135deg, #FFD700, #332B00)', tags: ['Exclusive', 'Patrons'] },
  { id: 'admin-room', name: 'Admin Room', desc: 'Moderation, platform updates, and private admin discussions.', access: 'Admin', accent: 'rgba(255, 255, 255, 0.1)', tags: ['Staff', 'Moderation'] }
];

const rooms = roomsDataList.map(r => ({
  id: r.id,
  name: r.name,
  description: r.desc,
  iconLabel: r.name.substring(0, 2).toUpperCase(),
  memberCount: Math.floor(Math.random() * 800) + 150,
  onlineCount: Math.floor(Math.random() * 80) + 15,
  unreadCount: Math.floor(Math.random() * 8),
  access: r.access,
  accent: r.accent,
  tags: r.tags,
  rules: r.rules || ['Keep it professional', 'Share context with links'],
  memberIds: Object.keys(members).filter(k => members[k].roomsJoined?.includes(r.id)),
  linkedRoomIds: r.id === 'general-chat' ? ['announcements', 'showcase'] : [],
  linkedRequestIds: requests.slice(0, 5).map(req => req.id),
  linkedResourceIds: ['RES-101', 'RES-102', 'RES-103'],
  linkedSiteIds: ['SITE-201', 'SITE-202'],
  fileAttachments: [
    { id: `${r.id}-f1`, name: `${r.name.replace(' ', '_')}_Guidelines.pdf`, url: '#', type: 'application/pdf', size: '2.4 MB', uploadedBy: 'Alex Admin', uploadedAt: ago(240) },
    { id: `${r.id}-f2`, name: 'Weekly_References.zip', url: '#', type: 'application/zip', size: '14.1 MB', uploadedBy: 'Elena Rodriguez', uploadedAt: ago(48) },
    { id: `${r.id}-f3`, name: 'Component_Spec_V3.fig', url: '#', type: 'application/octet-stream', size: '8.2 MB', uploadedBy: 'Clara Novak', uploadedAt: ago(12) },
    { id: `${r.id}-f4`, name: 'Moodboard_Final.png', url: '#', type: 'image/png', size: '4.5 MB', uploadedBy: 'Mira Patel', uploadedAt: ago(5) },
    { id: `${r.id}-f5`, name: 'Asset_Pack_Lite.zip', url: '#', type: 'application/zip', size: '25 MB', uploadedBy: 'Leo Martin', uploadedAt: ago(2) }
  ]
}));

const roomMessages = {};
rooms.forEach(r => {
  const msgs = [];
  const roomMembers = Object.values(members).filter(m => m.roomsJoined?.includes(r.id));
  const activeMembers = roomMembers.length > 0 ? roomMembers : Object.values(members).slice(0, 5);
  
  // Pinned messages
  msgs.push({
    id: `${r.id}-msg-p1`, authorId: 'm1', authorName: 'Alex Admin', authorRole: 'Admin', avatar: 'A',
    content: `**Welcome to ${r.name}**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.`,
    timestamp: ago(500), pinned: true
  });
  msgs.push({
    id: `${r.id}-msg-p2`, authorId: 'm1', authorName: 'Alex Admin', authorRole: 'Admin', avatar: 'A',
    content: `Weekly roundup is posted! Check out the top requests and shared resources from this week.`,
    timestamp: ago(168), pinned: true,
    attachments: [{ type: 'resource', targetId: 'RES-101', name: 'Weekly Curator Picks' }]
  });
  msgs.push({
    id: `${r.id}-msg-p3`, authorId: 'm1', authorName: 'Alex Admin', authorRole: 'Admin', avatar: 'A',
    content: `System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.`,
    timestamp: ago(72), pinned: true, isSystem: true
  });

  // Threaded Discussion
  msgs.push({
    id: `${r.id}-msg-t1`, authorId: activeMembers[0].id, authorName: activeMembers[0].displayName, authorRole: activeMembers[0].role, avatar: activeMembers[0].avatar,
    content: `Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.`,
    timestamp: ago(24), reactions: [{ emoji: '👀', count: 4, userIds: ['m1', 'm2'] }]
  });
  msgs.push({
    id: `${r.id}-msg-t2`, authorId: activeMembers[1 % activeMembers.length].id, authorName: activeMembers[1 % activeMembers.length].displayName, authorRole: activeMembers[1 % activeMembers.length].role, avatar: activeMembers[1 % activeMembers.length].avatar,
    content: `Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.`,
    timestamp: ago(23), replyToId: `${r.id}-msg-t1`, reactions: [{ emoji: '🔥', count: 2, userIds: ['m1'] }]
  });
  msgs.push({
    id: `${r.id}-msg-t3`, authorId: activeMembers[0].id, authorName: activeMembers[0].displayName, authorRole: activeMembers[0].role, avatar: activeMembers[0].avatar,
    content: `Makes sense. I'll compress the textures in Blender first. Thanks!`,
    timestamp: ago(22), replyToId: `${r.id}-msg-t1`
  });

  // Resource Share
  msgs.push({
    id: `${r.id}-msg-r1`, authorId: activeMembers[2 % activeMembers.length].id, authorName: activeMembers[2 % activeMembers.length].displayName, authorRole: activeMembers[2 % activeMembers.length].role, avatar: activeMembers[2 % activeMembers.length].avatar,
    content: `Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.`,
    timestamp: ago(12),
    attachments: [{ type: 'site', targetId: 'SITE-201', name: 'WebGL Portfolio 2024' }]
  });

  // File Attachment
  msgs.push({
    id: `${r.id}-msg-f1`, authorId: activeMembers[3 % activeMembers.length].id, authorName: activeMembers[3 % activeMembers.length].displayName, authorRole: activeMembers[3 % activeMembers.length].role, avatar: activeMembers[3 % activeMembers.length].avatar,
    content: `Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.`,
    timestamp: ago(8),
    attachments: [{ type: 'file', url: '#', name: 'Grain_Textures_Vol1.zip' }],
    reactions: [{ emoji: '❤️', count: 12, userIds: ['m1', 'm2', 'm4'] }]
  });

  // Request Reference
  msgs.push({
    id: `${r.id}-msg-req1`, authorId: activeMembers[4 % activeMembers.length].id, authorName: activeMembers[4 % activeMembers.length].displayName, authorRole: activeMembers[4 % activeMembers.length].role, avatar: activeMembers[4 % activeMembers.length].avatar,
    content: `I'm still looking for good examples of fintech dashboards if anyone has time to check my request:`,
    timestamp: ago(5),
    attachments: [{ type: 'request', targetId: 'REQ-9', name: 'Find premium icon systems for fintech UI' }]
  });

  // Image/GIF
  msgs.push({
    id: `${r.id}-msg-img1`, authorId: activeMembers[1 % activeMembers.length].id, authorName: activeMembers[1 % activeMembers.length].displayName, authorRole: activeMembers[1 % activeMembers.length].role, avatar: activeMembers[1 % activeMembers.length].avatar,
    content: `Look at how clean this new component structure is:`,
    timestamp: ago(2),
    attachments: [{ type: 'image', url: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80', name: 'figma_structure.png' }]
  });
  
  // Normal message
  msgs.push({
    id: `${r.id}-msg-n1`, authorId: activeMembers[0].id, authorName: activeMembers[0].displayName, authorRole: activeMembers[0].role, avatar: activeMembers[0].avatar,
    content: `Anyone else attending the design systems conference next week? Would love to meet up.`,
    timestamp: ago(1)
  });

  roomMessages[r.id] = msgs;
});

const dms = [];
const dmMembers = Object.values(members).filter(m => m.id !== 'viewer' && m.id !== 'm13').slice(0, 10);
dmMembers.forEach((m, i) => {
  dms.push({
    id: `thread-${m.id}`,
    memberId: m.id, memberName: m.displayName, memberRole: m.role, avatar: m.avatar,
    online: m.online, unreadCount: i === 0 || i === 3 ? 2 : 0, updatedAt: ago(i * 2),
    messages: [
      { id: `dm-${i}-1`, authorId: m.id, authorName: m.displayName, authorRole: m.role, avatar: m.avatar, content: `Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.`, timestamp: ago(48) },
      { id: `dm-${i}-2`, authorId: 'viewer', authorName: 'You', authorRole: 'Admin', avatar: 'Y', content: `Thanks ${m.displayName.split(' ')[0]}! Glad you found it useful. Are you working on something similar right now?`, timestamp: ago(47) },
      { id: `dm-${i}-3`, authorId: m.id, authorName: m.displayName, authorRole: m.role, avatar: m.avatar, content: `Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.`, timestamp: ago(46) },
      { id: `dm-${i}-4`, authorId: 'viewer', authorName: 'You', authorRole: 'Admin', avatar: 'Y', content: `Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.`, timestamp: ago(45), attachments: [{ type: 'site', targetId: 'SITE-15', name: 'Table Design Patterns' }] },
      { id: `dm-${i}-5`, authorId: m.id, authorName: m.displayName, authorRole: m.role, avatar: m.avatar, content: `Whoa, this is exactly what I needed. Thanks so much!`, timestamp: ago(44), reactions: [{ emoji: '🙏', count: 1, userIds: ['viewer'] }] },
      { id: `dm-${i}-6`, authorId: 'viewer', authorName: 'You', authorRole: 'Admin', avatar: 'Y', content: `No problem. Let me know if you want me to review the final design.`, timestamp: ago(43) },
      { id: `dm-${i}-7`, authorId: m.id, authorName: m.displayName, authorRole: m.role, avatar: m.avatar, content: `Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.`, timestamp: ago(5), attachments: [{ type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', name: 'draft_v1.png' }] },
      { id: `dm-${i}-8`, authorId: m.id, authorName: m.displayName, authorRole: m.role, avatar: m.avatar, content: `Let me know what you think when you have a minute.`, timestamp: ago(4) }
    ]
  });
});

const savedItems = [
  { id: 'save-1', type: 'request', title: 'Looking for high-quality dark mode SaaS dashboard mockups', description: 'Need these references for the upcoming Q3 project.', savedAt: ago(24), targetId: 'REQ-1', targetRoute: '/app/great-hall/requests/REQ-1' },
  { id: 'save-2', type: 'file', title: 'Component_Spec_V3.fig', description: 'Saved from Figma Systems room.', savedAt: ago(48), targetId: 'figma-systems-f3', targetRoute: '/app/great-hall/rooms/figma-systems' },
  { id: 'save-3', type: 'resource', title: 'SaaS Design System Pro', description: 'Incredible UI kit suggested by Alex.', savedAt: ago(72), targetId: 'RES-101', targetRoute: '/app/resources/RES-101' },
  { id: 'save-4', type: 'post', title: 'WebGL Portfolio 2024', description: 'Crazy scroll hijacking reference.', savedAt: ago(96), targetId: 'general-chat-msg-r1', targetRoute: '/app/great-hall/rooms/general-chat' },
  { id: 'save-5', type: 'site', title: 'Godly Website', description: 'Inspiration gallery.', savedAt: ago(120), targetId: 'SITE-12', targetRoute: '/app/sites/SITE-12' },
  { id: 'save-6', type: 'request', title: 'Find premium icon systems for fintech UI', description: 'Has great suggestions in the comments.', savedAt: ago(144), targetId: 'REQ-9', targetRoute: '/app/great-hall/requests/REQ-9' },
  { id: 'save-7', type: 'suggestion', title: 'Linear App References', description: 'Saved from Elena\'s reply.', savedAt: ago(168), targetId: 'sug-REQ-1-2', targetRoute: '/app/great-hall/requests/REQ-1' },
  { id: 'save-8', type: 'reply', title: 'Baking lighting in Blender', description: 'Workflow tip for Framer 3D.', savedAt: ago(192), targetId: 'motion-3d-msg-t2', targetRoute: '/app/great-hall/rooms/motion-3d' },
  { id: 'save-9', type: 'file', title: 'Weekly Curator Picks', description: 'Always good stuff.', savedAt: ago(216), targetId: 'announcements-msg-p2', targetRoute: '/app/great-hall/rooms/announcements' },
  { id: 'save-10', type: 'request', title: 'Looking for Figma variable systems templates', description: 'Archived but valuable.', savedAt: ago(240), targetId: 'REQ-14', targetRoute: '/app/great-hall/requests/REQ-14' }
];

const notifications = [
  { id: 'notif-1', type: 'dm', title: 'New message from Elena Rodriguez', description: 'Elena Rodriguez sent you a direct message.', timestamp: ago(1), read: false, targetRoute: '/app/great-hall/messages/thread-m2' },
  { id: 'notif-2', type: 'mention', title: 'Alex Admin mentioned you', description: 'Alex Admin mentioned you in "Figma Systems".', timestamp: ago(5), read: false, targetRoute: '/app/great-hall/rooms/figma-systems' },
  { id: 'notif-3', type: 'request_reply', title: 'New reply to your request', description: 'Mark Taylor replied to "Looking for dark mode SaaS mockups".', timestamp: ago(12), read: true, targetRoute: '/app/great-hall/requests/REQ-1' },
  { id: 'notif-4', type: 'request_fulfilled', title: 'Request Fulfilled', description: 'Your request "Find high-end pricing page references" has been marked as fulfilled.', timestamp: ago(24), read: true, targetRoute: '/app/great-hall/requests/REQ-12' },
  { id: 'notif-5', type: 'suggestion_accepted', title: 'Suggestion Accepted', description: 'Your suggestion for "Need clean serif fonts" was accepted as the solution!', timestamp: ago(48), read: true, targetRoute: '/app/great-hall/requests/REQ-2' },
  { id: 'notif-6', type: 'room_announcement', title: 'New Announcement', description: 'Alex Admin posted a pinned message in "Announcements".', timestamp: ago(72), read: true, targetRoute: '/app/great-hall/rooms/announcements' },
  { id: 'notif-7', type: 'file_shared', title: 'New File Shared', description: 'Leo Martin shared "Asset_Pack_Lite.zip" in "Motion & 3D".', timestamp: ago(96), read: true, targetRoute: '/app/great-hall/rooms/motion-3d' },
  { id: 'notif-8', type: 'admin_update', title: 'Platform Update', description: 'New features have been added to the Resource hub.', timestamp: ago(120), read: true, targetRoute: '/app/great-hall/rooms/announcements' },
  { id: 'notif-9', type: 'member_joined', title: 'New Member', description: 'Clara Novak joined the "Design Feedback" room.', timestamp: ago(144), read: true, targetRoute: '/app/great-hall/rooms/design-feedback' },
  { id: 'notif-10', type: 'request_expiring', title: 'Request Expiring Soon', description: 'Your request "Need animation curves" expires in 2 days.', timestamp: ago(168), read: true, targetRoute: '/app/great-hall/requests/REQ-13' },
  { id: 'notif-11', type: 'pushed_to_resources', title: 'Added to Resources', description: 'The solution for your request was added to the global Resources directory.', timestamp: ago(192), read: true, targetRoute: '/app/resources/RES-101' },
  { id: 'notif-12', type: 'dm', title: 'New message from Sofia Chen', description: 'Sofia Chen sent you a direct message.', timestamp: ago(216), read: true, targetRoute: '/app/great-hall/messages/thread-m4' }
];

const adminQueue = [
  { id: 'queue-1', status: 'pending', type: 'pending_request', submittedBy: 'm2', date: ago(2), reason: 'User submitted a new request requiring approval due to high priority flag.', linkedItemId: 'REQ-1', reviewNotes: '' },
  { id: 'queue-2', status: 'pending', type: 'suggested_resource', submittedBy: 'm4', date: ago(5), reason: 'New resource "Fluid Motion Kit" suggested for global directory.', linkedItemId: 'RES-102', reviewNotes: '' },
  { id: 'queue-3', status: 'pending', type: 'fulfillment_review', submittedBy: 'm1', date: ago(12), reason: 'Request REQ-9 was fulfilled, review the accepted solution before archiving.', linkedItemId: 'REQ-9', reviewNotes: '' },
  { id: 'queue-4', status: 'reviewed', type: 'flagged_comment', submittedBy: 'm6', date: ago(24), reason: 'Comment reported for spam/self-promotion in General Chat.', linkedItemId: 'general-chat-msg-t3', reviewNotes: 'Warning issued. Comment deleted.', adminActions: ['Deleted Comment', 'Sent Warning DM'] },
  { id: 'queue-5', status: 'resolved', type: 'expired_request', submittedBy: 'system', date: ago(48), reason: 'Request REQ-13 has expired without a solution.', linkedItemId: 'REQ-13', reviewNotes: 'Archived request and notified creator.', adminActions: ['Archived Request'] },
  { id: 'queue-6', status: 'reviewed', type: 'room_moderation', submittedBy: 'm8', date: ago(72), reason: 'Request to create a new room for "Sound Design".', reviewNotes: 'Approved. Room created.', adminActions: ['Created Room'] },
  { id: 'queue-7', status: 'resolved', type: 'member_report', submittedBy: 'm10', date: ago(96), reason: 'Reported user for unsolicited DMs.', linkedItemId: 'm13', reviewNotes: 'Reviewed chat logs. Temporary suspension applied.', adminActions: ['Suspended Account (7 days)'] },
  { id: 'queue-8', status: 'pending', type: 'suggested_site', submittedBy: 'm11', date: ago(120), reason: 'New site "Godly Website" suggested for global directory.', linkedItemId: 'SITE-12', reviewNotes: '' },
  { id: 'queue-9', status: 'reviewed', type: 'pending_request', submittedBy: 'm7', date: ago(144), reason: 'Review request for 3D resources.', linkedItemId: 'REQ-11', reviewNotes: 'Approved and published.', adminActions: ['Published Request'] },
  { id: 'queue-10', status: 'resolved', type: 'fulfillment_review', submittedBy: 'm1', date: ago(168), reason: 'Review solution for Serif Fonts.', linkedItemId: 'REQ-2', reviewNotes: 'Solution is valid. Request closed.', adminActions: ['Closed Request'] }
];

const output = types + `

export const mockMembers: Record<string, GHMember> = ${JSON.stringify(members, null, 2)};
export const mockRequests: GHRequest[] = ${JSON.stringify(requests, null, 2)};
export const greatHallRooms: GreatHallRoomPreview[] = ${JSON.stringify(rooms, null, 2)};
export const greatHallRoomMessages: Record<string, GreatHallChatMessage[]> = ${JSON.stringify(roomMessages, null, 2)};
export const greatHallConversations: GreatHallConversation[] = ${JSON.stringify(dms, null, 2)};
export const mockSavedItems: GHSavedItem[] = ${JSON.stringify(savedItems, null, 2)};
export const mockNotifications: GHNotification[] = ${JSON.stringify(notifications, null, 2)};
export const mockAdminQueue: GHAdminQueueItem[] = ${JSON.stringify(adminQueue, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'greatHallData.ts'), output);
console.log('greatHallData.ts generated successfully!');
