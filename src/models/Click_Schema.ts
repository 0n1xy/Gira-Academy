import { IClick } from "@/types/Click_Interface";
import { Schema, model } from "mongoose";

const clickSchema: Schema<IClick> = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  product_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  clickCount: { type: Number, default: 0 },
});

const Click = model<IClick>("Click", clickSchema);

export default Click;
