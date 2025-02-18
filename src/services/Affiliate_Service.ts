import Affiliate from "@/models/Affiliate_Schema";
import Click from "@/models/Click_Schema";
import Order from "@/models/Order_Schema";
import { IAffiliate } from "@/types/Affiliate_Interface";
import mongoose from "mongoose";

class AffiliateService {
  static async createAffiliate(AffiliateData: IAffiliate) {
    try {
      const savedAffiliate = await Affiliate.create(AffiliateData);

      return savedAffiliate;
    } catch (error) {
      console.log("errorS", error);
    }
  }

  static async calculateCommission(orderId: mongoose.Types.ObjectId) {
    try {
      const order = await Order.findById(orderId)
        .populate("affiliate_id")
        .exec();

      if (!order) {
        return { success: false, message: "Order does not exist!" };
      }

      if (!order.affiliate_id) {
        return {
          success: false,
          message: "Affiliate not found for this order!",
        };
      }

      const affiliate = await Affiliate.findById(order.affiliate_id._id).exec();

      if (!affiliate) {
        return {
          success: false,
          message: "Affiliate not found!",
        };
      }

      const commission = (order.amount * affiliate.commission_rate) / 100;

      affiliate.total_earnings += commission;
      await affiliate.save();

      return {
        success: true,
        message: "Commission calculated successfully!",
        data: affiliate,
      };
    } catch (error) {
      console.error("Error calculating commission:", error);
    }
  }

  static async handleClick(
    userId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let click = await Click.findOne({ userId, productId }).session(session);

      if (!click) {
        click = new Click({ userId, productId, clickCount: 0 });
      }

      if (click.clickCount >= 2) {
        await session.abortTransaction();
        session.endSession();
        return {
          success: false,
          message:
            "User has exceeded the maximum number of clicks for this product!",
        };
      }

      click.clickCount += 1;
      await click.save({ session });

      const affiliate = await Affiliate.findOne({ userId }).session(session);
      if (affiliate) {
        const commission = 1000;
        affiliate.total_earnings += commission;
        await affiliate.save({ session });
      }

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        message: "Click handled and commission calculated successfully!",
        data: click,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error handling click:", error);
      return {
        success: false,
        message: "An error occurred while handling the click.",
      };
    }
  }
}

export { AffiliateService };
