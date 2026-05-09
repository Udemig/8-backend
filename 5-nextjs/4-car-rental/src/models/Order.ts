import { Schema } from "mongoose";

export interface IOrder {
  _id: string;
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  totalAmount: number;
  currency: string;
  status: "pending" | "paid" | "cancelled";
  rental: {
    pickupDate: Date;
    returnDate: Date;
    pickupTime: string;
    returntTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    days: number;
    notes?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

//TODO: SİPARİŞ ŞEMASI OLUŞTUR
