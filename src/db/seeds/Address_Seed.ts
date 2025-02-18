import { IAddresses } from "@/types/Addresses_Interface";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

export function createRandomAddress(USERID: ObjectId): IAddresses {
  const ADDRESS_ID = new ObjectId();
  return {
    _id: ADDRESS_ID,
    userId: USERID,
    buyer_address: faker.location.streetAddress(),
    buyer_name: faker.person.fullName(),
    buyer_phone_number: faker.phone.number(),
  };
}
