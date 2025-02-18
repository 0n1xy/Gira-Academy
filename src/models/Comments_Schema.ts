import { IComment } from "@/types/Comment_Interface";
import { Schema, model } from "mongoose";

const commentSchemaField = {
	_id: { type: Schema.Types.ObjectId, required: true },
	user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
	parent_id: { type: Schema.Types.ObjectId, ref: "Comments", default: null },
	review_id: { type: Schema.Types.ObjectId, ref: "Reviews", required: true },
	comment: { type: String, required: true, trim: true },
	images: { type: [String], required: false, trim: true },
	level: { type: Number, required: true }, // Level of the comment (2 or 3)
	replies: [{
		type: Schema.Types.ObjectId,
		ref: "Comments",
	}],
}


const commentSchema = new Schema<IComment>(commentSchemaField)

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
