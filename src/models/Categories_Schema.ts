import { Schema, model } from "mongoose";
import { ICategory } from "@/types/Category_Interface";
import { CATEGORY_NAME_100 } from "@/constant/Categories_Constant";


const categorySchemaFields =
{
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxLength: CATEGORY_NAME_100
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}


const categorySchema = new Schema<ICategory>(categorySchemaFields)

const Category = model<ICategory>("Category", categorySchema)

export default Category