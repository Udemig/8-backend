export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  profilePicture: File;
  country: string;
  isSeller: boolean;
  phone?: string;
  description?: string;
}

export interface User {
  username: string;
  email: string;
  country: string;
  profilePicture: string;
  isSeller: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  phone?: string;
  description?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface FilterParams {
  category?: string | null;
  search?: string | null;
  userId?: string;
  min?: string;
  max?: string;
}

export interface Gig {
  user: User;
  title: string;
  description: string;
  reviewCount: number;
  starCount: number;
  category: string;
  coverImage: string;
  images: string[];
  packageTitle: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: string[];
  packageDuration: number;
  packageRevision: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface GetAllGigRes {
  message: string;
  results: number;
  data: Gig[];
}

export interface GetOneGigRes {
  message: string;
  data: Gig;
}
