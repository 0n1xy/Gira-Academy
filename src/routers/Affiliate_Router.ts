import { AffiliateController } from "@/controllers/Affiliate_Controller";
import { Affiliate_Validate_Create } from "@/validates/Affiliate_Validate";
import { Router } from "express";
const router = Router();

router.post(
  "/create",
  Affiliate_Validate_Create,
  AffiliateController.createAffiliate
);
router.post(
  "/calculate-commission/:orderId",
  AffiliateController.calculateCommission
);

export = router;
