import { CartController } from "@/controllers/Cart_Controller";
import {
	Cart_Validate_Create,
	Cart_Validate_Update,
} from "@/validates/Cart_Validate";
import { Router } from "express";
const router = Router();

router.post("/create", Cart_Validate_Create, CartController.createCart);
router.put("/update/:id", Cart_Validate_Update, CartController.updateCart);
router.get("/get-details/:id", CartController.getDetailsCart);
router.get("/get-all", CartController.getAllCart);
router.delete("/delete/:id", CartController.deleteCart);

export = router;
