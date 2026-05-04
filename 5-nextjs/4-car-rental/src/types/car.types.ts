export type Transmission = "Otomatik" | "Manuel" | "Yarı Otomatik";

export type FuelType = "Benzin" | "Dizel" | "Elektrik" | "Hibrit" | "LPG";

export type CarType =
  | "Sedan"
  | "SUV"
  | "Hatchback"
  | "Coupe"
  | "Cabrio"
  | "Station Wagon"
  | "Pickup"
  | "Van"
  | "Minivan";

export interface ICar {
  make: string;
  modelName: string;
  year: number;
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  doors: number;
  pricePerDay: number;
  description: string;
  features: string[];
  location: string;
  isAvailable: boolean;
  averageRating: number;
  totalReviews: number;
  mileage: number;
  color: string;
  licensePlate: string;
  carType: CarType;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TRANSMISSIONS: Transmission[] = ["Otomatik", "Manuel", "Yarı Otomatik"];

export const FUEL_TYPES: FuelType[] = ["Benzin", "Dizel", "Elektrik", "Hibrit", "LPG"];

export const CAR_TYPES: CarType[] = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Cabrio",
  "Station Wagon",
  "Pickup",
  "Van",
  "Minivan",
];

export type CarListItem = Pick<
  ICar,
  | "make"
  | "modelName"
  | "year"
  | "carType"
  | "transmission"
  | "fuelType"
  | "seats"
  | "pricePerDay"
> & { _id: string };
