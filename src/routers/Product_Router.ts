import { createProduct, getAllProducts, getProduct, deleteProduct, updateProduct } from "@/controllers/Products_Controller";
import { Products_Validate_Create, Products_Validate_Update } from "@/validates/Product_Validate";
import { Router } from "express";

const router = Router();

router.post('/create-product', Products_Validate_Create, createProduct)
router.get('/get-all-product', getAllProducts)
router.get('/get-product/:id', Products_Validate_Update, getProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);


export default router;