import User from "@/models/Users_Schema";
import { IUser } from "@/types/User_Interface";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import path from "path";
import { generateAccessToken, generateRefreshToken } from "./Jwt_Service";

class UserService {
	static async createUser(userData: IUser) {
		try {
			const emailExists = await User.findOne({ email: userData.email });

			if (emailExists) {
				throw new Error("Email already exists!");
			}

			const hash = bcrypt.hashSync(userData.password, 10);

			const savedUser = await User.create({
				...userData,
				password: hash,
			});
			return savedUser;
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to create user`
			);
		}
	}

	static async loginUser(userData: IUser) {
		try {
			const emailExists = await User.findOne({ email: userData.email });
			if (!emailExists) {
				throw new Error("Email not exists!");
			}

			console.log("emailExists", emailExists);

			const checkPassword = bcrypt.compareSync(
				userData.password,
				emailExists.password
			);

			if (!checkPassword) {
				throw new Error("Password incorrect!");
			}

			const access_token = await generateAccessToken({
				id: emailExists.id,
				isAdmin: emailExists.is_admin,
			});
			const refresh_token = await generateRefreshToken({
				id: emailExists.id,
				isAdmin: emailExists.is_admin,
			});

			return {
				user: emailExists,
				access_token,
				refresh_token,
			};
		} catch (error) {
			throw new Error(`${path.resolve(__filename)} Unable to login user`);
		}
	}

	static async updateUser(idUser: mongoose.Types.ObjectId, userData: IUser) {
		try {
			const userExists = await User.findOne({ _id: idUser });

			if (!userExists) {
				throw new Error("User not exists!");
			}

			const emailExists = await User.findOne({ email: userData.email });
			if (emailExists) {
				throw new Error("Email already exists!");
			}

			const response = await User.findByIdAndUpdate(idUser, userData, {
				new: true,
			});
			return response;
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to update user`
			);
		}
	}

	static async getDetailsUser(idUser: mongoose.Types.ObjectId) {
		try {
			const userExists = await User.findOne({ _id: idUser });

			if (!userExists) {
				throw new Error("User not exists!");
			}

			const response = await User.findById(idUser);
			return response;
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to get details user`
			);
		}
	}

	static async getAllUser(
		limit: number,
		page: number,
		filter: [string, string] | null
	) {
		try {
			const totalUser = await User.countDocuments();
			const queryConditions: { [key: string]: any } = {};
			if (filter) {
				queryConditions[filter[0]] = {
					$regex: filter[1],
					$options: "i",
				};
			}

			if (!Number.isInteger(page) || page < 1) {
				throw new Error("Page must be an integer and greater than 0");
			}

			const response = await User.find(queryConditions)
				.limit(limit)
				.skip(limit * (page - 1));

			const plainResponse = response.map((user) => user.toObject());

			return {
				data: plainResponse,
				totals: totalUser,
				page: page,
				totalPage: Math.ceil(totalUser / limit),
			};
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to get all user`
			);
		}
	}

	static async deleteUser(idUser: mongoose.Types.ObjectId) {
		try {
			const userExists = await User.findOne({ _id: idUser });

			if (!userExists) {
				throw new Error("User not exists!");
			}

			const response = await User.findByIdAndDelete(idUser);
			return response;
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to delete user`
			);
		}
	}

	static async findUserBySocialAuthInfo(platform: string, id: string) {
		try {
			const query = {} as { [key: string]: string };
			query[`social_auth_infos.${platform}`] = id;
			const user = await User.findOne(query);
			return user;
		} catch (error) {
			console.error("Error finding user by social auth info:", error);
			throw new Error("Unable to find user");
		}
	}
}

export { UserService };
