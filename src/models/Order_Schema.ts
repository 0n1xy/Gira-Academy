import { IOrder } from "@/types/Order_Interface";
import { Schema, model } from "mongoose";

const orderSchema: Schema<IOrder> = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  affiliate_id: { type: Schema.Types.ObjectId, ref: "Affiliate" },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
