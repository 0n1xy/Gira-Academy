import { IsellerInfos } from "@/types/Seller_Interface";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

export function createRandomSellerInfos(): IsellerInfos {
  return {
    _id: new ObjectId(),
    name: faker.person.fullName(),
    image: faker.image.url(),
    status: faker.datatype.boolean(),
  };
}
