import { IShop } from "@/types/Shops_Interface";
import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";
import { SHOP_STATE } from "@/constant/Shops_constant";

//Get Random element from array
function getRandomShopState<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getRandomImage() {
  const number_of_image = faker.number.int({ min: 1, max: 5 });

  const images = faker.helpers.multiple(faker.image.avatar, {
    count: number_of_image,
  });
  return images;
}

export function createRandomShops(): IShop {
  return {
    _id: new ObjectId(),
    manager_id: new ObjectId(),
    email: faker.internet.email(),
    name: faker.company.name(),
    address: faker.location.direction(),
    status: getRandomShopState(SHOP_STATE),
    logo_image: faker.image.avatar(),
    balance: Number(faker.finance.amount()),
  };
}
