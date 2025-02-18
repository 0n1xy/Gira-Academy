import {
	BUYER_ADDRESS_LENGTH_3,
	BUYER_NAME_LENGTH_3,
	USERID_LENGTH_24,
} from "@/constant/Address_Constant";
import { Object_Validate } from "@/utils/Check_ObjectId";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const Address_Validate_Form_Create = () => {
	return [
		body("userId")
			.isLength({ min: USERID_LENGTH_24, max: USERID_LENGTH_24 })
			.withMessage("Please enter a valid userId"),
		body("buyer_address")
			.isLength({ min: BUYER_ADDRESS_LENGTH_3 })
			.withMessage("Address must be at least 3 characters long"),
		body("buyer_name")
			.isLength({ min: BUYER_NAME_LENGTH_3 })
			.withMessage("Name must be at least 3 characters long"),
		body("buyer_phone_number")
			.isMobilePhone("any")
			.withMessage("Please enter a valid phone number"),
	];
};

const Address_Validate_Form_Update = () => {
	return [
		body("userId")
			.optional()
			.isLength({ min: USERID_LENGTH_24, max: USERID_LENGTH_24 })
			.withMessage("Please enter a valid userId"),
		body("buyer_address")
			.optional()
			.isLength({ min: BUYER_ADDRESS_LENGTH_3 })
			.withMessage("Address must be at least 3 characters long"),
		body("buyer_name")
			.optional()
			.isLength({ min: BUYER_NAME_LENGTH_3 })
			.withMessage("Name must be at least 3 characters long"),
		body("buyer_phone_number")
			.optional()
			.isMobilePhone("any")
			.withMessage("Please enter a valid phone number"),
	];
};

const Address_Validate_Create = [
	...Address_Validate_Form_Create(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
const Address_Validate_Update = [
	Object_Validate,
	...Address_Validate_Form_Update(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

export { Address_Validate_Create, Address_Validate_Update };
