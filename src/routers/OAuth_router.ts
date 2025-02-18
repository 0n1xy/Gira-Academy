import { login, getAccessToken } from "@/controllers/Auth_Controller";
import { Router } from "express";
const router: Router = Router();


router.get('/tiktok', login)
router.get('/tiktok/callback/', getAccessToken)


export default router;