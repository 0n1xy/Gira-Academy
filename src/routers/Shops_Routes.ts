import { Router, Request, Response } from 'express';

import { getShopPage, createShop, updateShop, viewShop, deleteShop, searchShop } from '@/controllers/Shops_Controller';
import { Shop_Validate_Create, Shop_Validate_Update, Shop_Validate } from '@/validates/Shop_Validate';
import { body, validationResult } from "express-validator";

const router = Router();

router.post("/add-shop", Shop_Validate_Create, createShop);
router.patch("/update-shop/:id", Shop_Validate_Update, updateShop);
router.delete("/delete-shop/:id", deleteShop);
router.patch("/search-shop", searchShop)
router.get("/view-shop/:id", viewShop);


export default router;