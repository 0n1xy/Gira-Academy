import { ObjectId } from "mongodb";
import { IUser } from "@/types/User_Interface";

export interface ICart {
  _id: ObjectId;
  user_id: IUser["_id"];
  product_id: ObjectId;
  quantity: number;
  total_money: number;
}
