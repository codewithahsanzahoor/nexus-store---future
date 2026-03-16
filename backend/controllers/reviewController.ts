import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Review from "../models/Review";

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private
export const addReview = async (req: AuthRequest, res: Response) => {
  const { productId, rating, comment } = req.body;

  const reviewExists = await Review.findOne({
    userId: req.user._id,
    productId,
  });

  if (reviewExists) {
    res.status(400).json({ message: "Product already reviewed" });
    return;
  }

  const review = await Review.create({
    productId,
    userId: req.user._id,
    userName: req.user.name,
    rating,
    comment,
  });

  if (review) {
    res.status(201).json(review);
  } else {
    res.status(400).json({ message: "Invalid review data" });
  }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req: AuthRequest, res: Response) => {
  const reviews = await Review.find({ productId: req.params.productId });
  res.json(reviews);
};
