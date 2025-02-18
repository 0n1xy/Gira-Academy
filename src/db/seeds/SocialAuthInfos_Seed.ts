import { ISocialAuthInfos } from "@/types/SocialAuthInfos_Interface";
import { faker } from "@faker-js/faker";

export function createRandomSocialAuthInfos(): ISocialAuthInfos {
    return {
        googleId: faker.string.uuid(),
        facebookId: faker.string.uuid(),
        tiktokId: faker.string.uuid(),
    }
}
