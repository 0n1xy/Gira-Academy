import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import FileUploadService from "@/services/FileUpload_Service";
import Review from "@/models/Review_Schema";
import Comment from "@/models/Comments_Schema";
import { MAX_FETCH_REVIEW_5, STAR_RATING_3 } from "@/constant/Review_Constant";
import { COMMENT_FLOOR_2, COMMENT_FLOOR_3 } from "@/constant/Comment_Constant";
import { i18n } from "@/constant/I18n_Constant";
import { PopulateOption, PopulateOptions } from "mongoose";

const fileUploadService = new FileUploadService();

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers["accept-language"] ?? "en";

    fileUploadService.uploadBase64(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ message: i18n[lang].FILE_UPLOAD_SUCCESS });
        }

        try {
            const { userId, productId, comment, starRating } = req.body;
            const images = req.body.images || [];

            const review = new Review({
                _id: new ObjectId(),
                user_id: new ObjectId(userId),
                product_id: new ObjectId(productId),
                comment,
                images,
                starRating: starRating || STAR_RATING_3,
            });

            await review.save();
            res.status(201).json({ message: i18n[lang].REVIEW_CREATE_SUCCESS, review });
        } catch (error) {
            console.error("Error saving review:", error);
            res.status(500).json({ message: i18n[lang].REVIEW_CREATE_FAILED, error });
        }
    });
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers["accept-language"] ?? "en";

    fileUploadService.uploadBase64(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ message: i18n[lang].FILE_UPLOAD_SUCCESS });
        }

        try {
            const { userId, comment } = req.body;
            const level = parseInt(req.body.level, 10);
            const images = req.body.images || [];
            const reviewId = new ObjectId(req.params.reviewId);

            if (level !== COMMENT_FLOOR_2 && level !== COMMENT_FLOOR_3) {
                return res.status(400).json({ message: 'Invalid comment level' });
            }

            const newComment = new Comment({
                _id: new ObjectId(),
                user_id: new ObjectId(userId),
                review_id: reviewId,
                parent_id: level === COMMENT_FLOOR_3 ? new ObjectId(req.body.parentId) : null,
                comment,
                images,
                level,
            });

            await newComment.save();

            // Add the comment to the appropriate parent (review or comment)
            if (level === COMMENT_FLOOR_2) {
                await Review.findByIdAndUpdate(reviewId, { $push: { comments: newComment._id } });
            } else if (level === COMMENT_FLOOR_3 && newComment.parent_id) {
                await Comment.findByIdAndUpdate(newComment.parent_id, { $push: { replies: newComment._id } });
            }

            res.status(201).json({ message: i18n[lang].COMMENT_CREATE_SUCCESS, newComment });
        } catch (error) {
            console.error("Error saving comment:", error);
            res.status(500).json({ message: i18n[lang].COMMENT_CREATE_FAILED, error });
        }
    });
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers["accept-language"] ?? "en";

    fileUploadService.uploadBase64(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ message: i18n[lang].FILE_UPLOAD_SUCCESS });
        }

        try {
            const { reviewId } = req.params;
            const { userId, comment, starRating } = req.body;
            const newImages = req.body.images || [];

            const review = await Review.findById(reviewId);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }

            if (review.user_id.toString() !== userId) {
                return res.status(403).json({ message: 'You are not authorized to update this review' });
            }

            if (newImages.length > 0 && review.images.length > 0) {
                for (const image of review.images) {
                    await fileUploadService.deleteImage(image);
                }
                review.images = newImages;
            }

            review.comment = comment || review.comment;
            review.starRating = starRating || review.starRating;

            await review.save();
            res.status(200).json({ message: i18n[lang].REVIEW_UPDATE_SUCCESS, review });
        } catch (error) {
            console.error("Error updating review:", error);
            res.status(500).json({ message: i18n[lang].REVIEW_UPDATE_FAILED, error });
        }
    });
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers["accept-language"] ?? "en";

    fileUploadService.uploadBase64(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ message: i18n[lang].FILE_UPLOAD_SUCCESS });
        }

        try {
            const { commentId } = req.params;
            const { userId, comment } = req.body;
            const newImages = req.body.images || [];

            const existingComment = await Comment.findById(commentId);
            if (!existingComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            if (existingComment.user_id.toString() !== userId) {
                return res.status(403).json({ message: 'You are not authorized to update this comment' });
            }

            if (newImages.length > 0 && existingComment.images.length > 0) {
                for (const image of existingComment.images) {
                    await fileUploadService.deleteImage(image);
                }
                existingComment.images = newImages;
            }

            existingComment.comment = comment || existingComment.comment;

            await existingComment.save();
            res.status(200).json({ message: i18n[lang].COMMENT_UPDATE_SUCCESS, existingComment });
        } catch (error) {
            console.error("Error updating comment:", error);
            res.status(500).json({ message: i18n[lang].COMMENT_UPDATE_FAILED, error });
        }
    });
};

