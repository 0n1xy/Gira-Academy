import { PASSWORD_LENGTH_6, USERNAME_LENGTH_3 } from "@/constant/User_Constant";
import { Object_Validate } from "@/utils/Check_ObjectId";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const User_Validate_Form_Create = () => {
	return [
		body("email")
			.isEmail()
			.withMessage("Please enter a valid email address")
			.normalizeEmail(),
		body("username")
			.isLength({ min: USERNAME_LENGTH_3 })
			.withMessage("Username must be at least 3 characters long"),
		body("password")
			.isLength({ min: PASSWORD_LENGTH_6 })
			.withMessage("Password must be at least 6 characters long"),
		body("full_name").notEmpty().withMessage("Full name is required"),
		body("phone_number")
			.isMobilePhone("any")
			.withMessage("Please enter a valid phone number"),
		body("gender")
			.isIn(["male", "female", "other"])
			.withMessage("Please select a valid gender"),
		body("dBo").isDate().withMessage("Please enter a valid date of birth"),
	];
};

const User_Validate_Form_Update = () => {
	return [
		body("email")
			.optional()
			.isEmail()
			.withMessage("Please enter a valid email address")
			.normalizeEmail(),
		body("username")
			.optional()
			.isLength({ min: USERNAME_LENGTH_3 })
			.withMessage("Username must be at least 3 characters long"),
		body("password")
			.optional()
			.isLength({ min: PASSWORD_LENGTH_6 })
			.withMessage("Password must be at least 6 characters long"),
		body("full_name")
			.optional()
			.notEmpty()
			.withMessage("Full name is required"),
		body("phone_number")
			.optional()
			.isMobilePhone("any")
			.withMessage("Please enter a valid phone number"),
		body("gender")
			.optional()
			.isIn(["male", "female", "other"])
			.withMessage("Please select a valid gender"),
		body("dBo")
			.optional()
			.isDate()
			.withMessage("Please enter a valid date of birth"),
	];
};

const User_Validate_Create = [
	...User_Validate_Form_Create(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
const User_Validate_Update = [
	Object_Validate,
	...User_Validate_Form_Update(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

export { User_Validate_Create, User_Validate_Update };
