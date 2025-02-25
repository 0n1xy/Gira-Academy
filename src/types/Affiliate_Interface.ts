import { IUser } from "@/types/User_Interface";
import { ObjectId } from "mongodb";

export interface IAffiliate {
  _id: ObjectId;
  user_id: IUser["_id"];
  product_id: ObjectId;
  quantity: number;
  commission_rate: number;
  total_earnings: number;
}
