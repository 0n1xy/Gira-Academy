import express, { Request, Response } from "express";
import {
  calculateTotalPrice,
  handleCancelPayment,
  handleSuccessPayment,
} from "../controllers/Checkout_Controller";

const router = express.Router();

router.post("/checkout", calculateTotalPrice);

router.get("/success", handleSuccessPayment);

router.get("/cancel", handleCancelPayment);

export default router;
