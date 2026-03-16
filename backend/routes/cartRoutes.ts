import express from "express";
import { getCart, syncCart } from "../controllers/cartController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User shopping cart management
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get logged in user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User cart items
 *   post:
 *     summary: Sync/Save user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items: { type: object }
 *     responses:
 *       200:
 *         description: Cart synced successfully
 */
router.route("/").get(protect, getCart).post(protect, syncCart);

export default router;
