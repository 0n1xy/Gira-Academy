import {
    addComment,
    createReview,
    deleteComment,
    deleteReview,
    getAllReviewsAndComments,
    getReviewsByProductId,
    updateComment,
    updateReview
} from "@/controllers/Review_Controller";
import {
    Comment_Validate_Create,
    Comment_Validate_Update,
    Review_Validate_Create,
    Review_Validate_Update,
    Validate_Get_Reviews_By_ProductId
} from "@/validates/Review_Validate";


import { Router } from 'express';


const router = Router();

router.post('/reviews', Review_Validate_Create, createReview);
router.post('/reviews/:reviewId/comments', Comment_Validate_Create, addComment);
router.put('/reviews/:reviewId', Review_Validate_Update, updateReview);
router.put('/comments/:commentId', Comment_Validate_Update, updateComment);
router.get('/reviews', getAllReviewsAndComments);
router.get('/reviews/product/:productId', Validate_Get_Reviews_By_ProductId, getReviewsByProductId);
router.delete('/comments/:commentId', deleteComment);
router.delete('/reviews/:reviewId', deleteReview);

export default router;
