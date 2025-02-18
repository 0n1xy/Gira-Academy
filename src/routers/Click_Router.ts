import { AffiliateController } from "@/controllers/Affiliate_Controller";
import { Click_Validate_Create } from "@/validates/Click_Validate";
import express from "express";

const router = express.Router();

router.post(
  "/click/:productId",
  Click_Validate_Create,
  AffiliateController.handleClick
);

export default router;
