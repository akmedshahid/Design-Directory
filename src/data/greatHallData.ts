// Models for Great Hall V2

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

export const conversationIdForMember = (memberId: string) => `thread-${memberId}`;


export const mockMembers: Record<string, GHMember> = {
  "m1": {
    "id": "m1",
    "username": "alexadmin",
    "displayName": "Alex Admin",
    "role": "Admin",
    "level": 42,
    "bio": "Platform curator and lead designer. Always looking for the next great tool.",
    "tags": [
      "UI/UX",
      "Framer",
      "Systems"
    ],
    "joinedAt": "Jan 2024",
    "avatar": "A",
    "online": true,
    "socials": {
      "twitter": "@curator"
    },
    "roomsJoined": [
      "general-chat",
      "announcements",
      "admin-room"
    ],
    "requestsCreated": 15,
    "solvedRequests": 42,
    "repliesCount": 300,
    "sharedResources": 150,
    "recentActivity": [
      {
        "type": "reply",
        "targetId": "REQ-1",
        "title": "Replied to Dark Mode SaaS request",
        "date": "2026-05-02T13:28:45.093Z"
      },
      {
        "type": "resource_submit",
        "targetId": "RES-101",
        "title": "Curated new Dark Mode UI kit",
        "date": "2026-05-01T15:28:45.094Z"
      }
    ]
  },
  "m2": {
    "id": "m2",
    "username": "elenar",
    "displayName": "Elena Rodriguez",
    "role": "Patron",
    "level": 18,
    "bio": "Product Designer @ Fintech startup. Passionate about micro-interactions.",
    "tags": [
      "Product",
      "Motion",
      "Finance"
    ],
    "joinedAt": "Mar 2024",
    "avatar": "E",
    "online": true,
    "socials": {
      "dribbble": "elenadesigns"
    },
    "roomsJoined": [
      "general-chat",
      "design-feedback",
      "motion-3d"
    ],
    "requestsCreated": 5,
    "solvedRequests": 2,
    "repliesCount": 45,
    "sharedResources": 10,
    "recentActivity": [
      {
        "type": "request",
        "targetId": "REQ-1",
        "title": "Requested: Looking for dark mode SaaS mockups",
        "date": "2026-05-02T10:28:45.094Z"
      },
      {
        "type": "room_join",
        "targetId": "motion-3d",
        "title": "Joined Motion & 3D room",
        "date": "2026-04-30T15:28:45.094Z"
      }
    ]
  },
  "m3": {
    "id": "m3",
    "username": "markt",
    "displayName": "Mark Taylor",
    "role": "Collector",
    "level": 12,
    "bio": "Freelance web designer specializing in Webflow and Framer transitions.",
    "tags": [
      "Webflow",
      "Framer",
      "Freelance"
    ],
    "joinedAt": "Apr 2024",
    "avatar": "M",
    "online": false,
    "socials": {},
    "roomsJoined": [
      "general-chat",
      "framer-development"
    ],
    "requestsCreated": 8,
    "solvedRequests": 5,
    "repliesCount": 88,
    "sharedResources": 5,
    "recentActivity": [
      {
        "type": "reply",
        "targetId": "REQ-2",
        "title": "Replied to Serif Fonts request",
        "date": "2026-05-01T15:28:45.094Z"
      }
    ]
  },
  "m4": {
    "id": "m4",
    "username": "sofiac",
    "displayName": "Sofia Chen",
    "role": "Patron",
    "level": 25,
    "bio": "Motion designer crafting fluid interactions and 3D scenes.",
    "tags": [
      "Motion",
      "After Effects",
      "Framer"
    ],
    "joinedAt": "Feb 2024",
    "avatar": "S",
    "online": true,
    "socials": {
      "twitter": "@sofiac"
    },
    "roomsJoined": [
      "motion-3d",
      "showcase"
    ],
    "requestsCreated": 2,
    "solvedRequests": 18,
    "repliesCount": 150,
    "sharedResources": 25,
    "recentActivity": [
      {
        "type": "resource_submit",
        "targetId": "RES-102",
        "title": "Shared Fluid Motion Kit",
        "date": "2026-04-29T15:28:45.094Z"
      },
      {
        "type": "reply",
        "targetId": "REQ-13",
        "title": "Replied to UI transitions request",
        "date": "2026-05-02T03:28:45.094Z"
      }
    ]
  },
  "m5": {
    "id": "m5",
    "username": "danielb",
    "displayName": "Daniel Brooks",
    "role": "Collector",
    "level": 15,
    "bio": "Framer developer building high-end landing pages for SaaS.",
    "tags": [
      "React",
      "Framer",
      "Code"
    ],
    "joinedAt": "May 2024",
    "avatar": "D",
    "online": true,
    "socials": {
      "github": "danb"
    },
    "roomsJoined": [
      "framer-development",
      "landing-page-reviews"
    ],
    "requestsCreated": 4,
    "solvedRequests": 12,
    "repliesCount": 65,
    "sharedResources": 8,
    "recentActivity": [
      {
        "type": "reply",
        "targetId": "REQ-3",
        "title": "Replied to Framer template request",
        "date": "2026-05-02T14:28:45.094Z"
      }
    ]
  },
  "m6": {
    "id": "m6",
    "username": "mirap",
    "displayName": "Mira Patel",
    "role": "Member",
    "level": 8,
    "bio": "Brand designer focused on identity and systems.",
    "tags": [
      "Branding",
      "Typography",
      "Logo"
    ],
    "joinedAt": "Jun 2024",
    "avatar": "M",
    "online": false,
    "socials": {},
    "roomsJoined": [
      "branding-lab",
      "typography"
    ],
    "requestsCreated": 3,
    "solvedRequests": 1,
    "repliesCount": 12,
    "sharedResources": 2,
    "recentActivity": [
      {
        "type": "request",
        "targetId": "REQ-4",
        "title": "Requested: Need Cinema 4D materials",
        "date": "2026-04-30T15:28:45.094Z"
      }
    ]
  },
  "m7": {
    "id": "m7",
    "username": "leom",
    "displayName": "Leo Martin",
    "role": "Patron",
    "level": 30,
    "bio": "3D artist creating abstract hero scenes.",
    "tags": [
      "3D",
      "Cinema 4D",
      "Blender"
    ],
    "joinedAt": "Jan 2024",
    "avatar": "L",
    "online": true,
    "socials": {
      "dribbble": "leomartin"
    },
    "roomsJoined": [
      "motion-3d",
      "showcase"
    ],
    "requestsCreated": 1,
    "solvedRequests": 25,
    "repliesCount": 210,
    "sharedResources": 40,
    "recentActivity": [
      {
        "type": "reply",
        "targetId": "REQ-4",
        "title": "Suggested Material Pack for C4D",
        "date": "2026-05-01T15:28:45.094Z"
      }
    ]
  },
  "m8": {
    "id": "m8",
    "username": "hannaw",
    "displayName": "Hanna Weber",
    "role": "Collector",
    "level": 14,
    "bio": "Typography researcher and editorial designer.",
    "tags": [
      "Typography",
      "Editorial",
      "Print"
    ],
    "joinedAt": "Jul 2024",
    "avatar": "H",
    "online": false,
    "socials": {},
    "roomsJoined": [
      "typography",
      "design-feedback"
    ],
    "requestsCreated": 6,
    "solvedRequests": 8,
    "repliesCount": 54,
    "sharedResources": 12,
    "recentActivity": [
      {
        "type": "reply",
        "targetId": "REQ-2",
        "title": "Suggested Newsreader font",
        "date": "2026-05-02T11:28:45.094Z"
      }
    ]
  },
  "m9": {
    "id": "m9",
    "username": "yusufk",
    "displayName": "Yusuf Khan",
    "role": "Patron",
    "level": 22,
    "bio": "AI workflow builder for creative agencies.",
    "tags": [
      "AI",
      "Workflows",
      "Automation"
    ],
    "joinedAt": "Feb 2024",
    "avatar": "Y",
    "online": true,
    "socials": {
      "twitter": "@yusufk"
    },
    "roomsJoined": [
      "ai-workflows",
      "tools-workflows"
    ],
    "requestsCreated": 7,
    "solvedRequests": 14,
    "repliesCount": 110,
    "sharedResources": 18,
    "recentActivity": [
      {
        "type": "request",
        "targetId": "REQ-5",
        "title": "Requested: Looking for AI video tools",
        "date": "2026-05-02T09:28:45.094Z"
      }
    ]
  },
  "m10": {
    "id": "m10",
    "username": "claran",
    "displayName": "Clara Novak",
    "role": "Member",
    "level": 5,
    "bio": "UI systems designer building scaleable libraries.",
    "tags": [
      "Figma",
      "Systems",
      "UI"
    ],
    "joinedAt": "Aug 2024",
    "avatar": "C",
    "online": true,
    "socials": {},
    "roomsJoined": [
      "figma-systems",
      "design-feedback"
    ],
    "requestsCreated": 2,
    "solvedRequests": 0,
    "repliesCount": 8,
    "sharedResources": 1,
    "recentActivity": [
      {
        "type": "reply",
        "targetId": "REQ-7",
        "title": "Replied to Dashboard tables request",
        "date": "2026-05-02T13:28:45.094Z"
      }
    ]
  },
  "m11": {
    "id": "m11",
    "username": "omarr",
    "displayName": "Omar Reyes",
    "role": "Collector",
    "level": 17,
    "bio": "Webflow specialist and technical SEO.",
    "tags": [
      "Webflow",
      "SEO",
      "Development"
    ],
    "joinedAt": "May 2024",
    "avatar": "O",
    "online": false,
    "socials": {
      "github": "omarr"
    },
    "roomsJoined": [
      "tools-workflows",
      "landing-page-reviews"
    ],
    "requestsCreated": 5,
    "solvedRequests": 4,
    "repliesCount": 42,
    "sharedResources": 6,
    "recentActivity": [
      {
        "type": "request",
        "targetId": "REQ-12",
        "title": "Requested: Find pricing page references",
        "date": "2026-05-01T15:28:45.094Z"
      }
    ]
  },
  "m12": {
    "id": "m12",
    "username": "ninah",
    "displayName": "Nina Hart",
    "role": "Patron",
    "level": 28,
    "bio": "Creative director managing multiple brand accounts.",
    "tags": [
      "Direction",
      "Strategy",
      "Branding"
    ],
    "joinedAt": "Jan 2024",
    "avatar": "N",
    "online": false,
    "socials": {},
    "roomsJoined": [
      "branding-lab",
      "premium-lounge"
    ],
    "requestsCreated": 12,
    "solvedRequests": 10,
    "repliesCount": 165,
    "sharedResources": 22,
    "recentActivity": [
      {
        "type": "request",
        "targetId": "REQ-8",
        "title": "Requested: Need packaging mockups",
        "date": "2026-04-29T15:28:45.094Z"
      }
    ]
  },
  "m13": {
    "id": "m13",
    "username": "quietuser",
    "displayName": "Sam Quiet",
    "role": "Member",
    "level": 1,
    "bio": "Observing and learning.",
    "tags": [
      "Learning"
    ],
    "joinedAt": "Oct 2024",
    "avatar": "S",
    "online": false,
    "socials": {},
    "roomsJoined": [
      "general-chat"
    ],
    "requestsCreated": 0,
    "solvedRequests": 0,
    "repliesCount": 0,
    "sharedResources": 0,
    "recentActivity": []
  },
  "viewer": {
    "id": "viewer",
    "username": "you",
    "displayName": "You",
    "role": "Admin",
    "level": 50,
    "bio": "Platform Builder.",
    "tags": [
      "Engineering"
    ],
    "joinedAt": "Today",
    "avatar": "Y",
    "online": true,
    "socials": {},
    "roomsJoined": [
      "admin-room",
      "general-chat"
    ],
    "requestsCreated": 0,
    "solvedRequests": 0,
    "repliesCount": 0,
    "sharedResources": 0,
    "recentActivity": []
  }
};
export const mockRequests: GHRequest[] = [
  {
    "id": "REQ-1",
    "slug": "dark-mode-saas",
    "title": "Looking for high-quality dark mode SaaS dashboard mockups",
    "shortDesc": "I'm currently looking for best-in-class resources for looking for high-quality dark mode saas dashboard mockups to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for looking for high-quality dark mode saas dashboard mockups. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m1",
    "authorName": "Alex Admin",
    "authorRole": "Admin",
    "avatar": "A",
    "category": "Mockups",
    "tags": [
      "Mockups",
      "Premium",
      "References"
    ],
    "status": "Open",
    "priority": "high",
    "visibility": "public",
    "upvotes": 37,
    "watchers": 24,
    "createdAt": "2026-04-28T11:28:45.094Z",
    "updatedAt": "2026-05-02T15:28:45.094Z",
    "expiresAt": "2026-05-06T19:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-1-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-1-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-1-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-1-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-1-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-1-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-1-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-1-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-1-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-1-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-1-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-1-1",
        "type": "created",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T11:28:45.094Z"
      },
      {
        "id": "tl-REQ-1-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-1-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-1-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Open"
      },
      {
        "id": "tl-REQ-1-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-2",
    "slug": "serif-fonts-editorial",
    "title": "Need clean serif fonts for an editorial identity",
    "shortDesc": "I'm currently looking for best-in-class resources for need clean serif fonts for an editorial identity to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for need clean serif fonts for an editorial identity. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m2",
    "authorName": "Elena Rodriguez",
    "authorRole": "Patron",
    "avatar": "E",
    "category": "Typography",
    "tags": [
      "Typography",
      "Premium",
      "References"
    ],
    "status": "Solved",
    "priority": "normal",
    "visibility": "public",
    "upvotes": 41,
    "watchers": 13,
    "createdAt": "2026-04-28T10:28:45.094Z",
    "updatedAt": "2026-05-02T14:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-2-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-2-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "fulfillment": {
      "fulfilledBy": "m1",
      "fulfilledAt": "2026-05-02T13:28:45.094Z",
      "type": "site",
      "linkedId": "SITE-202",
      "linkedUrl": "/app/resources/RES-101",
      "addedToResources": false,
      "addedToSites": true
    },
    "pushedToSites": "SITE-202",
    "suggestions": [
      {
        "id": "sug-REQ-2-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": true
      },
      {
        "id": "sug-REQ-2-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-2-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-2-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-2-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-2-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-2-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-2-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-2-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-2-1",
        "type": "created",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-28T10:28:45.094Z"
      },
      {
        "id": "tl-REQ-2-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-2-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-2-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Solved"
      },
      {
        "id": "tl-REQ-2-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      },
      {
        "id": "tl-REQ-2-6",
        "type": "solution_marked",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-30T03:28:45.094Z",
        "details": "Accepted SaaS Design System Pro"
      }
    ]
  },
  {
    "id": "REQ-3",
    "slug": "framer-agency-template",
    "title": "Find a premium Framer agency template",
    "shortDesc": "I'm currently looking for best-in-class resources for find a premium framer agency template to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for find a premium framer agency template. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m3",
    "authorName": "Mark Taylor",
    "authorRole": "Collector",
    "avatar": "M",
    "category": "Templates",
    "tags": [
      "Templates",
      "Premium",
      "References"
    ],
    "status": "In Progress",
    "priority": "high",
    "visibility": "public",
    "upvotes": 32,
    "watchers": 9,
    "createdAt": "2026-04-28T09:28:45.094Z",
    "updatedAt": "2026-05-02T13:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-3-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-3-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-3-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-3-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-3-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-3-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-3-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-3-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-3-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-3-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-3-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-3-1",
        "type": "created",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-28T09:28:45.094Z"
      },
      {
        "id": "tl-REQ-3-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-3-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-3-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to In Progress"
      },
      {
        "id": "tl-REQ-3-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-4",
    "slug": "c4d-materials",
    "title": "Need Cinema 4D material libraries for product renders",
    "shortDesc": "I'm currently looking for best-in-class resources for need cinema 4d material libraries for product renders to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for need cinema 4d material libraries for product renders. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m4",
    "authorName": "Sofia Chen",
    "authorRole": "Patron",
    "avatar": "S",
    "category": "3D Assets",
    "tags": [
      "3D Assets",
      "Premium",
      "References"
    ],
    "status": "Open",
    "priority": "normal",
    "visibility": "public",
    "upvotes": 36,
    "watchers": 15,
    "createdAt": "2026-04-28T08:28:45.094Z",
    "updatedAt": "2026-05-02T12:28:45.094Z",
    "expiresAt": "2026-05-06T19:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-4-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-4-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-4-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-4-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-4-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-4-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-4-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-4-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-4-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-4-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-4-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-4-1",
        "type": "created",
        "actorId": "m4",
        "actorName": "Sofia Chen",
        "timestamp": "2026-04-28T08:28:45.094Z"
      },
      {
        "id": "tl-REQ-4-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-4-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-4-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Open"
      },
      {
        "id": "tl-REQ-4-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-5",
    "slug": "ai-video-workflows",
    "title": "Looking for AI image-to-video workflow tools",
    "shortDesc": "I'm currently looking for best-in-class resources for looking for ai image-to-video workflow tools to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for looking for ai image-to-video workflow tools. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m5",
    "authorName": "Daniel Brooks",
    "authorRole": "Collector",
    "avatar": "D",
    "category": "Tools",
    "tags": [
      "Tools",
      "Premium",
      "References"
    ],
    "status": "Open",
    "priority": "urgent",
    "visibility": "public",
    "upvotes": 31,
    "watchers": 9,
    "createdAt": "2026-04-28T07:28:45.094Z",
    "updatedAt": "2026-05-02T11:28:45.094Z",
    "expiresAt": "2026-05-06T19:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-5-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-5-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-5-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-5-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-5-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-5-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-5-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-5-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-5-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-5-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-5-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-5-1",
        "type": "created",
        "actorId": "m5",
        "actorName": "Daniel Brooks",
        "timestamp": "2026-04-28T07:28:45.094Z"
      },
      {
        "id": "tl-REQ-5-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-5-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-5-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Open"
      },
      {
        "id": "tl-REQ-5-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-6",
    "slug": "onboarding-flows",
    "title": "Need onboarding flow references for a mobile app",
    "shortDesc": "I'm currently looking for best-in-class resources for need onboarding flow references for a mobile app to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for need onboarding flow references for a mobile app. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m6",
    "authorName": "Mira Patel",
    "authorRole": "Member",
    "avatar": "M",
    "category": "Inspiration",
    "tags": [
      "Inspiration",
      "Premium",
      "References"
    ],
    "status": "In Progress",
    "priority": "normal",
    "visibility": "public",
    "upvotes": 62,
    "watchers": 20,
    "createdAt": "2026-04-28T06:28:45.094Z",
    "updatedAt": "2026-05-02T10:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-6-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-6-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-6-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-6-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-6-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-6-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-6-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-6-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-6-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-6-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-6-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-6-1",
        "type": "created",
        "actorId": "m6",
        "actorName": "Mira Patel",
        "timestamp": "2026-04-28T06:28:45.094Z"
      },
      {
        "id": "tl-REQ-6-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-6-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-6-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to In Progress"
      },
      {
        "id": "tl-REQ-6-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-7",
    "slug": "dashboard-tables",
    "title": "Looking for dashboard table UI examples",
    "shortDesc": "I'm currently looking for best-in-class resources for looking for dashboard table ui examples to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for looking for dashboard table ui examples. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m7",
    "authorName": "Leo Martin",
    "authorRole": "Patron",
    "avatar": "L",
    "category": "Inspiration",
    "tags": [
      "Inspiration",
      "Premium",
      "References"
    ],
    "status": "Open",
    "priority": "low",
    "visibility": "public",
    "upvotes": 36,
    "watchers": 20,
    "createdAt": "2026-04-28T05:28:45.094Z",
    "updatedAt": "2026-05-02T09:28:45.094Z",
    "expiresAt": "2026-05-06T19:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-7-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-7-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-7-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-7-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-7-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-7-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-7-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-7-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-7-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-7-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-7-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-7-1",
        "type": "created",
        "actorId": "m7",
        "actorName": "Leo Martin",
        "timestamp": "2026-04-28T05:28:45.094Z"
      },
      {
        "id": "tl-REQ-7-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-7-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-7-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Open"
      },
      {
        "id": "tl-REQ-7-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-8",
    "slug": "supplement-packaging",
    "title": "Need packaging mockups for supplement brand",
    "shortDesc": "I'm currently looking for best-in-class resources for need packaging mockups for supplement brand to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for need packaging mockups for supplement brand. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m8",
    "authorName": "Hanna Weber",
    "authorRole": "Collector",
    "avatar": "H",
    "category": "Mockups",
    "tags": [
      "Mockups",
      "Premium",
      "References"
    ],
    "status": "Closed",
    "priority": "normal",
    "visibility": "public",
    "upvotes": 59,
    "watchers": 23,
    "createdAt": "2026-04-28T04:28:45.094Z",
    "updatedAt": "2026-05-02T08:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-8-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-8-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-8-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-8-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-8-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-8-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-8-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-8-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-8-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-8-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-8-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-8-1",
        "type": "created",
        "actorId": "m8",
        "actorName": "Hanna Weber",
        "timestamp": "2026-04-28T04:28:45.094Z"
      },
      {
        "id": "tl-REQ-8-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-8-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-8-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Closed"
      },
      {
        "id": "tl-REQ-8-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-9",
    "slug": "fintech-icons",
    "title": "Find premium icon systems for fintech UI",
    "shortDesc": "I'm currently looking for best-in-class resources for find premium icon systems for fintech ui to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for find premium icon systems for fintech ui. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m9",
    "authorName": "Yusuf Khan",
    "authorRole": "Patron",
    "avatar": "Y",
    "category": "Icons",
    "tags": [
      "Icons",
      "Premium",
      "References"
    ],
    "status": "Fulfilled",
    "priority": "high",
    "visibility": "public",
    "upvotes": 33,
    "watchers": 17,
    "createdAt": "2026-04-28T03:28:45.094Z",
    "updatedAt": "2026-05-02T07:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-9-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-9-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "fulfillment": {
      "fulfilledBy": "m1",
      "fulfilledAt": "2026-05-01T23:28:45.094Z",
      "type": "resource",
      "linkedId": "RES-101",
      "linkedUrl": "/app/resources/RES-101",
      "addedToResources": true,
      "addedToSites": false
    },
    "pushedToResources": "RES-101",
    "suggestions": [
      {
        "id": "sug-REQ-9-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": true
      },
      {
        "id": "sug-REQ-9-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-9-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-9-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-9-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-9-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-9-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-9-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-9-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-9-1",
        "type": "created",
        "actorId": "m9",
        "actorName": "Yusuf Khan",
        "timestamp": "2026-04-28T03:28:45.094Z"
      },
      {
        "id": "tl-REQ-9-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-9-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-9-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Fulfilled"
      },
      {
        "id": "tl-REQ-9-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      },
      {
        "id": "tl-REQ-9-6",
        "type": "solution_marked",
        "actorId": "m9",
        "actorName": "Yusuf Khan",
        "timestamp": "2026-04-30T03:28:45.094Z",
        "details": "Accepted SaaS Design System Pro"
      }
    ]
  },
  {
    "id": "REQ-10",
    "slug": "brand-guidelines",
    "title": "Looking for brand guideline presentation templates",
    "shortDesc": "I'm currently looking for best-in-class resources for looking for brand guideline presentation templates to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for looking for brand guideline presentation templates. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m10",
    "authorName": "Clara Novak",
    "authorRole": "Member",
    "avatar": "C",
    "category": "Templates",
    "tags": [
      "Templates",
      "Premium",
      "References"
    ],
    "status": "Open",
    "priority": "normal",
    "visibility": "public",
    "upvotes": 28,
    "watchers": 15,
    "createdAt": "2026-04-28T02:28:45.094Z",
    "updatedAt": "2026-05-02T06:28:45.094Z",
    "expiresAt": "2026-05-06T19:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-10-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-10-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-10-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-10-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-10-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-10-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-10-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-10-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-10-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-10-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-10-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-10-1",
        "type": "created",
        "actorId": "m10",
        "actorName": "Clara Novak",
        "timestamp": "2026-04-28T02:28:45.094Z"
      },
      {
        "id": "tl-REQ-10-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-10-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-10-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Open"
      },
      {
        "id": "tl-REQ-10-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-11",
    "slug": "3d-abstract-hero",
    "title": "Need 3D abstract hero scene resources",
    "shortDesc": "I'm currently looking for best-in-class resources for need 3d abstract hero scene resources to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for need 3d abstract hero scene resources. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m11",
    "authorName": "Omar Reyes",
    "authorRole": "Collector",
    "avatar": "O",
    "category": "3D Assets",
    "tags": [
      "3D Assets",
      "Premium",
      "References"
    ],
    "status": "Open",
    "priority": "normal",
    "visibility": "public",
    "upvotes": 60,
    "watchers": 12,
    "createdAt": "2026-04-28T01:28:45.094Z",
    "updatedAt": "2026-05-02T05:28:45.094Z",
    "expiresAt": "2026-05-06T19:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-11-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-11-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-11-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-11-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-11-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-11-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-11-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-11-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-11-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-11-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-11-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-11-1",
        "type": "created",
        "actorId": "m11",
        "actorName": "Omar Reyes",
        "timestamp": "2026-04-28T01:28:45.094Z"
      },
      {
        "id": "tl-REQ-11-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-11-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-11-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Open"
      },
      {
        "id": "tl-REQ-11-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-12",
    "slug": "pricing-pages",
    "title": "Find high-end pricing page references",
    "shortDesc": "I'm currently looking for best-in-class resources for find high-end pricing page references to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for find high-end pricing page references. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m12",
    "authorName": "Nina Hart",
    "authorRole": "Patron",
    "avatar": "N",
    "category": "Inspiration",
    "tags": [
      "Inspiration",
      "Premium",
      "References"
    ],
    "status": "Fulfilled",
    "priority": "low",
    "visibility": "public",
    "upvotes": 18,
    "watchers": 13,
    "createdAt": "2026-04-28T00:28:45.094Z",
    "updatedAt": "2026-05-02T04:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-12-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-12-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "fulfillment": {
      "fulfilledBy": "m1",
      "fulfilledAt": "2026-05-01T17:28:45.094Z",
      "type": "site",
      "linkedId": "SITE-202",
      "linkedUrl": "/app/resources/RES-101",
      "addedToResources": false,
      "addedToSites": true
    },
    "pushedToSites": "SITE-202",
    "suggestions": [
      {
        "id": "sug-REQ-12-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": true
      },
      {
        "id": "sug-REQ-12-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-12-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-12-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-12-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-12-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-12-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-12-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-12-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-12-1",
        "type": "created",
        "actorId": "m12",
        "actorName": "Nina Hart",
        "timestamp": "2026-04-28T00:28:45.094Z"
      },
      {
        "id": "tl-REQ-12-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-12-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-12-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Fulfilled"
      },
      {
        "id": "tl-REQ-12-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      },
      {
        "id": "tl-REQ-12-6",
        "type": "solution_marked",
        "actorId": "m12",
        "actorName": "Nina Hart",
        "timestamp": "2026-04-30T03:28:45.094Z",
        "details": "Accepted SaaS Design System Pro"
      }
    ]
  },
  {
    "id": "REQ-13",
    "slug": "animation-curves",
    "title": "Need animation curves for smooth UI transitions",
    "shortDesc": "I'm currently looking for best-in-class resources for need animation curves for smooth ui transitions to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for need animation curves for smooth ui transitions. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m1",
    "authorName": "Alex Admin",
    "authorRole": "Admin",
    "avatar": "A",
    "category": "Motion",
    "tags": [
      "Motion",
      "Premium",
      "References"
    ],
    "status": "Expired",
    "priority": "normal",
    "visibility": "public",
    "upvotes": 59,
    "watchers": 9,
    "createdAt": "2026-04-27T23:28:45.094Z",
    "updatedAt": "2026-05-02T03:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-13-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-13-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-13-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-13-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-13-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-13-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-13-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-13-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-13-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-13-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-13-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-13-1",
        "type": "created",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-27T23:28:45.094Z"
      },
      {
        "id": "tl-REQ-13-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-13-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-13-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Expired"
      },
      {
        "id": "tl-REQ-13-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-14",
    "slug": "figma-variables",
    "title": "Looking for Figma variable systems templates",
    "shortDesc": "I'm currently looking for best-in-class resources for looking for figma variable systems templates to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for looking for figma variable systems templates. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m2",
    "authorName": "Elena Rodriguez",
    "authorRole": "Patron",
    "avatar": "E",
    "category": "Templates",
    "tags": [
      "Templates",
      "Premium",
      "References"
    ],
    "status": "Archived",
    "priority": "high",
    "visibility": "public",
    "upvotes": 28,
    "watchers": 6,
    "createdAt": "2026-04-27T22:28:45.094Z",
    "updatedAt": "2026-05-02T02:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-14-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-14-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-14-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-14-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-14-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-14-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-14-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-14-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-14-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-14-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-14-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-14-1",
        "type": "created",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-27T22:28:45.094Z"
      },
      {
        "id": "tl-REQ-14-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-14-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-14-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Archived"
      },
      {
        "id": "tl-REQ-14-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  },
  {
    "id": "REQ-15",
    "slug": "webflow-ecommerce",
    "title": "Need Webflow e-commerce best practices",
    "shortDesc": "I'm currently looking for best-in-class resources for need webflow e-commerce best practices to reference in an upcoming project.",
    "longDesc": "Hey everyone, I'm working on a highly detailed project and struggling to find top-tier, production-ready resources specifically for need webflow e-commerce best practices. I need assets or references that prioritize premium aesthetics and structural rigor. Does anyone have a go-to kit, site, or specific reference they use? I've attached some visual direction of what I'm aiming for. Budget is flexible if the quality is outstanding.",
    "authorId": "m3",
    "authorName": "Mark Taylor",
    "authorRole": "Collector",
    "avatar": "M",
    "category": "Development",
    "tags": [
      "Development",
      "Premium",
      "References"
    ],
    "status": "Open",
    "priority": "normal",
    "visibility": "public",
    "upvotes": 62,
    "watchers": 6,
    "createdAt": "2026-04-27T21:28:45.094Z",
    "updatedAt": "2026-05-02T01:28:45.094Z",
    "expiresAt": "2026-05-06T19:28:45.094Z",
    "autoDeleteAfterDays": 30,
    "requiredPlan": "Member",
    "requestType": "Resource Request",
    "attachments": [
      {
        "id": "att-REQ-15-1",
        "name": "visual_reference_01.jpg",
        "url": "#",
        "type": "image/jpeg"
      },
      {
        "id": "att-REQ-15-2",
        "name": "moodboard.fig",
        "url": "#",
        "type": "application/x-figma"
      }
    ],
    "suggestions": [
      {
        "id": "sug-REQ-15-1",
        "title": "SaaS Design System Pro",
        "description": "This Figma kit has incredible dark mode components perfectly suited for what you need. Highly organized variables.",
        "externalUrl": "https://ui8.net",
        "suggestedBy": "Alex Admin",
        "suggestedById": "m1",
        "upvotes": 24,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-15-2",
        "title": "Linear App References",
        "description": "You should look at how Linear structures their tables and modals. I saved a collection here.",
        "siteId": "SITE-12",
        "suggestedBy": "Elena Rodriguez",
        "suggestedById": "m2",
        "upvotes": 12,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-15-3",
        "title": "Custom Zip Archive",
        "description": "I compiled a few screenshots from my last project. Hope this helps!",
        "attachment": {
          "type": "application/zip",
          "url": "#",
          "name": "references.zip"
        },
        "suggestedBy": "Mark Taylor",
        "suggestedById": "m3",
        "upvotes": 8,
        "isAccepted": false
      },
      {
        "id": "sug-REQ-15-4",
        "title": "Godly Website",
        "description": "Godly has a great filter for this exact style.",
        "externalUrl": "https://godly.website",
        "suggestedBy": "Nina Hart",
        "suggestedById": "m12",
        "upvotes": 15,
        "isAccepted": false
      }
    ],
    "replies": [
      {
        "id": "rep-REQ-15-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "I was looking for this exact thing last week. The first suggestion is gold. I used it on a client project and saved hours.",
        "timestamp": "2026-04-30T23:28:45.094Z",
        "upvotes": 14
      },
      {
        "id": "rep-REQ-15-2",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Make sure to check the license terms if you use the UI8 kit for commercial SaaS work. Sometimes they require an extended license.",
        "timestamp": "2026-05-01T04:28:45.094Z",
        "upvotes": 8
      },
      {
        "id": "rep-REQ-15-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Does anyone have a free alternative? Im just exploring this for a personal concept right now.",
        "timestamp": "2026-05-01T09:28:45.094Z",
        "upvotes": 2
      },
      {
        "id": "rep-REQ-15-4",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "I have some C4D files I can share directly if you DM me. Too large to upload here.",
        "timestamp": "2026-05-01T14:28:45.094Z",
        "upvotes": 16
      },
      {
        "id": "rep-REQ-15-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Thanks for sharing these resources! That Godly link is exactly what I needed for inspiration.",
        "timestamp": "2026-05-02T00:28:45.094Z",
        "upvotes": 5
      }
    ],
    "timeline": [
      {
        "id": "tl-REQ-15-1",
        "type": "created",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-27T21:28:45.094Z"
      },
      {
        "id": "tl-REQ-15-2",
        "type": "suggestion_added",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-28T21:28:45.094Z",
        "details": "Suggested SaaS Design System Pro"
      },
      {
        "id": "tl-REQ-15-3",
        "type": "suggestion_added",
        "actorId": "m2",
        "actorName": "Elena Rodriguez",
        "timestamp": "2026-04-29T02:28:45.094Z",
        "details": "Suggested Linear App References"
      },
      {
        "id": "tl-REQ-15-4",
        "type": "status_change",
        "actorId": "m1",
        "actorName": "Alex Admin",
        "timestamp": "2026-04-29T07:28:45.094Z",
        "details": "Status changed to Open"
      },
      {
        "id": "tl-REQ-15-5",
        "type": "suggestion_added",
        "actorId": "m3",
        "actorName": "Mark Taylor",
        "timestamp": "2026-04-29T17:28:45.094Z",
        "details": "Added Custom Zip Archive"
      }
    ]
  }
];
export const greatHallRooms: GreatHallRoomPreview[] = [
  {
    "id": "general-chat",
    "name": "General Lounge",
    "description": "Daily conversations, intros, and quick links across the community.",
    "iconLabel": "GE",
    "memberCount": 501,
    "onlineCount": 37,
    "unreadCount": 7,
    "access": "Open",
    "accent": "rgba(92, 108, 255, 0.18)",
    "tags": [
      "Community",
      "Chat"
    ],
    "rules": [
      "Be respectful",
      "No spam"
    ],
    "memberIds": [
      "m1",
      "m2",
      "m3",
      "m13",
      "viewer"
    ],
    "linkedRoomIds": [
      "announcements",
      "showcase"
    ],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "general-chat-f1",
        "name": "General_Lounge_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.094Z"
      },
      {
        "id": "general-chat-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.094Z"
      },
      {
        "id": "general-chat-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.094Z"
      },
      {
        "id": "general-chat-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.094Z"
      },
      {
        "id": "general-chat-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.094Z"
      }
    ]
  },
  {
    "id": "announcements",
    "name": "Announcements",
    "description": "Curator notes, releases, and important updates for all members.",
    "iconLabel": "AN",
    "memberCount": 234,
    "onlineCount": 82,
    "unreadCount": 3,
    "access": "Open",
    "accent": "rgba(245, 158, 11, 0.18)",
    "tags": [
      "Updates",
      "News"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m1"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "announcements-f1",
        "name": "Announcements_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.094Z"
      },
      {
        "id": "announcements-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.094Z"
      },
      {
        "id": "announcements-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.094Z"
      },
      {
        "id": "announcements-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.094Z"
      },
      {
        "id": "announcements-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.094Z"
      }
    ]
  },
  {
    "id": "design-feedback",
    "name": "Design Feedback",
    "description": "Work-in-progress reviews for interfaces, motion, and product polish.",
    "iconLabel": "DE",
    "memberCount": 171,
    "onlineCount": 45,
    "unreadCount": 0,
    "access": "Member",
    "accent": "rgba(59, 130, 246, 0.18)",
    "tags": [
      "Feedback",
      "Critique"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m2",
      "m8",
      "m10"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "design-feedback-f1",
        "name": "Design_Feedback_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.094Z"
      },
      {
        "id": "design-feedback-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.094Z"
      },
      {
        "id": "design-feedback-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.094Z"
      },
      {
        "id": "design-feedback-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.094Z"
      },
      {
        "id": "design-feedback-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.094Z"
      }
    ]
  },
  {
    "id": "resource-requests",
    "name": "Resource Requests",
    "description": "Open threads for references, files, tools, and hard-to-find assets.",
    "iconLabel": "RE",
    "memberCount": 160,
    "onlineCount": 33,
    "unreadCount": 0,
    "access": "Collector",
    "accent": "rgba(16, 185, 129, 0.18)",
    "tags": [
      "Requests",
      "Assets"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "resource-requests-f1",
        "name": "Resource_Requests_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.094Z"
      },
      {
        "id": "resource-requests-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.094Z"
      },
      {
        "id": "resource-requests-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.094Z"
      },
      {
        "id": "resource-requests-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.094Z"
      },
      {
        "id": "resource-requests-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.094Z"
      }
    ]
  },
  {
    "id": "showcase",
    "name": "Showcase",
    "description": "Launches, experiments, and high-signal work worth studying.",
    "iconLabel": "SH",
    "memberCount": 700,
    "onlineCount": 36,
    "unreadCount": 5,
    "access": "Member",
    "accent": "rgba(236, 72, 153, 0.18)",
    "tags": [
      "Showcase",
      "Inspiration"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m4",
      "m7"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "showcase-f1",
        "name": "Showcase_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "showcase-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "showcase-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "showcase-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "showcase-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "framer-development",
    "name": "Framer Development",
    "description": "Framer-heavy site launches, components, and CMS setups.",
    "iconLabel": "FR",
    "memberCount": 753,
    "onlineCount": 58,
    "unreadCount": 4,
    "access": "Collector",
    "accent": "#5C6CFF",
    "tags": [
      "Framer",
      "Code"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m3",
      "m5"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "framer-development-f1",
        "name": "Framer_Development_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "framer-development-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "framer-development-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "framer-development-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "framer-development-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "figma-systems",
    "name": "Figma Systems",
    "description": "System libraries, token structure, and documentation habits.",
    "iconLabel": "FI",
    "memberCount": 520,
    "onlineCount": 56,
    "unreadCount": 6,
    "access": "Collector",
    "accent": "#F59E0B",
    "tags": [
      "Figma",
      "Systems"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m10"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "figma-systems-f1",
        "name": "Figma_Systems_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "figma-systems-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "figma-systems-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "figma-systems-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "figma-systems-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "motion-3d",
    "name": "Motion & 3D",
    "description": "Critique and references for scenes, motion studies, and product renders.",
    "iconLabel": "MO",
    "memberCount": 720,
    "onlineCount": 50,
    "unreadCount": 2,
    "access": "Patron",
    "accent": "#10B981",
    "tags": [
      "3D",
      "Motion"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m2",
      "m4",
      "m7"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "motion-3d-f1",
        "name": "Motion_& 3D_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "motion-3d-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "motion-3d-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "motion-3d-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "motion-3d-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "ai-workflows",
    "name": "AI Workflows",
    "description": "Pipelines, automation, and AI integration for creative agencies.",
    "iconLabel": "AI",
    "memberCount": 455,
    "onlineCount": 20,
    "unreadCount": 3,
    "access": "Patron",
    "accent": "rgba(168, 85, 247, 0.18)",
    "tags": [
      "AI",
      "Automation"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m9"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "ai-workflows-f1",
        "name": "AI_Workflows_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "ai-workflows-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "ai-workflows-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "ai-workflows-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "ai-workflows-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "typography",
    "name": "Typography",
    "description": "Typeface pairings, editorial design, and foundry discussions.",
    "iconLabel": "TY",
    "memberCount": 377,
    "onlineCount": 87,
    "unreadCount": 3,
    "access": "Member",
    "accent": "rgba(239, 68, 68, 0.18)",
    "tags": [
      "Fonts",
      "Editorial"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m6",
      "m8"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "typography-f1",
        "name": "Typography_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "typography-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "typography-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "typography-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "typography-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "branding-lab",
    "name": "Branding Lab",
    "description": "Identity systems, guidelines, and brand strategy.",
    "iconLabel": "BR",
    "memberCount": 454,
    "onlineCount": 88,
    "unreadCount": 5,
    "access": "Member",
    "accent": "rgba(14, 165, 233, 0.18)",
    "tags": [
      "Brand",
      "Identity"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m6",
      "m12"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "branding-lab-f1",
        "name": "Branding_Lab_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "branding-lab-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "branding-lab-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "branding-lab-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "branding-lab-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "landing-page-reviews",
    "name": "Landing Page Reviews",
    "description": "Conversion optimization, copy, and hero section teardowns.",
    "iconLabel": "LA",
    "memberCount": 832,
    "onlineCount": 60,
    "unreadCount": 4,
    "access": "Member",
    "accent": "rgba(249, 115, 22, 0.18)",
    "tags": [
      "Marketing",
      "Web"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m5",
      "m11"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "landing-page-reviews-f1",
        "name": "Landing_Page Reviews_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "landing-page-reviews-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "landing-page-reviews-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "landing-page-reviews-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "landing-page-reviews-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "tools-workflows",
    "name": "Tools & Workflows",
    "description": "Private notes on production setups and software stacks.",
    "iconLabel": "TO",
    "memberCount": 880,
    "onlineCount": 46,
    "unreadCount": 5,
    "access": "Collector",
    "accent": "rgba(99, 102, 241, 0.18)",
    "tags": [
      "Productivity",
      "Setup"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m9",
      "m11"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "tools-workflows-f1",
        "name": "Tools_& Workflows_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "tools-workflows-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "tools-workflows-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "tools-workflows-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "tools-workflows-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "premium-lounge",
    "name": "Premium Lounge",
    "description": "Exclusive chat for Patron members.",
    "iconLabel": "PR",
    "memberCount": 375,
    "onlineCount": 72,
    "unreadCount": 0,
    "access": "Patron",
    "accent": "#FFD700",
    "tags": [
      "Exclusive",
      "Patrons"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m12"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "premium-lounge-f1",
        "name": "Premium_Lounge_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "premium-lounge-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "premium-lounge-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "premium-lounge-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "premium-lounge-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  },
  {
    "id": "admin-room",
    "name": "Admin Room",
    "description": "Moderation, platform updates, and private admin discussions.",
    "iconLabel": "AD",
    "memberCount": 868,
    "onlineCount": 19,
    "unreadCount": 4,
    "access": "Admin",
    "accent": "rgba(255, 255, 255, 0.1)",
    "tags": [
      "Staff",
      "Moderation"
    ],
    "rules": [
      "Keep it professional",
      "Share context with links"
    ],
    "memberIds": [
      "m1",
      "viewer"
    ],
    "linkedRoomIds": [],
    "linkedRequestIds": [
      "REQ-1",
      "REQ-2",
      "REQ-3",
      "REQ-4",
      "REQ-5"
    ],
    "linkedResourceIds": [
      "RES-101",
      "RES-102",
      "RES-103"
    ],
    "linkedSiteIds": [
      "SITE-201",
      "SITE-202"
    ],
    "fileAttachments": [
      {
        "id": "admin-room-f1",
        "name": "Admin_Room_Guidelines.pdf",
        "url": "#",
        "type": "application/pdf",
        "size": "2.4 MB",
        "uploadedBy": "Alex Admin",
        "uploadedAt": "2026-04-22T15:28:45.095Z"
      },
      {
        "id": "admin-room-f2",
        "name": "Weekly_References.zip",
        "url": "#",
        "type": "application/zip",
        "size": "14.1 MB",
        "uploadedBy": "Elena Rodriguez",
        "uploadedAt": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "admin-room-f3",
        "name": "Component_Spec_V3.fig",
        "url": "#",
        "type": "application/octet-stream",
        "size": "8.2 MB",
        "uploadedBy": "Clara Novak",
        "uploadedAt": "2026-05-02T03:28:45.095Z"
      },
      {
        "id": "admin-room-f4",
        "name": "Moodboard_Final.png",
        "url": "#",
        "type": "image/png",
        "size": "4.5 MB",
        "uploadedBy": "Mira Patel",
        "uploadedAt": "2026-05-02T10:28:45.095Z"
      },
      {
        "id": "admin-room-f5",
        "name": "Asset_Pack_Lite.zip",
        "url": "#",
        "type": "application/zip",
        "size": "25 MB",
        "uploadedBy": "Leo Martin",
        "uploadedAt": "2026-05-02T13:28:45.095Z"
      }
    ]
  }
];
export const greatHallRoomMessages: Record<string, GreatHallChatMessage[]> = {
  "general-chat": [
    {
      "id": "general-chat-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to General Lounge**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "general-chat-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "general-chat-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "general-chat-msg-t1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "general-chat-msg-t2",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "general-chat-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "general-chat-msg-t3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "general-chat-msg-t1"
    },
    {
      "id": "general-chat-msg-r1",
      "authorId": "m3",
      "authorName": "Mark Taylor",
      "authorRole": "Collector",
      "avatar": "M",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "general-chat-msg-f1",
      "authorId": "m13",
      "authorName": "Sam Quiet",
      "authorRole": "Member",
      "avatar": "S",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "general-chat-msg-req1",
      "authorId": "viewer",
      "authorName": "You",
      "authorRole": "Admin",
      "avatar": "Y",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "general-chat-msg-img1",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "general-chat-msg-n1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "announcements": [
    {
      "id": "announcements-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Announcements**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "announcements-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "announcements-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "announcements-msg-t1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "announcements-msg-t2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "announcements-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "announcements-msg-t3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "announcements-msg-t1"
    },
    {
      "id": "announcements-msg-r1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "announcements-msg-f1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "announcements-msg-req1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "announcements-msg-img1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "announcements-msg-n1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "design-feedback": [
    {
      "id": "design-feedback-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Design Feedback**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "design-feedback-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "design-feedback-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "design-feedback-msg-t1",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "design-feedback-msg-t2",
      "authorId": "m8",
      "authorName": "Hanna Weber",
      "authorRole": "Collector",
      "avatar": "H",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "design-feedback-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "design-feedback-msg-t3",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "design-feedback-msg-t1"
    },
    {
      "id": "design-feedback-msg-r1",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "design-feedback-msg-f1",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "design-feedback-msg-req1",
      "authorId": "m8",
      "authorName": "Hanna Weber",
      "authorRole": "Collector",
      "avatar": "H",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "design-feedback-msg-img1",
      "authorId": "m8",
      "authorName": "Hanna Weber",
      "authorRole": "Collector",
      "avatar": "H",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "design-feedback-msg-n1",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "resource-requests": [
    {
      "id": "resource-requests-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Resource Requests**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "resource-requests-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "resource-requests-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "resource-requests-msg-t1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "resource-requests-msg-t2",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "resource-requests-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "resource-requests-msg-t3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "resource-requests-msg-t1"
    },
    {
      "id": "resource-requests-msg-r1",
      "authorId": "m3",
      "authorName": "Mark Taylor",
      "authorRole": "Collector",
      "avatar": "M",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "resource-requests-msg-f1",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "resource-requests-msg-req1",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "resource-requests-msg-img1",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "resource-requests-msg-n1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "showcase": [
    {
      "id": "showcase-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Showcase**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "showcase-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "showcase-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "showcase-msg-t1",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "showcase-msg-t2",
      "authorId": "m7",
      "authorName": "Leo Martin",
      "authorRole": "Patron",
      "avatar": "L",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "showcase-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "showcase-msg-t3",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "showcase-msg-t1"
    },
    {
      "id": "showcase-msg-r1",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "showcase-msg-f1",
      "authorId": "m7",
      "authorName": "Leo Martin",
      "authorRole": "Patron",
      "avatar": "L",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "showcase-msg-req1",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "showcase-msg-img1",
      "authorId": "m7",
      "authorName": "Leo Martin",
      "authorRole": "Patron",
      "avatar": "L",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "showcase-msg-n1",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "framer-development": [
    {
      "id": "framer-development-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Framer Development**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "framer-development-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "framer-development-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "framer-development-msg-t1",
      "authorId": "m3",
      "authorName": "Mark Taylor",
      "authorRole": "Collector",
      "avatar": "M",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "framer-development-msg-t2",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "framer-development-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "framer-development-msg-t3",
      "authorId": "m3",
      "authorName": "Mark Taylor",
      "authorRole": "Collector",
      "avatar": "M",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "framer-development-msg-t1"
    },
    {
      "id": "framer-development-msg-r1",
      "authorId": "m3",
      "authorName": "Mark Taylor",
      "authorRole": "Collector",
      "avatar": "M",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "framer-development-msg-f1",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "framer-development-msg-req1",
      "authorId": "m3",
      "authorName": "Mark Taylor",
      "authorRole": "Collector",
      "avatar": "M",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "framer-development-msg-img1",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "framer-development-msg-n1",
      "authorId": "m3",
      "authorName": "Mark Taylor",
      "authorRole": "Collector",
      "avatar": "M",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "figma-systems": [
    {
      "id": "figma-systems-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Figma Systems**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "figma-systems-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "figma-systems-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "figma-systems-msg-t1",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "figma-systems-msg-t2",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "figma-systems-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "figma-systems-msg-t3",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "figma-systems-msg-t1"
    },
    {
      "id": "figma-systems-msg-r1",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "figma-systems-msg-f1",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "figma-systems-msg-req1",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "figma-systems-msg-img1",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "figma-systems-msg-n1",
      "authorId": "m10",
      "authorName": "Clara Novak",
      "authorRole": "Member",
      "avatar": "C",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "motion-3d": [
    {
      "id": "motion-3d-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Motion & 3D**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "motion-3d-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "motion-3d-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "motion-3d-msg-t1",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "motion-3d-msg-t2",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "motion-3d-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "motion-3d-msg-t3",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "motion-3d-msg-t1"
    },
    {
      "id": "motion-3d-msg-r1",
      "authorId": "m7",
      "authorName": "Leo Martin",
      "authorRole": "Patron",
      "avatar": "L",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "motion-3d-msg-f1",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "motion-3d-msg-req1",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "motion-3d-msg-img1",
      "authorId": "m4",
      "authorName": "Sofia Chen",
      "authorRole": "Patron",
      "avatar": "S",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "motion-3d-msg-n1",
      "authorId": "m2",
      "authorName": "Elena Rodriguez",
      "authorRole": "Patron",
      "avatar": "E",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "ai-workflows": [
    {
      "id": "ai-workflows-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to AI Workflows**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "ai-workflows-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "ai-workflows-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "ai-workflows-msg-t1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "ai-workflows-msg-t2",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "ai-workflows-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "ai-workflows-msg-t3",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "ai-workflows-msg-t1"
    },
    {
      "id": "ai-workflows-msg-r1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "ai-workflows-msg-f1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "ai-workflows-msg-req1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "ai-workflows-msg-img1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "ai-workflows-msg-n1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "typography": [
    {
      "id": "typography-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Typography**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "typography-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "typography-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "typography-msg-t1",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "typography-msg-t2",
      "authorId": "m8",
      "authorName": "Hanna Weber",
      "authorRole": "Collector",
      "avatar": "H",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "typography-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "typography-msg-t3",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "typography-msg-t1"
    },
    {
      "id": "typography-msg-r1",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "typography-msg-f1",
      "authorId": "m8",
      "authorName": "Hanna Weber",
      "authorRole": "Collector",
      "avatar": "H",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "typography-msg-req1",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "typography-msg-img1",
      "authorId": "m8",
      "authorName": "Hanna Weber",
      "authorRole": "Collector",
      "avatar": "H",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "typography-msg-n1",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "branding-lab": [
    {
      "id": "branding-lab-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Branding Lab**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "branding-lab-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "branding-lab-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "branding-lab-msg-t1",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "branding-lab-msg-t2",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "branding-lab-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "branding-lab-msg-t3",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "branding-lab-msg-t1"
    },
    {
      "id": "branding-lab-msg-r1",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "branding-lab-msg-f1",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "branding-lab-msg-req1",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "branding-lab-msg-img1",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "branding-lab-msg-n1",
      "authorId": "m6",
      "authorName": "Mira Patel",
      "authorRole": "Member",
      "avatar": "M",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "landing-page-reviews": [
    {
      "id": "landing-page-reviews-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Landing Page Reviews**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "landing-page-reviews-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "landing-page-reviews-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "landing-page-reviews-msg-t1",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "landing-page-reviews-msg-t2",
      "authorId": "m11",
      "authorName": "Omar Reyes",
      "authorRole": "Collector",
      "avatar": "O",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "landing-page-reviews-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "landing-page-reviews-msg-t3",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "landing-page-reviews-msg-t1"
    },
    {
      "id": "landing-page-reviews-msg-r1",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "landing-page-reviews-msg-f1",
      "authorId": "m11",
      "authorName": "Omar Reyes",
      "authorRole": "Collector",
      "avatar": "O",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "landing-page-reviews-msg-req1",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "landing-page-reviews-msg-img1",
      "authorId": "m11",
      "authorName": "Omar Reyes",
      "authorRole": "Collector",
      "avatar": "O",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "landing-page-reviews-msg-n1",
      "authorId": "m5",
      "authorName": "Daniel Brooks",
      "authorRole": "Collector",
      "avatar": "D",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "tools-workflows": [
    {
      "id": "tools-workflows-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Tools & Workflows**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "tools-workflows-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "tools-workflows-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "tools-workflows-msg-t1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "tools-workflows-msg-t2",
      "authorId": "m11",
      "authorName": "Omar Reyes",
      "authorRole": "Collector",
      "avatar": "O",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "tools-workflows-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "tools-workflows-msg-t3",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "tools-workflows-msg-t1"
    },
    {
      "id": "tools-workflows-msg-r1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "tools-workflows-msg-f1",
      "authorId": "m11",
      "authorName": "Omar Reyes",
      "authorRole": "Collector",
      "avatar": "O",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "tools-workflows-msg-req1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "tools-workflows-msg-img1",
      "authorId": "m11",
      "authorName": "Omar Reyes",
      "authorRole": "Collector",
      "avatar": "O",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "tools-workflows-msg-n1",
      "authorId": "m9",
      "authorName": "Yusuf Khan",
      "authorRole": "Patron",
      "avatar": "Y",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "premium-lounge": [
    {
      "id": "premium-lounge-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Premium Lounge**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "premium-lounge-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "premium-lounge-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "premium-lounge-msg-t1",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "premium-lounge-msg-t2",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "premium-lounge-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "premium-lounge-msg-t3",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "premium-lounge-msg-t1"
    },
    {
      "id": "premium-lounge-msg-r1",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "premium-lounge-msg-f1",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "premium-lounge-msg-req1",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "premium-lounge-msg-img1",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "premium-lounge-msg-n1",
      "authorId": "m12",
      "authorName": "Nina Hart",
      "authorRole": "Patron",
      "avatar": "N",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ],
  "admin-room": [
    {
      "id": "admin-room-msg-p1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "**Welcome to Admin Room**. \n\nPlease ensure all discussions remain on-topic. If you are sharing files or links, provide a brief description of what they contain and why they are valuable. Check the linked resources before asking common questions.",
      "timestamp": "2026-04-11T19:28:45.095Z",
      "pinned": true
    },
    {
      "id": "admin-room-msg-p2",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Weekly roundup is posted! Check out the top requests and shared resources from this week.",
      "timestamp": "2026-04-25T15:28:45.095Z",
      "pinned": true,
      "attachments": [
        {
          "type": "resource",
          "targetId": "RES-101",
          "name": "Weekly Curator Picks"
        }
      ]
    },
    {
      "id": "admin-room-msg-p3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "System Update: We have updated the file upload limits for this room. Patron members can now upload files up to 100MB.",
      "timestamp": "2026-04-29T15:28:45.095Z",
      "pinned": true,
      "isSystem": true
    },
    {
      "id": "admin-room-msg-t1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Has anyone experimented with the new Framer 3D transforms? I feel like performance drops significantly on mobile.",
      "timestamp": "2026-05-01T15:28:45.095Z",
      "reactions": [
        {
          "emoji": "👀",
          "count": 4,
          "userIds": [
            "m1",
            "m2"
          ]
        }
      ]
    },
    {
      "id": "admin-room-msg-t2",
      "authorId": "viewer",
      "authorName": "You",
      "authorRole": "Admin",
      "avatar": "Y",
      "content": "Yes, you need to bake the lighting and use optimized glTF files. Don't use heavy materials directly in Framer.",
      "timestamp": "2026-05-01T16:28:45.095Z",
      "replyToId": "admin-room-msg-t1",
      "reactions": [
        {
          "emoji": "🔥",
          "count": 2,
          "userIds": [
            "m1"
          ]
        }
      ]
    },
    {
      "id": "admin-room-msg-t3",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Makes sense. I'll compress the textures in Blender first. Thanks!",
      "timestamp": "2026-05-01T17:28:45.095Z",
      "replyToId": "admin-room-msg-t1"
    },
    {
      "id": "admin-room-msg-r1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Just dropping this incredibly detailed WebGL site reference here. The scroll hijacking is actually done well for once.",
      "timestamp": "2026-05-02T03:28:45.095Z",
      "attachments": [
        {
          "type": "site",
          "targetId": "SITE-201",
          "name": "WebGL Portfolio 2024"
        }
      ]
    },
    {
      "id": "admin-room-msg-f1",
      "authorId": "viewer",
      "authorName": "You",
      "authorRole": "Admin",
      "avatar": "Y",
      "content": "Hey all, I put together a small zip of high-res grain textures. Feel free to use them in your projects.",
      "timestamp": "2026-05-02T07:28:45.095Z",
      "attachments": [
        {
          "type": "file",
          "url": "#",
          "name": "Grain_Textures_Vol1.zip"
        }
      ],
      "reactions": [
        {
          "emoji": "❤️",
          "count": 12,
          "userIds": [
            "m1",
            "m2",
            "m4"
          ]
        }
      ]
    },
    {
      "id": "admin-room-msg-req1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "I'm still looking for good examples of fintech dashboards if anyone has time to check my request:",
      "timestamp": "2026-05-02T10:28:45.095Z",
      "attachments": [
        {
          "type": "request",
          "targetId": "REQ-9",
          "name": "Find premium icon systems for fintech UI"
        }
      ]
    },
    {
      "id": "admin-room-msg-img1",
      "authorId": "viewer",
      "authorName": "You",
      "authorRole": "Admin",
      "avatar": "Y",
      "content": "Look at how clean this new component structure is:",
      "timestamp": "2026-05-02T13:28:45.095Z",
      "attachments": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
          "name": "figma_structure.png"
        }
      ]
    },
    {
      "id": "admin-room-msg-n1",
      "authorId": "m1",
      "authorName": "Alex Admin",
      "authorRole": "Admin",
      "avatar": "A",
      "content": "Anyone else attending the design systems conference next week? Would love to meet up.",
      "timestamp": "2026-05-02T14:28:45.095Z"
    }
  ]
};
export const greatHallConversations: GreatHallConversation[] = [
  {
    "id": "thread-m1",
    "memberId": "m1",
    "memberName": "Alex Admin",
    "memberRole": "Admin",
    "avatar": "A",
    "online": true,
    "unreadCount": 2,
    "updatedAt": "2026-05-02T15:28:45.095Z",
    "messages": [
      {
        "id": "dm-0-1",
        "authorId": "m1",
        "authorName": "Alex Admin",
        "authorRole": "Admin",
        "avatar": "A",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-0-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Alex! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-0-3",
        "authorId": "m1",
        "authorName": "Alex Admin",
        "authorRole": "Admin",
        "avatar": "A",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-0-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-0-5",
        "authorId": "m1",
        "authorName": "Alex Admin",
        "authorRole": "Admin",
        "avatar": "A",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-0-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-0-7",
        "authorId": "m1",
        "authorName": "Alex Admin",
        "authorRole": "Admin",
        "avatar": "A",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-0-8",
        "authorId": "m1",
        "authorName": "Alex Admin",
        "authorRole": "Admin",
        "avatar": "A",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m2",
    "memberId": "m2",
    "memberName": "Elena Rodriguez",
    "memberRole": "Patron",
    "avatar": "E",
    "online": true,
    "unreadCount": 0,
    "updatedAt": "2026-05-02T13:28:45.095Z",
    "messages": [
      {
        "id": "dm-1-1",
        "authorId": "m2",
        "authorName": "Elena Rodriguez",
        "authorRole": "Patron",
        "avatar": "E",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-1-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Elena! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-1-3",
        "authorId": "m2",
        "authorName": "Elena Rodriguez",
        "authorRole": "Patron",
        "avatar": "E",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-1-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-1-5",
        "authorId": "m2",
        "authorName": "Elena Rodriguez",
        "authorRole": "Patron",
        "avatar": "E",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-1-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-1-7",
        "authorId": "m2",
        "authorName": "Elena Rodriguez",
        "authorRole": "Patron",
        "avatar": "E",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-1-8",
        "authorId": "m2",
        "authorName": "Elena Rodriguez",
        "authorRole": "Patron",
        "avatar": "E",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m3",
    "memberId": "m3",
    "memberName": "Mark Taylor",
    "memberRole": "Collector",
    "avatar": "M",
    "online": false,
    "unreadCount": 0,
    "updatedAt": "2026-05-02T11:28:45.095Z",
    "messages": [
      {
        "id": "dm-2-1",
        "authorId": "m3",
        "authorName": "Mark Taylor",
        "authorRole": "Collector",
        "avatar": "M",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-2-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Mark! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-2-3",
        "authorId": "m3",
        "authorName": "Mark Taylor",
        "authorRole": "Collector",
        "avatar": "M",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-2-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-2-5",
        "authorId": "m3",
        "authorName": "Mark Taylor",
        "authorRole": "Collector",
        "avatar": "M",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-2-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-2-7",
        "authorId": "m3",
        "authorName": "Mark Taylor",
        "authorRole": "Collector",
        "avatar": "M",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-2-8",
        "authorId": "m3",
        "authorName": "Mark Taylor",
        "authorRole": "Collector",
        "avatar": "M",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m4",
    "memberId": "m4",
    "memberName": "Sofia Chen",
    "memberRole": "Patron",
    "avatar": "S",
    "online": true,
    "unreadCount": 2,
    "updatedAt": "2026-05-02T09:28:45.095Z",
    "messages": [
      {
        "id": "dm-3-1",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-3-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Sofia! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-3-3",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-3-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-3-5",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-3-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-3-7",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-3-8",
        "authorId": "m4",
        "authorName": "Sofia Chen",
        "authorRole": "Patron",
        "avatar": "S",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m5",
    "memberId": "m5",
    "memberName": "Daniel Brooks",
    "memberRole": "Collector",
    "avatar": "D",
    "online": true,
    "unreadCount": 0,
    "updatedAt": "2026-05-02T07:28:45.095Z",
    "messages": [
      {
        "id": "dm-4-1",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-4-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Daniel! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-4-3",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-4-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-4-5",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-4-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-4-7",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-4-8",
        "authorId": "m5",
        "authorName": "Daniel Brooks",
        "authorRole": "Collector",
        "avatar": "D",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m6",
    "memberId": "m6",
    "memberName": "Mira Patel",
    "memberRole": "Member",
    "avatar": "M",
    "online": false,
    "unreadCount": 0,
    "updatedAt": "2026-05-02T05:28:45.095Z",
    "messages": [
      {
        "id": "dm-5-1",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-5-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Mira! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-5-3",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-5-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-5-5",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-5-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-5-7",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-5-8",
        "authorId": "m6",
        "authorName": "Mira Patel",
        "authorRole": "Member",
        "avatar": "M",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m7",
    "memberId": "m7",
    "memberName": "Leo Martin",
    "memberRole": "Patron",
    "avatar": "L",
    "online": true,
    "unreadCount": 0,
    "updatedAt": "2026-05-02T03:28:45.095Z",
    "messages": [
      {
        "id": "dm-6-1",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-6-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Leo! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-6-3",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-6-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-6-5",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-6-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-6-7",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-6-8",
        "authorId": "m7",
        "authorName": "Leo Martin",
        "authorRole": "Patron",
        "avatar": "L",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m8",
    "memberId": "m8",
    "memberName": "Hanna Weber",
    "memberRole": "Collector",
    "avatar": "H",
    "online": false,
    "unreadCount": 0,
    "updatedAt": "2026-05-02T01:28:45.095Z",
    "messages": [
      {
        "id": "dm-7-1",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-7-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Hanna! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-7-3",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-7-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-7-5",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-7-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-7-7",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-7-8",
        "authorId": "m8",
        "authorName": "Hanna Weber",
        "authorRole": "Collector",
        "avatar": "H",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m9",
    "memberId": "m9",
    "memberName": "Yusuf Khan",
    "memberRole": "Patron",
    "avatar": "Y",
    "online": true,
    "unreadCount": 0,
    "updatedAt": "2026-05-01T23:28:45.095Z",
    "messages": [
      {
        "id": "dm-8-1",
        "authorId": "m9",
        "authorName": "Yusuf Khan",
        "authorRole": "Patron",
        "avatar": "Y",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-8-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Yusuf! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-8-3",
        "authorId": "m9",
        "authorName": "Yusuf Khan",
        "authorRole": "Patron",
        "avatar": "Y",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.095Z"
      },
      {
        "id": "dm-8-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.095Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-8-5",
        "authorId": "m9",
        "authorName": "Yusuf Khan",
        "authorRole": "Patron",
        "avatar": "Y",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.095Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-8-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.095Z"
      },
      {
        "id": "dm-8-7",
        "authorId": "m9",
        "authorName": "Yusuf Khan",
        "authorRole": "Patron",
        "avatar": "Y",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.095Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-8-8",
        "authorId": "m9",
        "authorName": "Yusuf Khan",
        "authorRole": "Patron",
        "avatar": "Y",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.095Z"
      }
    ]
  },
  {
    "id": "thread-m10",
    "memberId": "m10",
    "memberName": "Clara Novak",
    "memberRole": "Member",
    "avatar": "C",
    "online": true,
    "unreadCount": 0,
    "updatedAt": "2026-05-01T21:28:45.095Z",
    "messages": [
      {
        "id": "dm-9-1",
        "authorId": "m10",
        "authorName": "Clara Novak",
        "authorRole": "Member",
        "avatar": "C",
        "content": "Hey! I saw the resource you posted in the Showcase room. It's incredibly helpful.",
        "timestamp": "2026-04-30T15:28:45.095Z"
      },
      {
        "id": "dm-9-2",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Thanks Clara! Glad you found it useful. Are you working on something similar right now?",
        "timestamp": "2026-04-30T16:28:45.095Z"
      },
      {
        "id": "dm-9-3",
        "authorId": "m10",
        "authorName": "Clara Novak",
        "authorRole": "Member",
        "avatar": "C",
        "content": "Yeah, actually building out a complex data grid and was struggling with the filtering UI. Your example clarified a lot of the structural problems I was having.",
        "timestamp": "2026-04-30T17:28:45.096Z"
      },
      {
        "id": "dm-9-4",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "Data grids are notoriously tricky. I highly recommend checking out this site for more specialized table patterns.",
        "timestamp": "2026-04-30T18:28:45.096Z",
        "attachments": [
          {
            "type": "site",
            "targetId": "SITE-15",
            "name": "Table Design Patterns"
          }
        ]
      },
      {
        "id": "dm-9-5",
        "authorId": "m10",
        "authorName": "Clara Novak",
        "authorRole": "Member",
        "avatar": "C",
        "content": "Whoa, this is exactly what I needed. Thanks so much!",
        "timestamp": "2026-04-30T19:28:45.096Z",
        "reactions": [
          {
            "emoji": "🙏",
            "count": 1,
            "userIds": [
              "viewer"
            ]
          }
        ]
      },
      {
        "id": "dm-9-6",
        "authorId": "viewer",
        "authorName": "You",
        "authorRole": "Admin",
        "avatar": "Y",
        "content": "No problem. Let me know if you want me to review the final design.",
        "timestamp": "2026-04-30T20:28:45.096Z"
      },
      {
        "id": "dm-9-7",
        "authorId": "m10",
        "authorName": "Clara Novak",
        "authorRole": "Member",
        "avatar": "C",
        "content": "Will do. Here's a quick preview of where it's at right now. Don't mind the messy auto-layout.",
        "timestamp": "2026-05-02T10:28:45.096Z",
        "attachments": [
          {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "name": "draft_v1.png"
          }
        ]
      },
      {
        "id": "dm-9-8",
        "authorId": "m10",
        "authorName": "Clara Novak",
        "authorRole": "Member",
        "avatar": "C",
        "content": "Let me know what you think when you have a minute.",
        "timestamp": "2026-05-02T11:28:45.096Z"
      }
    ]
  }
];
export const mockSavedItems: GHSavedItem[] = [
  {
    "id": "save-1",
    "type": "request",
    "title": "Looking for high-quality dark mode SaaS dashboard mockups",
    "description": "Need these references for the upcoming Q3 project.",
    "savedAt": "2026-05-01T15:28:45.096Z",
    "targetId": "REQ-1",
    "targetRoute": "/app/great-hall/requests/REQ-1"
  },
  {
    "id": "save-2",
    "type": "file",
    "title": "Component_Spec_V3.fig",
    "description": "Saved from Figma Systems room.",
    "savedAt": "2026-04-30T15:28:45.096Z",
    "targetId": "figma-systems-f3",
    "targetRoute": "/app/great-hall/rooms/figma-systems"
  },
  {
    "id": "save-3",
    "type": "resource",
    "title": "SaaS Design System Pro",
    "description": "Incredible UI kit suggested by Alex.",
    "savedAt": "2026-04-29T15:28:45.096Z",
    "targetId": "RES-101",
    "targetRoute": "/app/resources/RES-101"
  },
  {
    "id": "save-4",
    "type": "post",
    "title": "WebGL Portfolio 2024",
    "description": "Crazy scroll hijacking reference.",
    "savedAt": "2026-04-28T15:28:45.096Z",
    "targetId": "general-chat-msg-r1",
    "targetRoute": "/app/great-hall/rooms/general-chat"
  },
  {
    "id": "save-5",
    "type": "site",
    "title": "Godly Website",
    "description": "Inspiration gallery.",
    "savedAt": "2026-04-27T15:28:45.096Z",
    "targetId": "SITE-12",
    "targetRoute": "/app/sites/SITE-12"
  },
  {
    "id": "save-6",
    "type": "request",
    "title": "Find premium icon systems for fintech UI",
    "description": "Has great suggestions in the comments.",
    "savedAt": "2026-04-26T15:28:45.096Z",
    "targetId": "REQ-9",
    "targetRoute": "/app/great-hall/requests/REQ-9"
  },
  {
    "id": "save-7",
    "type": "suggestion",
    "title": "Linear App References",
    "description": "Saved from Elena's reply.",
    "savedAt": "2026-04-25T15:28:45.096Z",
    "targetId": "sug-REQ-1-2",
    "targetRoute": "/app/great-hall/requests/REQ-1"
  },
  {
    "id": "save-8",
    "type": "reply",
    "title": "Baking lighting in Blender",
    "description": "Workflow tip for Framer 3D.",
    "savedAt": "2026-04-24T15:28:45.096Z",
    "targetId": "motion-3d-msg-t2",
    "targetRoute": "/app/great-hall/rooms/motion-3d"
  },
  {
    "id": "save-9",
    "type": "file",
    "title": "Weekly Curator Picks",
    "description": "Always good stuff.",
    "savedAt": "2026-04-23T15:28:45.096Z",
    "targetId": "announcements-msg-p2",
    "targetRoute": "/app/great-hall/rooms/announcements"
  },
  {
    "id": "save-10",
    "type": "request",
    "title": "Looking for Figma variable systems templates",
    "description": "Archived but valuable.",
    "savedAt": "2026-04-22T15:28:45.096Z",
    "targetId": "REQ-14",
    "targetRoute": "/app/great-hall/requests/REQ-14"
  }
];
export const mockNotifications: GHNotification[] = [
  {
    "id": "notif-1",
    "type": "dm",
    "title": "New message from Elena Rodriguez",
    "description": "Elena Rodriguez sent you a direct message.",
    "timestamp": "2026-05-02T14:28:45.096Z",
    "read": false,
    "targetRoute": "/app/great-hall/messages/thread-m2"
  },
  {
    "id": "notif-2",
    "type": "mention",
    "title": "Alex Admin mentioned you",
    "description": "Alex Admin mentioned you in \"Figma Systems\".",
    "timestamp": "2026-05-02T10:28:45.096Z",
    "read": false,
    "targetRoute": "/app/great-hall/rooms/figma-systems"
  },
  {
    "id": "notif-3",
    "type": "request_reply",
    "title": "New reply to your request",
    "description": "Mark Taylor replied to \"Looking for dark mode SaaS mockups\".",
    "timestamp": "2026-05-02T03:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/requests/REQ-1"
  },
  {
    "id": "notif-4",
    "type": "request_fulfilled",
    "title": "Request Fulfilled",
    "description": "Your request \"Find high-end pricing page references\" has been marked as fulfilled.",
    "timestamp": "2026-05-01T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/requests/REQ-12"
  },
  {
    "id": "notif-5",
    "type": "suggestion_accepted",
    "title": "Suggestion Accepted",
    "description": "Your suggestion for \"Need clean serif fonts\" was accepted as the solution!",
    "timestamp": "2026-04-30T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/requests/REQ-2"
  },
  {
    "id": "notif-6",
    "type": "room_announcement",
    "title": "New Announcement",
    "description": "Alex Admin posted a pinned message in \"Announcements\".",
    "timestamp": "2026-04-29T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/rooms/announcements"
  },
  {
    "id": "notif-7",
    "type": "file_shared",
    "title": "New File Shared",
    "description": "Leo Martin shared \"Asset_Pack_Lite.zip\" in \"Motion & 3D\".",
    "timestamp": "2026-04-28T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/rooms/motion-3d"
  },
  {
    "id": "notif-8",
    "type": "admin_update",
    "title": "Platform Update",
    "description": "New features have been added to the Resource hub.",
    "timestamp": "2026-04-27T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/rooms/announcements"
  },
  {
    "id": "notif-9",
    "type": "member_joined",
    "title": "New Member",
    "description": "Clara Novak joined the \"Design Feedback\" room.",
    "timestamp": "2026-04-26T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/rooms/design-feedback"
  },
  {
    "id": "notif-10",
    "type": "request_expiring",
    "title": "Request Expiring Soon",
    "description": "Your request \"Need animation curves\" expires in 2 days.",
    "timestamp": "2026-04-25T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/requests/REQ-13"
  },
  {
    "id": "notif-11",
    "type": "pushed_to_resources",
    "title": "Added to Resources",
    "description": "The solution for your request was added to the global Resources directory.",
    "timestamp": "2026-04-24T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/resources/RES-101"
  },
  {
    "id": "notif-12",
    "type": "dm",
    "title": "New message from Sofia Chen",
    "description": "Sofia Chen sent you a direct message.",
    "timestamp": "2026-04-23T15:28:45.096Z",
    "read": true,
    "targetRoute": "/app/great-hall/messages/thread-m4"
  }
];
export const mockAdminQueue: GHAdminQueueItem[] = [
  {
    "id": "queue-1",
    "status": "pending",
    "type": "pending_request",
    "submittedBy": "m2",
    "date": "2026-05-02T13:28:45.096Z",
    "reason": "User submitted a new request requiring approval due to high priority flag.",
    "linkedItemId": "REQ-1",
    "reviewNotes": ""
  },
  {
    "id": "queue-2",
    "status": "pending",
    "type": "suggested_resource",
    "submittedBy": "m4",
    "date": "2026-05-02T10:28:45.096Z",
    "reason": "New resource \"Fluid Motion Kit\" suggested for global directory.",
    "linkedItemId": "RES-102",
    "reviewNotes": ""
  },
  {
    "id": "queue-3",
    "status": "pending",
    "type": "fulfillment_review",
    "submittedBy": "m1",
    "date": "2026-05-02T03:28:45.096Z",
    "reason": "Request REQ-9 was fulfilled, review the accepted solution before archiving.",
    "linkedItemId": "REQ-9",
    "reviewNotes": ""
  },
  {
    "id": "queue-4",
    "status": "reviewed",
    "type": "flagged_comment",
    "submittedBy": "m6",
    "date": "2026-05-01T15:28:45.096Z",
    "reason": "Comment reported for spam/self-promotion in General Chat.",
    "linkedItemId": "general-chat-msg-t3",
    "reviewNotes": "Warning issued. Comment deleted.",
    "adminActions": [
      "Deleted Comment",
      "Sent Warning DM"
    ]
  },
  {
    "id": "queue-5",
    "status": "resolved",
    "type": "expired_request",
    "submittedBy": "system",
    "date": "2026-04-30T15:28:45.096Z",
    "reason": "Request REQ-13 has expired without a solution.",
    "linkedItemId": "REQ-13",
    "reviewNotes": "Archived request and notified creator.",
    "adminActions": [
      "Archived Request"
    ]
  },
  {
    "id": "queue-6",
    "status": "reviewed",
    "type": "room_moderation",
    "submittedBy": "m8",
    "date": "2026-04-29T15:28:45.096Z",
    "reason": "Request to create a new room for \"Sound Design\".",
    "reviewNotes": "Approved. Room created.",
    "adminActions": [
      "Created Room"
    ]
  },
  {
    "id": "queue-7",
    "status": "resolved",
    "type": "member_report",
    "submittedBy": "m10",
    "date": "2026-04-28T15:28:45.096Z",
    "reason": "Reported user for unsolicited DMs.",
    "linkedItemId": "m13",
    "reviewNotes": "Reviewed chat logs. Temporary suspension applied.",
    "adminActions": [
      "Suspended Account (7 days)"
    ]
  },
  {
    "id": "queue-8",
    "status": "pending",
    "type": "suggested_site",
    "submittedBy": "m11",
    "date": "2026-04-27T15:28:45.096Z",
    "reason": "New site \"Godly Website\" suggested for global directory.",
    "linkedItemId": "SITE-12",
    "reviewNotes": ""
  },
  {
    "id": "queue-9",
    "status": "reviewed",
    "type": "pending_request",
    "submittedBy": "m7",
    "date": "2026-04-26T15:28:45.096Z",
    "reason": "Review request for 3D resources.",
    "linkedItemId": "REQ-11",
    "reviewNotes": "Approved and published.",
    "adminActions": [
      "Published Request"
    ]
  },
  {
    "id": "queue-10",
    "status": "resolved",
    "type": "fulfillment_review",
    "submittedBy": "m1",
    "date": "2026-04-25T15:28:45.096Z",
    "reason": "Review solution for Serif Fonts.",
    "linkedItemId": "REQ-2",
    "reviewNotes": "Solution is valid. Request closed.",
    "adminActions": [
      "Closed Request"
    ]
  }
];
