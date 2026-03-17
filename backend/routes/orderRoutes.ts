import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  createCheckoutSession,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ... existing swagger docs ...

router.route("/").post(protect, addOrderItems);
router.route("/create-checkout-session").post(protect, createCheckoutSession);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);

export default router;
