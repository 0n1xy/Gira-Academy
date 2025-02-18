import { IUser } from "@/types/User_Interface";
import { ObjectId } from "mongodb";
import { IAddresses } from "./Addresses_Interface";
import { IAffiliate } from "./Affiliate_Interface";
import { IProduct } from "./Products_Interface";

export interface IOrder {
  _id: ObjectId;
  user_id: IUser["_id"];
  product_id: IProduct["_id"];
  address_id: IAddresses["_id"];
  affiliate_id?: IAffiliate["_id"];
  amount: number;
}
