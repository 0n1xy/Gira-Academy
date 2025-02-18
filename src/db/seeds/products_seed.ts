import {
  MAX_IMAGE,
  MAX_PRICE,
  MAX_QUANTITY,
  MIN_IMAGE,
  MIN_PRICE,
  MIN_QUANTITY,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
} from "@/constant/products_constant";
import { IProduct } from "@/types/Products_Interface";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

function getRandomImage(min: number, max: number) {
  const number_of_image = faker.number.int({ min: min, max: max });

  const images = faker.helpers.multiple(faker.image.avatar, {
    count: number_of_image,
  });
  return images;
}

export function createRandomProducts(
  SHOPID: ObjectId,
  CategoryID: ObjectId
): IProduct {
  return {
    _id: new ObjectId(),
    category_id: CategoryID,
    shop_id: SHOPID,
    product_name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    colors: PRODUCT_COLORS,
    sizes: PRODUCT_SIZES,
    price: faker.number.int({ min: MIN_PRICE, max: MAX_PRICE }),
    quantity: faker.number.int({ min: MIN_QUANTITY, max: MAX_QUANTITY }),
    images: getRandomImage(MIN_IMAGE, MAX_IMAGE),
  };
}
