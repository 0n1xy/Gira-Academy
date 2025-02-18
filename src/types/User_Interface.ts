import { ObjectId } from "mongodb";
import { IsellerInfos } from "./Seller_Interface";
import { ISocialAuthInfos } from "./SocialAuthInfos_Interface";

export interface IUser {
	_id: ObjectId;
	username: string;
	password: string;
	is_vendor: boolean;
	is_purchaser: boolean;
	is_admin: boolean;
	full_name: string;
	phone_number: string;
	email: string;
	gender: string;
	dBo: Date;
	social_auth_infos?: ISocialAuthInfos;
	is_verify: boolean;
	address?: string[];
	sellerInfos?: IsellerInfos;
}
