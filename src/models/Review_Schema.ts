import { STAR_RATING_3 } from "@/constant/Review_Constant";
import { IReview } from "@/types/Review_Interface";
import { Schema, model } from "mongoose";

const reviewSchemaFields = {
	_id: { type: Schema.Types.ObjectId, required: true },
	user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
	product_id: { type: Schema.Types.ObjectId, required: true, ref: "Products" },
	comment: { type: String, required: true },
	images: { type: [String], required: false },
	comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
	starRating: { type: Number, required: true, default: STAR_RATING_3 },
}

const reviewSchema = new Schema<IReview>(reviewSchemaFields)



const Review = model<IReview>("Review", reviewSchema);

export default Review;
