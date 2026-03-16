import { Request, Response } from "express";
import { CategoryModel } from "../models/Category";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req: Request, res: Response) => {
  const categories = await CategoryModel.find({});
  res.json(categories);
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const categoryExists = await CategoryModel.findOne({ name });

  if (categoryExists) {
    res.status(400).json({ message: "Category already exists" });
    return;
  }

  const category = await CategoryModel.create({
    name,
    description,
  });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400).json({ message: "Invalid category data" });
  }
};
