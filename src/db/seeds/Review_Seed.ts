import { IReview } from "@/types/Review_Interface";
import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";
import { STAR_RATING_3 } from "@/constant/Review_Constant";

export function createRandomReview(): IReview {
  return {
    _id: new ObjectId(),
    user_id: new ObjectId(), // Replace with an actual user ID from your Users collection
    product_id: new ObjectId(), // Replace with an actual product ID from your Products collection
    comment: faker.lorem.sentence(),
    images: [faker.image.url(), faker.image.url()],
    comments: [], // Comments will be populated later
    starRating: STAR_RATING_3,
  };
}
