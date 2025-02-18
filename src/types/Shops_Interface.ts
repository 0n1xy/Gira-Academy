import { ObjectId } from "mongodb";

export interface IShop {
  _id: ObjectId;
  manager_id: ObjectId;
  name: string;
  email: string;
  status: string;
  address?: string;
  logo_image: string;
  payment_id?: ObjectId;
  balance: Number;
  createdAt?: Date;
  updatedAt?: Date;
}
