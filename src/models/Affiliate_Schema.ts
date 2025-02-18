import { IAffiliate } from "@/types/Affiliate_Interface";
import { Schema, model } from "mongoose";

const AffiliateSchema: Schema<IAffiliate> = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  commission_rate: { type: Number, required: true },
  total_earnings: { type: Number, default: 0 },
});

const Affiliate = model<IAffiliate>("Affiliate", AffiliateSchema);

export default Affiliate;
