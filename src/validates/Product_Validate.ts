import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const ObjectId = require('mongoose').Types.ObjectId;

const isValidObjectId = (value: string) => {
    return ObjectId.isValid(value);
};

const Product_Validate = () => [
    body('productName')
        .notEmpty()
        .isString()
        .withMessage('Please enter a valid product name'),
    body('description')
        .notEmpty()
        .isString()
        .withMessage('Please enter a valid description'),
    body('colors')
        .optional()
        .isArray()
        .withMessage('Colors should be an array'),
    body('sizes')
        .optional()
        .isArray()
        .withMessage('Sizes should be an array'),
    body('price')
        .notEmpty()
        .isFloat({ gt: 0 })
        .withMessage('Please enter a valid price'),
    body('quantity')
        .notEmpty()
        .isInt({ gt: 0 })
        .withMessage('Please enter a valid quantity'),

];

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const Products_Validate_Create = [
    ...Product_Validate(),

    validate,
];

const Products_Validate_Update = [
    ...Product_Validate(),
    validate,
];

export { Products_Validate_Create, Products_Validate_Update };
