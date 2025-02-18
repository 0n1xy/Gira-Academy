import { UserController } from "@/controllers/User_Controller";
import { User_Validate_Create } from "@/validates/User_Validate";
import { Router } from "express";
import passport from "passport";
import {GoogleAuthController} from "@/controllers/Google_Auth_Controller";
const router = Router();

router.get("/callback", 
    // GoogleAuthController.CallBack,
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/login'
    })
);

router.get("/login", 
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        prompt: 'select_account'
    })
);

export = router;