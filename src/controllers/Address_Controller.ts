import { i18n } from "@/constant/I18n_Constant";
import { AddressService } from "@/services/Address_Service";
import { Request, Response } from "express";
import mongoose from "mongoose";

const AddressController = {
	createAddress: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const response = await AddressService.createAddress(req.body);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].ADDRESS_CREATE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: i18n[lang].ADDRESS_CREATE_FAILED,
				error: error,
			});
		}
	},

	updateAddress: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const AddressId = new mongoose.Types.ObjectId(req.params.id);
			const response = await AddressService.updateAddress(
				AddressId,
				req.body
			);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].ADDRESS_UPDATE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].ADDRESS_UPDATE_FAILED,
				error: error,
			});
		}
	},

	getDetailsAddress: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const AddressId = new mongoose.Types.ObjectId(req.params.id);
			const response = await AddressService.getDetailsAddress(AddressId);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].ADDRESS_GET_DETAILS_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].ADDRESS_GET_DETAILS_FAILED,
				error: error,
			});
		}
	},

	getAllAddress: async (req: Request, res: Response) => {
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

			const response = await AddressService.getAllAddress(
				Number(limit),
				Number(page),
				parsedFilter
			);

			if (response) {
				const plainData = response.data.map((Address: any) =>
					Address.toObject ? Address.toObject() : Address
				);

				return res.status(200).json({
					status: 200,
					message: i18n[lang].ADDRESS_GET_ALL_SUCCESS,
					data: plainData,
					totals: response.totals,
					page: response.page,
					totalPage: response.totalPage,
				});
			}
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: i18n[lang].ADDRESS_GET_ALL_FAILED,
				error: error,
			});
		}
	},

	deleteAddress: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const AddressId = new mongoose.Types.ObjectId(req.params.id);
			const response = await AddressService.deleteAddress(AddressId);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].ADDRESS_DELETE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].ADDRESS_DELETE_FAILED,
				error: error,
			});
		}
	},
};

export { AddressController };
