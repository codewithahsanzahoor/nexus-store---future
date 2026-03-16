import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../models/Cart";

// @desc    Get logged in user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      res.json(cart.items);
    } else {
      res.json([]);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Sync user cart (Overwrite existing cart in DB)
// @route   POST /api/cart
// @access  Private
export const syncCart = async (req: AuthRequest, res: Response) => {
  try {
    const { items } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = await Cart.create({
        user: req.user._id,
        items,
      });
    }

    res.status(200).json(cart.items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
