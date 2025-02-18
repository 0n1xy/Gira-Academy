import { Schema, model } from "mongoose";
import { IsellerInfos } from "@/types/Seller_Interface";

export const sellerInfosSchema: Schema<IsellerInfos> = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
})

const SellerInfos = model<IsellerInfos>("SellerInfos", sellerInfosSchema)

export default SellerInfos