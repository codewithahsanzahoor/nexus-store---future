import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         description: Filter products by category
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search products by name
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a new product (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *               - image
 *               - description
 *             properties:
 *               name: { type: string }
 *               category: { type: string }
 *               price: { type: number }
 *               image: { type: string }
 *               description: { type: string }
 *               rating: { type: number, default: 0 }
 *               reviews: { type: number, default: 0 }
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.get("/", getProducts);
router.post("/", protect, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

export default router;
