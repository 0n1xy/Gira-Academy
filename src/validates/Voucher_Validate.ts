import {
  VOUCHER_DISCOUNT_MAX,
  VOUCHER_DISCOUNT_MIN,
  VOUCHER_DISCOUNT_USAGE_LIMIT,
} from "@/constant/Voucher_Constant";
import { Object_Validate } from "@/utils/Check_ObjectId";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const Voucher_Validate_Form_Create = () => {
  return [
    body("code")
      .isString()
      .withMessage("Code must be a string")
      .notEmpty()
      .withMessage("Code is required"),
    body("discount")
      .isNumeric()
      .withMessage("Discount must be a number")
      .isInt({ min: VOUCHER_DISCOUNT_MIN, max: VOUCHER_DISCOUNT_MAX })
      .withMessage("Discount must be between 0 and 100"),
    body("type")
      .isIn(["global", "product", "category"])
      .withMessage("Invalid voucher type"),
    body("productIds")
      .optional()
      .isArray()
      .withMessage("ProductIds must be an array")
      .custom((value) => value.every((id: any) => typeof id === "string"))
      .withMessage("Each productId must be a string"),
    body("categoryIds")
      .optional()
      .isArray()
      .withMessage("CategoryIds must be an array")
      .custom((value) => value.every((id: any) => typeof id === "string"))
      .withMessage("Each categoryId must be a string"),
    body("expiryDate")
      .isISO8601()
      .withMessage("Expiry date must be a valid date"),
    body("usageLimit")
      .isInt({ min: VOUCHER_DISCOUNT_USAGE_LIMIT })
      .withMessage("Usage limit must be at least 1"),
    body("recipientGroup")
      .isIn(["new_users", "loyal_customers", "high_spenders", "potential"])
      .withMessage("Invalid voucher recipientGroup"),
  ];
};

const Voucher_Validate_Form_Update = () => {
  return [
    body("code").optional().isString().withMessage("Code must be a string"),
    body("discount")
      .optional()
      .isNumeric()
      .withMessage("Discount must be a number")
      .isInt({ min: VOUCHER_DISCOUNT_MIN, max: VOUCHER_DISCOUNT_MAX })
      .withMessage("Discount must be between 0 and 100"),
    body("type")
      .optional()
      .isIn(["global", "product", "category"])
      .withMessage("Invalid voucher type"),
    body("productIds")
      .optional()
      .isArray()
      .withMessage("ProductIds must be an array")
      .custom((value) => value.every((id: any) => typeof id === "string"))
      .withMessage("Each productId must be a string"),
    body("categoryIds")
      .optional()
      .isArray()
      .withMessage("CategoryIds must be an array")
      .custom((value) => value.every((id: any) => typeof id === "string"))
      .withMessage("Each categoryId must be a string"),
    body("expiryDate")
      .optional()
      .isISO8601()
      .withMessage("Expiry date must be a valid date"),
    body("usageLimit")
      .optional()
      .isInt({ min: VOUCHER_DISCOUNT_USAGE_LIMIT })
      .withMessage("Usage limit must be at least 1"),
    body("recipientGroup")
      .isIn(["new_users", "loyal_customers", "high_spenders", "potential"])
      .withMessage("Invalid voucher recipientGroup"),
  ];
};

const Voucher_Validate_Form_Apply = () => {
  return [
    body("code")
      .isString()
      .withMessage("Code must be a string")
      .notEmpty()
      .withMessage("Code is required"),
    body("productId")
      .optional()
      .isString()
      .withMessage("ProductId must be a string"),
    body("categoryId")
      .optional()
      .isString()
      .withMessage("CategoryId must be a string"),
  ];
};

const Voucher_Validate_Create = [
  ...Voucher_Validate_Form_Create(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const Voucher_Validate_Update = [
  Object_Validate,
  ...Voucher_Validate_Form_Update(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const Voucher_Validate_Apply = [
  ...Voucher_Validate_Form_Apply(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export {
  Voucher_Validate_Apply,
  Voucher_Validate_Create,
  Voucher_Validate_Update,
};
