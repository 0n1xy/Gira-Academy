import Address from "@/models/Addresses_Schema";
import User from "@/models/Users_Schema";
import { IAddresses } from "@/types/Addresses_Interface";
import mongoose from "mongoose";
import path from "path";

class AddressService {
	static async createAddress(AddressData: IAddresses) {
		try {
			const savedAddress = await Address.create(AddressData);
			await User.findByIdAndUpdate(AddressData.userId, {
				$addToSet: { address: savedAddress._id },
			});
			return savedAddress;
		} catch (error) {
			console.log("errorS", error);
			throw new Error(
				`${path.resolve(__filename)} Unable to create Address`
			);
		}
	}

	static async updateAddress(
		idAddress: mongoose.Types.ObjectId,
		AddressData: IAddresses
	) {
		try {
			const AddressExists = await Address.findOne({ _id: idAddress });

			if (!AddressExists) {
				throw new Error("Address not exists!");
			}

			const response = await Address.findByIdAndUpdate(
				idAddress,
				AddressData,
				{
					new: true,
				}
			);
			return response;
		} catch (error) {
			console.log("errorS", error);
			throw new Error(
				`${path.resolve(__filename)} Unable to update Address`
			);
		}
	}

	static async getDetailsAddress(idAddress: mongoose.Types.ObjectId) {
		try {
			const AddressExists = await Address.findOne({ _id: idAddress });

			if (!AddressExists) {
				throw new Error("Address not exists!");
			}

			const response = await Address.findById(idAddress);
			return response;
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to get details Address`
			);
		}
	}

	static async getAllAddress(
		limit: number,
		page: number,
		filter: [string, string] | null
	) {
		try {
			const totalAddress = await Address.countDocuments();
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

			const response = await Address.find(queryConditions)
				.limit(limit)
				.skip(limit * (page - 1));

			const plainResponse = response.map((address) => address.toObject());

			return {
				data: plainResponse,
				totals: totalAddress,
				page: page,
				totalPage: Math.ceil(totalAddress / limit),
			};
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to get all Address`
			);
		}
	}

	static async deleteAddress(idAddress: mongoose.Types.ObjectId) {
		try {
			const AddressExists = await Address.findOne({ _id: idAddress });

			if (!AddressExists) {
				throw new Error("Address not exists!");
			}

			const response = await Address.findByIdAndDelete(idAddress);
			if (response) {
				await User.findByIdAndUpdate(response.userId, {
					$pull: { address: response._id },
				});
				return response;
			}
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to delete Address`
			);
		}
	}
}

export { AddressService };
