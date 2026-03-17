import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Order from "../models/Order";
import Cart from "../models/Cart";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia" as any,
});

// @desc    Create new order and return Stripe Checkout Session URL
// @route   POST /api/orders/create-checkout-session
// @access  Private
export const createCheckoutSession = async (req: AuthRequest, res: Response) => {
  const { items, shippingAddress, totalAmount } = req.body;

  if (items && items.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  }

  try {
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
    });

    const createdOrder = await order.save();

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cancel`,
      client_reference_id: createdOrder._id.toString(),
      metadata: {
        orderId: createdOrder._id.toString(),
      }
    });

    createdOrder.stripeSessionId = session.id;
    await createdOrder.save();

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: error.message || "Something went wrong with Stripe Checkout" });
  }
};

// @desc    Stripe Webhook
// @route   POST /api/orders/webhook
// @access  Public
export const stripeWebhook = async (req: any, res: Response) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.status = "processing"; // Change status from pending to processing
        await order.save();
        
        // Clear user's cart in database
        await Cart.findOneAndUpdate({ user: order.user }, { items: [] });
        
        console.log(`Order ${orderId} marked as paid and cart cleared.`);
      }
    }
  }

  res.status(200).json({ received: true });
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req: AuthRequest, res: Response) => {
  const { items, shippingAddress, totalAmount } = req.body;

  if (items && items.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  }

  const order = new Order({
    user: req.user._id,
    items,
    shippingAddress,
    totalAmount,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};
