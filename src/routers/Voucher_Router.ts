import { VoucherController } from "@/controllers/Voucher_Controller";
import {
  Voucher_Validate_Apply,
  Voucher_Validate_Create,
  Voucher_Validate_Update,
} from "@/validates/Voucher_Validate";

import { Router } from "express";
const router = Router();

router.post(
  "/create",
  Voucher_Validate_Create,
  VoucherController.createVoucher
);
router.put(
  "/update/:id",
  Voucher_Validate_Update,
  VoucherController.updateVoucher
);
router.get("/get-details/:id", VoucherController.getDetailsVoucher);
router.get("/get-all", VoucherController.getAllVoucher);
router.delete("/delete/:id", VoucherController.deleteVoucher);
router.post("/apply", Voucher_Validate_Apply, VoucherController.applyVoucher);

export = router;
