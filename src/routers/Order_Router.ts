import { OrderController } from "@/controllers/Order_Controller";
import {
  Order_Validate_Create,
  Order_Validate_Update,
} from "@/validates/Order_Validate";

import { Router } from "express";
const router = Router();

router.post("/create", Order_Validate_Create, OrderController.createOrder);
router.put("/update/:id", Order_Validate_Update, OrderController.updateOrder);
router.get("/get-details/:id", OrderController.getDetailsOrder);
router.get("/get-all", OrderController.getAllOrder);
router.delete("/delete/:id", OrderController.deleteOrder);

export = router;
