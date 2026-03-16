import { Request, Response } from "express";
import { ProductModel } from "../models/Product";

// @desc    Get all products (with filters & sorting)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;
    let query: any = {};

    // Category Filter
    if (category && category !== "All") {
      query.category = category;
    }

    // Search Filter
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Price Range Filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sorting Logic
    let sortOptions: any = {};
    if (sort === 'price-low') {
      sortOptions.price = 1;
    } else if (sort === 'price-high') {
      sortOptions.price = -1;
    } else if (sort === 'newest') {
      sortOptions.createdAt = -1;
    } else {
      sortOptions.createdAt = -1; // Default: Newest
    }

    const products = await ProductModel.find(query).sort(sortOptions);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, price, image, description, rating, reviews } = req.body;

    const product = await ProductModel.create({
      name,
      category,
      price,
      image,
      description,
      rating: rating || 0,
      reviews: reviews || 0,
    });

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400).json({ message: "Invalid product data" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
