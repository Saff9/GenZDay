export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  image?: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface Post {
  id: string;
  userId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  expiresAt: Date;
  createdAt: Date;
  views: number;
  user?: User;
  likes?: number;
  comments?: Comment[];
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
  user?: User;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
