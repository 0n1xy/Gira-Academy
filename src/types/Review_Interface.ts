import { ObjectId } from "mongodb";

export interface IReview {
  _id: ObjectId;
  user_id: ObjectId;
  product_id: ObjectId;
  comment: string;
  images: string[];
  comments: ObjectId[];
  starRating: number;
  createdAt?: Date;
  updatedAt?: Date;
}
