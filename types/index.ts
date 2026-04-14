export type UserRole = "ADMIN" | "EDITOR" | "VIEWER";
export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type ProjectStatus = "ACTIVE" | "INACTIVE" | "COMING_SOON";
export type TeamRole = "TRUSTEE" | "STAFF" | "MENTOR";
export type InquiryType = "STUDENT" | "VOLUNTEER" | "PARTNER" | "MEDIA" | "OTHER";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: PostStatus;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  author: { id: string; name: string };
  category: { id: string; name: string; slug: string };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _count?: { posts: number };
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  featuredImage?: string;
  heroImage?: string;
  status: ProjectStatus;
  sdgAlignment?: string;
  displayOrder: number;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  roleType: TeamRole;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  email?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ImpactStory {
  id: string;
  studentName: string;
  storyTitle: string;
  storyContent: string;
  imageUrl?: string;
  outcome?: string;
  isPublished: boolean;
  createdAt: Date;
  publishedAt?: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  inquiryType: InquiryType;
  createdAt: Date;
  readStatus: boolean;
  notes?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
