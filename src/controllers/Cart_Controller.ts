import { i18n } from "@/constant/I18n_Constant";
import { CartService } from "@/services/Cart_Service";
import { Request, Response } from "express";
import mongoose from "mongoose";

const CartController = {
	createCart: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const response = await CartService.createCart(req.body);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].CART_CREATE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: i18n[lang].CART_CREATE_FAILED,
				error: error,
			});
		}
	},

	updateCart: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const CartId = new mongoose.Types.ObjectId(req.params.id);
			const response = await CartService.updateCart(CartId, req.body);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].CART_UPDATE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].CART_UPDATE_FAILED,
				error: error,
			});
		}
	},

	getDetailsCart: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const CartId = new mongoose.Types.ObjectId(req.params.id);
			const response = await CartService.getDetailsCart(CartId);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].CART_GET_DETAILS_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].CART_GET_DETAILS_FAILED,
				error: error,
			});
		}
	},

	getAllCart: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const { limit, page, filter } = req.query;

			let parsedFilter: [string, string] | null = null;
			if (filter && typeof filter === "string") {
				const filterParts = filter.split(",");
				if (filterParts.length === 2) {
					parsedFilter = [filterParts[0], filterParts[1]];
				}
			}

			const response = await CartService.getAllCart(
				Number(limit),
				Number(page),
				parsedFilter
			);

			if (response) {
				const plainData = response.data.map((Cart: any) =>
					Cart.toObject ? Cart.toObject() : Cart
				);

				return res.status(200).json({
					status: 200,
					message: i18n[lang].CART_GET_ALL_SUCCESS,
					data: plainData,
					totals: response.totals,
					page: response.page,
					totalPage: response.totalPage,
				});
			}
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: i18n[lang].CART_GET_ALL_FAILED,
				error: error,
			});
		}
	},

	deleteCart: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const CartId = new mongoose.Types.ObjectId(req.params.id);
			const response = await CartService.deleteCart(CartId);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].CART_DELETE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].CART_DELETE_FAILED,
				error: error,
			});
		}
	},
};

export { CartController };
