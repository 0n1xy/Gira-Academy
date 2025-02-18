import { i18n } from "@/constant/I18n_Constant";
import { OrderService } from "@/services/Order_Service";

import { Request, Response } from "express";
import mongoose from "mongoose";

const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const response = await OrderService.createOrder(req.body);

    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].ORDER_CREATE_SUCCESS,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].ORDER_CREATE_FAILED,
        error: response.message,
      });
    }
  },

  updateOrder: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const OrderId = new mongoose.Types.ObjectId(req.params.id);
    const response = await OrderService.updateOrder(OrderId, req.body);

    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].ORDER_UPDATE_SUCCESS,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].ORDER_UPDATE_FAILED,
        error: response.message,
      });
    }
  },

  getDetailsOrder: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const OrderId = new mongoose.Types.ObjectId(req.params.id);
    const response = await OrderService.getDetailsOrder(OrderId);

    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].ORDER_GET_DETAILS_SUCCESS,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].ORDER_GET_DETAILS_FAILED,
        error: response.message,
      });
    }
  },

  getAllOrder: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const { limit, page, filter } = req.query;

    let parsedFilter: [string, string] | null = null;
    if (filter && typeof filter === "string") {
      const filterParts = filter.split(",");
      if (filterParts.length === 2) {
        parsedFilter = [filterParts[0], filterParts[1]];
      }
    }

    const response = await OrderService.getAllOrder(
      Number(limit),
      Number(page),
      parsedFilter
    );

    if (response.success && response.data) {
      const plainData = response.data.map((Order: any) =>
        Order.toObject ? Order.toObject() : Order
      );

      return res.status(200).json({
        status: 200,
        message: i18n[lang].ORDER_GET_ALL_SUCCESS,
        data: plainData,
        totals: response.totals,
        page: response.page,
        totalPage: response.totalPage,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].ORDER_GET_ALL_FAILED,
        error: response.message,
      });
    }
  },

  deleteOrder: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    const OrderId = new mongoose.Types.ObjectId(req.params.id);
    const response = await OrderService.deleteOrder(OrderId);

    if (response.success) {
      return res.status(200).json({
        status: 200,
        message: i18n[lang].ORDER_DELETE_SUCCESS,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].ORDER_DELETE_FAILED,
        error: response.message,
      });
    }
  },
};

export { OrderController };
