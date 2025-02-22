import { AddressController } from "@/controllers/Address_Controller";
import {
  Address_Validate_Create,
  Address_Validate_Update,
} from "@/validates/Address_Validate";
import { Router } from "express";
const router = Router();

router.post(
  "/create",
  Address_Validate_Create,
  AddressController.createAddress
);
router.put(
  "/update/:id",
  Address_Validate_Update,
  AddressController.updateAddress
);
router.get("/get-details/:id", AddressController.getDetailsAddress);
router.get("/get-all", AddressController.getAllAddress);
router.delete("/delete/:id", AddressController.deleteAddress);

export = router;
