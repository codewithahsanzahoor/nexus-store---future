import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - items
 *         - shippingAddress
 *         - totalAmount
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId: { type: string }
 *               name: { type: string }
 *               price: { type: number }
 *               quantity: { type: number }
 *               image: { type: string }
 *         shippingAddress:
 *           type: object
 *           properties:
 *             street: { type: string }
 *             city: { type: string }
 *             zipCode: { type: string }
 *             country: { type: string }
 *         totalAmount: { type: number }
 *         status: { type: string, enum: [pending, processing, shipped, delivered, cancelled] }
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.route("/").post(protect, addOrderItems);

/**
 * @swagger
 * /api/orders/myorders:
 *   get:
 *     summary: Get logged in user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.route("/myorders").get(protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Order details
 */
router.route("/:id").get(protect, getOrderById);

export default router;
