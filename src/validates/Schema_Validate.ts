import shopSchema from "../models/Shops_Schema";
import { addressSchemaFields } from "../models/Addresses_Schema";
import { userSchemaFields } from "../models/Users_Schema";

export function UserSchemaValidate() {
    const userArray = Object.keys(userSchemaFields).map(key => ({
        field: key,
        ...(userSchemaFields as any)[key],
    }));
    const requiredFields = userArray.filter(field => field.required === true);
    return requiredFields;
}

export function AddressSchemaValidate() {
    const addressArr = Object.keys(addressSchemaFields).map(key => ({
        field: key,
        ...(addressSchemaFields as any)[key],
    }));
    console.log("Address Validate")
    const requiredFields = addressArr.filter(field => field.required === true);
    return requiredFields
}

export function ShopsSchemaValidate() {
    const shopArr = Object.keys(shopSchema).map(key => ({
        field: key,
        ...(shopSchema as any)[key],
    }));
    console.log("Shop Validate")
    const requiredFields = shopArr.filter(field => field.required === true);
    return requiredFields
}

