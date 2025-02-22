import mongoose from "mongoose";

const AffiliateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  commission_rate: { type: Number, required: true, default: 0 }, // ✅ Đặt giá trị mặc định
});

const Affiliate =
  mongoose.models.Affiliate || mongoose.model("Affiliate", AffiliateSchema);
export default Affiliate;
