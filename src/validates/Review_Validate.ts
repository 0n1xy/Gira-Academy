import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const isValidObjectId = (value: string) => {
    return mongoose.Types.ObjectId.isValid(value);
};

const validateReview = () => [
    body('userId')
        .notEmpty()
        .custom(isValidObjectId)
        .withMessage('Please enter a valid user ID'),
    body('productId')
        .notEmpty()
        .custom(isValidObjectId)
        .withMessage('Please enter a valid product ID'),
    body('comment')
        .notEmpty()
        .isString()
        .withMessage('Please enter a valid comment'),
    body('starRating')
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage('Please enter a valid star rating between 1 and 5')
];

const validateComment = () => [
    body('userId')
        .notEmpty()
        .custom(isValidObjectId)
        .withMessage('Please enter a valid user ID'),
    body('comment')
        .notEmpty()
        .isString()
        .withMessage('Please enter a valid comment'),
    body('level')
        .notEmpty()
        .isInt({ min: 2, max: 3 })
        .withMessage('Level must be 2 or 3'),
    body('parentId')
        .optional()
        .custom(isValidObjectId)
        .withMessage('Please enter a valid parent comment ID')
];

const validateObjectIdParam = (paramName: string) => [
    param(paramName)
        .custom(isValidObjectId)
        .withMessage(`Invalid ${paramName}`)
];

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const Review_Validate_Create = [
    ...validateReview(),
    validate,
];

const Review_Validate_Update = [
    ...validateReview(),
    ...validateObjectIdParam('reviewId'),
    validate,
];

const Comment_Validate_Create = [
    ...validateComment(),
    ...validateObjectIdParam('reviewId'),
    validate,
];

const Comment_Validate_Update = [
    ...validateComment(),
    ...validateObjectIdParam('commentId'),
    validate,
];

const Validate_Get_Reviews_By_ProductId = [
    ...validateObjectIdParam('productId'),
    validate,
];

export {
    Review_Validate_Create,
    Review_Validate_Update,
    Comment_Validate_Create,
    Comment_Validate_Update,
    Validate_Get_Reviews_By_ProductId,
};
