import { Schema, model } from "mongoose";
import { ISocialAuthInfos } from "@/types/SocialAuthInfos_Interface";

export const socialAuthInfosSchema: Schema<ISocialAuthInfos> = new Schema({
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    tiktokId: {
        type: String
    }
});

const SocialAuthInfos = model<ISocialAuthInfos>("SocialAuthInfos", socialAuthInfosSchema)

export default SocialAuthInfos; 