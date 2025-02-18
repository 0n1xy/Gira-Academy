import { USERID_LENGTH_24 } from "@/constant/Address_Constant";
import { PRODUCTID_LENGTH_24 } from "@/constant/Cart_Constant";

import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const Click_Validate_Form_Create = () => {
  return [
    body("user_id")
      .isLength({ min: USERID_LENGTH_24, max: USERID_LENGTH_24 })
      .withMessage("Please enter a valid userId"),
    body("product_id")
      .isLength({ min: PRODUCTID_LENGTH_24, max: PRODUCTID_LENGTH_24 })
      .withMessage("Please enter a valid productId"),
  ];
};

const Click_Validate_Create = [
  ...Click_Validate_Form_Create(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { Click_Validate_Create };
