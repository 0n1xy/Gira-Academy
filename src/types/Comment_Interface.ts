import { ObjectId } from "mongodb";

export interface IComment {
  _id: ObjectId;
  user_id: ObjectId;
  review_id: ObjectId;
  parent_id: ObjectId | null;
  comment: string;
  images: string[];
  level: number;
  replies: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
