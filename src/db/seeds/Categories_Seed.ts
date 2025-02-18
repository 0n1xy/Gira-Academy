import { ICategory } from "@/types/Category_Interface";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

export function createRandomCategories(): ICategory {
  const CATEGORIES_ID = new ObjectId();
  return {
    _id: CATEGORIES_ID,
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    image: faker.image.urlLoremFlickr(),
  };
}
