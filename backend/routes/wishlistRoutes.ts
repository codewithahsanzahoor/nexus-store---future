import express from "express";
import { getWishlist, toggleWishlistItem } from "../controllers/wishlistController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: User wishlist management
 */

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get logged in user wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User wishlist items
 */
router.route("/").get(protect, getWishlist);

/**
 * @swagger
 * /api/wishlist/toggle:
 *   post:
 *     summary: Add/Remove item in wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId: { type: string }
 *     responses:
 *       200:
 *         description: Wishlist toggled successfully
 */
router.route("/toggle").post(protect, toggleWishlistItem);

export default router;
