import { Document, type ObjectId } from "mongoose";

export interface ErrorResponse {
  status: string;
  message: string;
  code: string;
  stack?: string;
}

export type UserType = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  isSeller: boolean;
  country: string;
  phone?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};
export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface ImageFiles {
  coverImage: File[];
  images: File[];
}

export interface Query {
  category?: string;
  userId?: string;
  min?: string;
  max?: string;
  search?: string;
}

export interface Filters {
  category?: string;
  user?: string;
  packagePrice?: {
    $gte?: number;
    $lte?: number;
  };
  title?: {
    $regex: string;
    $options: string;
  };
}