export const getAllReviewsAndComments = async (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers["accept-language"] ?? "en";
    try {
        const reviews = await Review.find({})
            .populate({
                path: 'comments',
                model: 'Comment',
                populate: populateRepliesRecursively(MAX_FETCH_REVIEW_5) // Limit the depth to 5 levels
            });

        res.status(200).json({ message: i18n[lang].REVIEW_GET_ALL_SUCCESS, reviews });
    } catch (error) {
        console.error("Error fetching reviews and comments:", error);
        res.status(500).json({ message: i18n[lang].REVIEW_GET_ALL_FAILED, error });
    }
};

const populateRepliesRecursively = (depth: number): PopulateOptions => {
    if (depth === 0) {
        return {
            path: 'replies',
            model: 'Comment',
        };
    }

    return {
        path: 'replies',
        model: 'Comment',
        populate: populateRepliesRecursively(depth - 1),
    };
};

export const getReviewsByProductId = async (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers["accept-language"] ?? "en";

    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product_id: new ObjectId(productId) })
            .populate({
                path: 'comments',
                model: 'Comment',
                populate: populateRepliesRecursively(MAX_FETCH_REVIEW_5) // Limit the depth to 5 levels
            });

        res.status(200).json({ message: i18n[lang].REVIEW_GET_BY_PRODUCT_SUCCESS, reviews });
    } catch (error) {
        console.error("Error fetching reviews by product ID:", error);
        res.status(500).json({ message: i18n[lang].REVIEW_GET_BY_PRODUCT_FAILED, error });
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers["accept-language"] ?? "en";

    try {
        const { commentId } = req.params;
        const { userId } = req.body;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user_id.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        // Delete associated images from S3
        if (comment.images && comment.images.length > 0) {
            for (const imageUrl of comment.images) {
                await fileUploadService.deleteImage(imageUrl);
            }
        }

        if (comment.level === COMMENT_FLOOR_2) {
            // Delete level 3 comments associated with this level 2 comment
            await Comment.deleteMany({ parent_id: commentId, level: COMMENT_FLOOR_3 });
            // Delete the level 2 comment itself
            await Comment.deleteOne({ _id: commentId });
        } else if (comment.level === COMMENT_FLOOR_3) {
            // For level 3 comments, delete them directly
            await Comment.deleteOne({ _id: commentId });
        }

        res.status(200).json({ message: i18n[lang].COMMENT_DELETE_SUCCESS });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: i18n[lang].COMMENT_DELETE_FAILED, error });
    }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers["accept-language"] ?? "en";

    try {
        const { reviewId } = req.params;
        const { userId } = req.body;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user_id.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        // Delete associated comments and their replies recursively
        for (const commentId of review.comments) {
            await deleteCommentsRecursively(commentId);
        }

        // Delete images associated with the review
        for (const image of review.images) {
            await fileUploadService.deleteImage(image);
        }

        // Delete the review
        await Review.deleteOne({ _id: new ObjectId(reviewId) });

        res.status(200).json({ message: i18n[lang].REVIEW_DELETE_SUCCESS });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: i18n[lang].REVIEW_DELETE_FAILED, error });
    }
};

const deleteCommentsRecursively = async (commentId: ObjectId) => {
    const comment = await Comment.findById(commentId);
    if (comment) {
        // Delete images associated with the comment
        if (comment.images && comment.images.length > 0) {
            for (const imageUrl of comment.images) {
                await fileUploadService.deleteImage(imageUrl);
            }
        }

        // Recursively delete replies
        for (const replyId of comment.replies) {
            await deleteCommentsRecursively(replyId);
        }

        // Delete the comment
        await Comment.deleteOne({ _id: commentId });
    }
};
