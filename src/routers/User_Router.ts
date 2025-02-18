import { UserController } from "@/controllers/User_Controller";
import {
	User_Validate_Create,
	User_Validate_Update,
} from "@/validates/User_Validate";
import { Router } from "express";
const router = Router();

router.post("/register", User_Validate_Create);

router.post("/login", UserController.loginUser);
router.put("/update/:id", User_Validate_Update, UserController.updateUser);
router.get("/get-details/:id", UserController.getDetailsUser);
router.get("/get-all", UserController.getAllUser);
router.delete("/delete/:id", UserController.deleteUser);
router.post("/logout", UserController.logoutUser);
router.patch("/search", UserController.searchUser);
export = router;
