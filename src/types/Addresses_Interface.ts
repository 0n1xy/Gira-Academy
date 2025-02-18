import { ObjectId } from "mongodb";
import { IUser } from "@/types/User_Interface";

export interface IAddresses {
  _id: ObjectId;
  userId: ObjectId;
  buyer_address: string;
  buyer_name: string;
  buyer_phone_number: string;
}
