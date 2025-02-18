import { USERID_LENGTH_24 } from "@/constant/Address_Constant";
import { PRODUCTID_LENGTH_24 } from "@/constant/Cart_Constant";
import { ADDRESSID_LENGTH_24 } from "@/constant/Order_Constant";

import { Object_Validate } from "@/utils/Check_ObjectId";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const Order_Validate_Form_Create = () => {
  return [
    body("user_id")
      .isLength({ min: USERID_LENGTH_24, max: USERID_LENGTH_24 })
      .withMessage("Please enter a valid userId"),
    body("product_id")
      .isLength({ min: PRODUCTID_LENGTH_24, max: PRODUCTID_LENGTH_24 })
      .withMessage("Please enter a valid productId"),
    body("address_id")
      .isLength({ min: ADDRESSID_LENGTH_24, max: ADDRESSID_LENGTH_24 })
      .withMessage("Please enter a valid addressId"),
  ];
};

const Order_Validate_Form_Update = () => {
  return [
    body("user_id")
      .optional()
      .isLength({ min: USERID_LENGTH_24, max: USERID_LENGTH_24 })
      .withMessage("Please enter a valid userId"),
    body("product_id")
      .optional()
      .isLength({ min: PRODUCTID_LENGTH_24, max: PRODUCTID_LENGTH_24 })
      .withMessage("Please enter a valid productId"),
    body("address_id")
      .optional()
      .isLength({ min: ADDRESSID_LENGTH_24, max: ADDRESSID_LENGTH_24 })
      .withMessage("Please enter a valid addressId"),
  ];
};

const Order_Validate_Create = [
  ...Order_Validate_Form_Create(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const Order_Validate_Update = [
  Object_Validate,
  ...Order_Validate_Form_Update(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { Order_Validate_Create, Order_Validate_Update };
