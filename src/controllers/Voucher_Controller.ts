import { i18n } from "@/constant/I18n_Constant";
import { VoucherService } from "@/services/Voucher_Service";

import { Request, Response } from "express";
import mongoose from "mongoose";

const VoucherController = {
  createVoucher: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const response = await VoucherService.createVoucher(req.body);
    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].VOUCHER_CREATE_SUCCESS,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].VOUCHER_CREATE_FAILED,
        error: response.message,
      });
    }
  },

  updateVoucher: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const VoucherId = new mongoose.Types.ObjectId(req.params.id);
    const response = await VoucherService.updateVoucher(VoucherId, req.body);
    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].VOUCHER_UPDATE_SUCCESS,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].VOUCHER_UPDATE_FAILED,
        error: response.message,
      });
    }
  },

  getDetailsVoucher: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const VoucherId = new mongoose.Types.ObjectId(req.params.id);
    const response = await VoucherService.getDetailsVoucher(VoucherId);
    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].VOUCHER_GET_DETAILS_SUCCESS,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].VOUCHER_GET_DETAILS_FAILED,
        error: response.message,
      });
    }
  },

  getAllVoucher: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const { limit, page, filter } = req.query;

    let parsedFilter: [string, string] | null = null;
    if (filter && typeof filter === "string") {
      const filterParts = filter.split(",");
      if (filterParts.length === 2) {
        parsedFilter = [filterParts[0], filterParts[1]];
      }
    }

    const response = await VoucherService.getAllVoucher(
      Number(limit),
      Number(page),
      parsedFilter
    );

    if (response.success && response.data) {
      const plainData = response.data.map((Voucher: any) =>
        Voucher.toObject ? Voucher.toObject() : Voucher
      );

      return res.status(200).json({
        status: 200,
        message: i18n[lang].VOUCHER_GET_ALL_SUCCESS,
        data: plainData,
        totals: response.totals,
        page: response.page,
        totalPage: response.totalPage,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].VOUCHER_GET_ALL_FAILED,
        error: response.message,
      });
    }
  },

  deleteVoucher: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const VoucherId = new mongoose.Types.ObjectId(req.params.id);
    const response = await VoucherService.deleteVoucher(VoucherId);
    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].VOUCHER_DELETE_SUCCESS,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].VOUCHER_DELETE_FAILED,
        error: response.message,
      });
    }
  },

  applyVoucher: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const { code, productId, categoryId, recipientGroup } = req.body;

    const response = await VoucherService.applyVoucher(
      code,
      productId,
      categoryId,
      recipientGroup
    );
    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].VOUCHER_APPLY_SUCCESS,
        data: response,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].VOUCHER_APPLY_FAILED,
        error: response.message,
      });
    }
  },
};

export { VoucherController };
