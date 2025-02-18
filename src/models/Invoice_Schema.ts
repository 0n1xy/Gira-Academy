import { Schema, model } from "mongoose";
import { IInvoice } from "@/types/Invoice_Interface";

export const invoiceSchemaFields = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productItems: [
    {
      productId: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total_money: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    default: 0,
  },
};

const invoiceSchema = new Schema<IInvoice>(invoiceSchemaFields);

const Invoice = model<IInvoice>("Invoice", invoiceSchema);

export default Invoice;
