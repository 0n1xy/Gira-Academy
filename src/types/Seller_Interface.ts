import { ObjectId } from "mongodb";

export interface IsellerInfos {
  _id: ObjectId;
  name: string;
  image: string;
  status: boolean;
}
