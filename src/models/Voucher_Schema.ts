import { IVoucher } from "@/types/Voucher_Interface";
import { Schema, model } from "mongoose";

const voucherSchema: Schema<IVoucher> = new Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["global", "product", "category"],
    required: true,
  },
  productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  categoryIds: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  expiryDate: { type: Date, required: true },
  usageLimit: { type: Number, required: true },
  usedCount: { type: Number, default: 0 },
  recipientGroup: {
    type: String,
    enum: ["new_users", "loyal_customers", "high_spenders", "potential"],
    required: true,
  },
});

const Voucher = model<IVoucher>("Voucher", voucherSchema);

export default Voucher;
