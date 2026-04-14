import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  inquiryType: z.enum(["STUDENT", "VOLUNTEER", "PARTNER", "MEDIA", "OTHER"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  content: z.string().min(10, "Content is required"),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  categoryId: z.string().uuid("Please select a category"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  publishedAt: z.string().optional(),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  title: z.string().min(2, "Title is required"),
  roleType: z.enum(["TRUSTEE", "STAFF", "MENTOR"]),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  displayOrder: z.number().default(0),
});

export const impactStorySchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  storyTitle: z.string().min(3, "Story title is required"),
  storyContent: z.string().min(10, "Story content is required"),
  imageUrl: z.string().optional(),
  outcome: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[!@#$%^&*]/, "Must contain special character"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type BlogPostFormData = z.infer<typeof blogPostSchema>;
export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;
export type ImpactStoryFormData = z.infer<typeof impactStorySchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
