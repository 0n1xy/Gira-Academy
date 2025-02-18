import { Schema, model } from "mongoose";
import { IAddresses } from "@/types/Addresses_Interface";
import { USERNAME_100 } from "../constant/User_Constant";

export const addressSchemaFields = {
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyer_address: {
        type: String,
        required: true
    },
    buyer_name: {
        type: String,
        required: true,
        maxlength: USERNAME_100
    },
    buyer_phone_number: {
        type: String,
        required: true
    }
};

const addressSchema = new Schema<IAddresses>(addressSchemaFields);


const Address = model<IAddresses>("Address", addressSchema);

export default Address;
