import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "@/controllers/Category_Controller";
import { Categories_Validate_Create, Categories_Validate_Update } from "@/validates/Category_Validate";
import { Router } from "express";

const router = Router();

router.post('/create-category', Categories_Validate_Create, createCategory)
router.get('/get-all-category', getAllCategories)
router.get('/get-category/:id', getCategory);
router.put('/update-category/:id', Categories_Validate_Update, updateCategory);
router.delete('/delete-category/:id', deleteCategory);


export default router;