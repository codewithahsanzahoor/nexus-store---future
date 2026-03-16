import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { UserModel } from "../models/User";

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("wishlist");
    if (user) {
      res.json(user.wishlist);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle item in wishlist (Add if not exists, remove if exists)
// @route   POST /api/wishlist/toggle
// @access  Private
export const toggleWishlistItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.body;
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isWishlisted = user.wishlist.includes(productId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    
    const updatedUser = await UserModel.findById(req.user._id).populate("wishlist");
    res.json(updatedUser?.wishlist || []);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
