import { Schema, model } from "mongoose";
import { IProduct } from "@/types/Products_Interface";

const ProductsSchema = new Schema<IProduct>({
    _id: Schema.Types.ObjectId,
    category_id: { type: Schema.Types.ObjectId, required: true },
    shop_id: { type: Schema.Types.ObjectId, required: true },
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    colors: { type: [String], required: true },
    sizes: { type: [String], required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [String], required: true },
}, { timestamps: true });

const ProductsModel = model<IProduct>("Product", ProductsSchema);

export default ProductsModel;