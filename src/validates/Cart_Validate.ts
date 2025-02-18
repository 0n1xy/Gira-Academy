import { USERID_LENGTH_24 } from "@/constant/Address_Constant";
import { BUY_QUANTITY_1, PRODUCTID_LENGTH_24 } from "@/constant/Cart_Constant";
import { Object_Validate } from "@/utils/Check_ObjectId";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const Cart_Validate_Form_Create = () => {
	return [
		body("user_id")
			.isLength({ min: USERID_LENGTH_24, max: USERID_LENGTH_24 })
			.withMessage("Please enter a valid userId"),
		body("product_id")
			.isLength({ min: PRODUCTID_LENGTH_24, max: PRODUCTID_LENGTH_24 })
			.withMessage("Please enter a valid productId"),
		body("quantity")
			.isLength({ min: BUY_QUANTITY_1 })
			.withMessage("Name must be at least 3 characters long"),
	];
};

const Cart_Validate_Form_Update = () => {
	return [
		body("user_id")
			.optional()
			.isLength({ min: USERID_LENGTH_24, max: USERID_LENGTH_24 })
			.withMessage("Please enter a valid userId"),
		body("product_id")
			.optional()
			.isLength({ min: PRODUCTID_LENGTH_24, max: PRODUCTID_LENGTH_24 })
			.withMessage("Please enter a valid productId"),
		body("quantity")
			.optional()
			.isLength({ min: BUY_QUANTITY_1 })
			.withMessage("Name must be at least 3 characters long"),
	];
};

const Cart_Validate_Create = [
	...Cart_Validate_Form_Create(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
const Cart_Validate_Update = [
	Object_Validate,
	...Cart_Validate_Form_Update(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

export { Cart_Validate_Create, Cart_Validate_Update };
