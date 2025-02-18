import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { CATEGORY_NAME_100 } from "@/constant/Categories_Constant";

// Regular expression to validate base64 strings (basic validation)
const base64Regex = /^data:image\/(jpeg|jpg|png);base64,[a-zA-Z0-9+/=]+$/;
const Category_Validate = () => [
    body('name')
        .notEmpty()
        .isString()
        .withMessage('Please enter a valid category name')
        .isLength({ max: CATEGORY_NAME_100 })
        .withMessage(`Category name should not exceed ${CATEGORY_NAME_100} characters`),
    body('description')
        .notEmpty()
        .isString()
        .withMessage('Please enter a valid description'),
    body('image')
        .optional()
        .isString()
        .matches(base64Regex)
        .withMessage('Image must be a valid base64-encoded string'),
];

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const Categories_Validate_Create = [
    ...Category_Validate(),
    validate,
];

const Categories_Validate_Update = [
    ...Category_Validate(),
    validate,
];

export { Categories_Validate_Create, Categories_Validate_Update };
