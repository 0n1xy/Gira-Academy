import { ObjectId } from "mongodb";
import { IProduct } from "./Products_Interface";
import { IUser } from "./User_Interface";

export interface IClick {
  _id: ObjectId;
  user_id: IUser["_id"];
  product_id: IProduct["_id"];
  clickCount: number;
}
