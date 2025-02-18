import Cart from "@/models/Cart_Schema";
import { ICart } from "@/types/Cart_Interface";
import mongoose from "mongoose";
import path from "path";

class CartService {
	static async createCart(CartData: ICart) {
		try {
			const savedCart = await Cart.create(CartData);
			return savedCart;
		} catch (error) {
			console.log("errorS", error);
			throw new Error(
				`${path.resolve(__filename)} Unable to create Cart`
			);
		}
	}

	static async updateCart(idCart: mongoose.Types.ObjectId, CartData: ICart) {
		try {
			const CartExists = await Cart.findOne({ _id: idCart });

			if (!CartExists) {
				throw new Error("Cart not exists!");
			}

			const response = await Cart.findByIdAndUpdate(idCart, CartData, {
				new: true,
			});
			return response;
		} catch (error) {
			console.log("errorS", error);
			throw new Error(
				`${path.resolve(__filename)} Unable to update Cart`
			);
		}
	}

	static async getDetailsCart(idCart: mongoose.Types.ObjectId) {
		try {
			const CartExists = await Cart.findOne({ _id: idCart });

			if (!CartExists) {
				throw new Error("Cart not exists!");
			}

			const response = await Cart.findById(idCart);
			return response;
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to get details Cart`
			);
		}
	}

	static async getAllCart(
		limit: number,
		page: number,
		filter: [string, string] | null
	) {
		try {
			const totalCart = await Cart.countDocuments();
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

			const response = await Cart.find(queryConditions)
				.limit(limit)
				.skip(limit * (page - 1));

			const plainResponse = response.map((Cart) => Cart.toObject());

			return {
				data: plainResponse,
				totals: totalCart,
				page: page,
				totalPage: Math.ceil(totalCart / limit),
			};
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to get all Cart`
			);
		}
	}

	static async deleteCart(idCart: mongoose.Types.ObjectId) {
		try {
			const CartExists = await Cart.findOne({ _id: idCart });

			if (!CartExists) {
				throw new Error("Cart not exists!");
			}

			const response = await Cart.findByIdAndDelete(idCart);
			return response;
		} catch (error) {
			throw new Error(
				`${path.resolve(__filename)} Unable to delete Cart`
			);
		}
	}
}

export { CartService };
