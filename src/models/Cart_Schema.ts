import { ICart } from "@/types/Cart_Interface";
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const CartSchema: Schema<ICart> = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product_id: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 0 },
});

const Cart = model<ICart>("Cart", CartSchema);

export default Cart;
