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
