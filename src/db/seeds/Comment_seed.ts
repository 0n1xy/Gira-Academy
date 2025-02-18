import { IComment } from "@/types/Comment_Interface";
import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";

export function createRandomComment(reviewId: ObjectId, level: number, parent_id: ObjectId | null = null): IComment {
  return {
    _id: new ObjectId(),
    user_id: new ObjectId(),
    review_id: reviewId,
    parent_id: parent_id,
    comment: faker.lorem.sentence(),
    images: [faker.image.url()],
    level: level,
    replies: [], // Replies will be populated later
  };
}
