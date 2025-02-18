import Order from "@/models/Order_Schema";
import { IOrder } from "@/types/Order_Interface";
import mongoose from "mongoose";
import path from "path";

class OrderService {
  static async createOrder(OrderData: IOrder) {
    try {
      const savedOrder = await Order.create(OrderData);
      return { success: true, data: savedOrder };
    } catch (error) {
      console.log("errorS", error);
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to create Order`,
      };
    }
  }

  static async updateOrder(
    idOrder: mongoose.Types.ObjectId,
    OrderData: IOrder
  ) {
    try {
      const OrderExists = await Order.findOne({ _id: idOrder });

      if (!OrderExists) {
        return { success: false, message: "Order not exists!" };
      }

      const response = await Order.findByIdAndUpdate(idOrder, OrderData, {
        new: true,
      });
      return { success: true, data: response };
    } catch (error) {
      console.log("errorS", error);
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to update Order`,
      };
    }
  }

  static async getDetailsOrder(idOrder: mongoose.Types.ObjectId) {
    try {
      const OrderExists = await Order.findOne({ _id: idOrder });

      if (!OrderExists) {
        return { success: false, message: "Order not exists!" };
      }

      const response = await Order.findById(idOrder);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to get details Order`,
      };
    }
  }

  static async getAllOrder(
    limit: number,
    page: number,
    filter: [string, string] | null
  ) {
    try {
      const totalOrder = await Order.countDocuments();
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

      const response = await Order.find(queryConditions)
        .limit(limit)
        .skip(limit * (page - 1));

      const plainResponse = response.map((Order) => Order.toObject());

      return {
        success: true,
        data: plainResponse,
        totals: totalOrder,
        page: page,
        totalPage: Math.ceil(totalOrder / limit),
      };
    } catch (error) {
      console.error("error", error);
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to get all Order`,
      };
    }
  }

  static async deleteOrder(idOrder: mongoose.Types.ObjectId) {
    try {
      const OrderExists = await Order.findOne({ _id: idOrder });

      if (!OrderExists) {
        return { success: false, message: "Order does not exist!" };
      }

      const response = await Order.findByIdAndDelete(idOrder);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: `${path.resolve(__filename)} Unable to delete Order`,
      };
    }
  }
}

export { OrderService };
