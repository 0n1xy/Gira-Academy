import { USERID_LENGTH_24 } from "@/constant/Address_Constant";
import {
  COMMISSION_RATE_MIN,
  TOTAL_EARNING_MIN,
} from "@/constant/Affiliate_Constant";

import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const Affiliate_Validate_Form_Create = () => {
  return [
    body("user_id")
      .isLength({ min: USERID_LENGTH_24, max: USERID_LENGTH_24 })
      .withMessage("Please enter a valid userId"),
    body("commission_rate")
      .isFloat({ min: COMMISSION_RATE_MIN })
      .withMessage("Commission rate must be a positive number")
      .notEmpty()
      .withMessage("Commission rate is required"),
    body("total_earnings")
      .isFloat({ min: TOTAL_EARNING_MIN })
      .withMessage("Total earnings must be a non-negative number")
      .optional(),
  ];
};

const Affiliate_Validate_Create = [
  ...Affiliate_Validate_Form_Create(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { Affiliate_Validate_Create };
