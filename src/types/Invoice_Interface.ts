import { ObjectId } from "mongodb";
import { IProductItem } from "./ProductItem_Interface";

export interface IInvoice {
  _id: ObjectId;
  userId: ObjectId;
  productItems: IProductItem[];
  total_money: number;
  status: string;
  version: number;
}
