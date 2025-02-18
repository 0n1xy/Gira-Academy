import Voucher from "@/models/Voucher_Schema";
import { IVoucher } from "@/types/Voucher_Interface";
import mongoose from "mongoose";
import path from "path";

class VoucherService {
  static async createVoucher(VoucherData: IVoucher) {
    try {
      const savedVoucher = await Voucher.create(VoucherData);
      return { success: true, data: savedVoucher };
    } catch (error) {
      console.log("errorS", error);
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to create Voucher`,
      };
    }
  }

  static async updateVoucher(
    idVoucher: mongoose.Types.ObjectId,
    VoucherData: IVoucher
  ) {
    try {
      const VoucherExists = await Voucher.findOne({ _id: idVoucher });

      if (!VoucherExists) {
        return { success: false, message: "Voucher not found" };
      }

      const response = await Voucher.findByIdAndUpdate(idVoucher, VoucherData, {
        new: true,
      });
      return { success: true, data: response };
    } catch (error) {
      console.log("errorS", error);
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to update Voucher`,
      };
    }
  }

  static async getDetailsVoucher(idVoucher: mongoose.Types.ObjectId) {
    try {
      const VoucherExists = await Voucher.findOne({ _id: idVoucher });

      if (!VoucherExists) {
        return { success: false, message: "Voucher not found" };
      }

      const response = await Voucher.findById(idVoucher);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to get details Voucher`,
      };
    }
  }

  static async getAllVoucher(
    limit: number,
    page: number,
    filter: [string, string] | null
  ) {
    try {
      const totalVoucher = await Voucher.countDocuments();
      const queryConditions: { [key: string]: any } = {};
      if (filter) {
        queryConditions[filter[0]] = {
          $regex: filter[1],
          $options: "i",
        };
      }

      if (!Number.isInteger(page) || page < 1) {
        return {
          success: false,
          message: "Page must be an integer and greater than 0",
        };
      }

      const response = await Voucher.find(queryConditions)
        .limit(limit)
        .skip(limit * (page - 1));

      const plainResponse = response.map((Voucher) => Voucher.toObject());

      return {
        success: true,
        data: plainResponse,
        totals: totalVoucher,
        page: page,
        totalPage: Math.ceil(totalVoucher / limit),
      };
    } catch (error) {
      console.error("error", error);
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to get all Voucher`,
      };
    }
  }

  static async deleteVoucher(idVoucher: mongoose.Types.ObjectId) {
    try {
      const VoucherExists = await Voucher.findOne({ _id: idVoucher });

      if (!VoucherExists) {
        return { success: false, message: "Voucher not found" };
      }

      const response = await Voucher.findByIdAndDelete(idVoucher);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to delete Voucher`,
      };
    }
  }

  static async applyVoucher(
    code: string,
    productId?: string,
    categoryId?: string,
    recipientGroup?: string
  ) {
    try {
      const voucher = await Voucher.findOne({ code });

      if (!voucher) {
        return { success: false, message: "Voucher not found" };
      }

      if (voucher.expiryDate < new Date()) {
        return { success: false, message: "Voucher expired" };
      }

      if (voucher.usedCount >= voucher.usageLimit) {
        return {
          success: false,
          message: "Voucher usage limit reached",
        };
      }

      if (
        voucher.type === "product" &&
        productId &&
        !voucher.productIds?.includes(productId)
      ) {
        return {
          success: false,
          message: "Voucher not applicable for this product",
        };
      }

      if (
        voucher.type === "category" &&
        categoryId &&
        !voucher.categoryIds?.includes(categoryId)
      ) {
        return {
          success: false,
          message: "Voucher not applicable for this category",
        };
      }

      if (
        voucher.recipientGroup &&
        recipientGroup &&
        voucher.recipientGroup !== recipientGroup
      ) {
        return {
          success: false,
          message: "Voucher not applicable for this recipient group",
        };
      }

      voucher.usedCount += 1;
      const updatedVoucher = await Voucher.findOneAndUpdate(
        { _id: voucher._id, __v: voucher.__v },
        { $set: { usedCount: voucher.usedCount }, $inc: { __v: 1 } },
        { new: true }
      );

      if (!updatedVoucher) {
        return {
          success: false,
          message: "Failed to apply voucher due to concurrent updates",
        };
      }

      return { success: true, discount: voucher.discount };
    } catch (error) {
      console.log("error", error);
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to apply Voucher`,
      };
    }
  }
}

export { VoucherService };
