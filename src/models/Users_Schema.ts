import { USERNAME_100, USER_FULLNAME_100 } from "../constant/User_Constant";
import { IUser } from "../types/User_Interface";
import { Schema, model } from "mongoose";
import { sellerInfosSchema } from "./SellerInfos_Schema";
import { socialAuthInfosSchema } from "./SocialAuthInfos_Schema";

export const userSchemaFields = {
	_id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	username: {
		type: String,
		required: true,
		maxLength: USERNAME_100,
	},
	password: {
		type: String,
		required: true,
	},
	is_vendor: {
		type: Boolean,
		default: false,
	},
	is_purchaser: { type: Boolean, default: true },
	is_admin: { type: Boolean, default: false },
	full_name: { type: String, required: true, maxLength: USER_FULLNAME_100 },
	phone_number: { type: String, required: true },
	email: { type: String, required: true },
	gender: { type: String, required: true },
	dBo: { type: Date, required: true },
	social_auth_infos: socialAuthInfosSchema,
	is_verify: { type: Boolean, required: true, default: false },
	address: { type: [String] },
	sellerInfos: sellerInfosSchema,
};
const userSchema = new Schema<IUser>(userSchemaFields);

const User = model<IUser>("User", userSchema);

export default User;
