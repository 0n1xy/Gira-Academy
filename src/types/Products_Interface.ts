import { ObjectId } from "mongodb";

export interface IProduct {
  _id: ObjectId;
  category_id: ObjectId;
  shop_id: ObjectId;
  product_name: string;
  description: string;
  colors: string[];
  sizes: string[];
  price: number;
  quantity: number;
  images: string[];
}
