import { i18n } from "@/constant/I18n_Constant";
import { AffiliateService } from "@/services/Affiliate_Service";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { KafkaService } from "@/services/Kafka_Service"; // ✅ Import Kafka

const kafkaService = new KafkaService();
// ✅ Kết nối Kafka khi khởi chạy

const AffiliateController = {
  createAffiliate: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    try {
      const response = await AffiliateService.createAffiliate(req.body);
      if (response) {
        await kafkaService.connectProducer();
        // ✅ Gửi sự kiện tạo affiliate tới Kafka
        await kafkaService.sendMessage("affiliate_created", {
          affiliateId: response._id,
          name: response.name,
          email: response.email,
          commission_rate: response.commission_rate,
        });

        return res.status(200).json({
          status: 200,
          message: i18n[lang].AFFILIATE_CREATE_SUCCESS,
          data: response,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: i18n[lang].AFFILIATE_CREATE_FAILED,
        error: error,
      });
    }
  },

  calculateCommission: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    try {
      const orderId = new mongoose.Types.ObjectId(req.params.id);
      const response = await AffiliateService.calculateCommission(orderId);

      if (!response) {
        return res.status(400).json({
          status: 400,
          message: i18n[lang].AFFILIATE_CREATE_FAILED,
          error: "Service did not return a valid response",
        });
      }

      // ✅ Gửi sự kiện tính hoa hồng thành công tới Kafka
      await kafkaService.sendMessage("commission_calculated", {
        orderId: orderId.toString(),
        commissionAmount: response.data.commissionAmount,
        affiliateId: response.data.affiliateId,
      });

      return res.status(200).json({
        status: 200,
        message: i18n[lang].COMMISSION_CALCULATE_SUCCESS,
        data: response.data,
      });
    } catch (error) {
      console.error("Error in calculateCommission controller:", error);
      return res.status(400).json({
        status: 400,
        message: i18n[lang].INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  },

  handleClick: async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"] ?? "en";
    try {
      const productId = new mongoose.Types.ObjectId(req.params.productId);
      const { userId } = req.body;

      const response = await AffiliateService.handleClick(userId, productId);

      if (!response.success) {
        return res.status(400).json({
          status: 400,
          message: i18n[lang].CLICK_FAILED,
          error: response.message,
        });
      }

      // ✅ Gửi sự kiện click affiliate tới Kafka
      await kafkaService.sendMessage("affiliate_click", {
        userId,
        productId: productId.toString(),
        timestamp: new Date().toISOString(),
      });

      return res.status(200).json({
        status: 200,
        message: i18n[lang].CLICK_SUCCESS,
        data: response.data,
      });
    } catch (error) {
      console.error("Error in handleClick controller:", error);
      return res.status(400).json({
        status: 400,
        message: i18n[lang].CLICK_FAILED,
        error: error,
      });
    }
  },
};

export { AffiliateController };
