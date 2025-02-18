import { Schema, model } from "mongoose";
import { IShop } from "@/types/Shops_Interface";

export const ShopsSchemaFields = {
  _id: Schema.Types.ObjectId,
  manager_id:{ type: Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  images: { type: [String], default: [], required: true },
};

const shopSchema = new Schema<IShop>(ShopsSchemaFields);

const ShopsModel = model<IShop>("Shops", shopSchema);

export default ShopsModel;
