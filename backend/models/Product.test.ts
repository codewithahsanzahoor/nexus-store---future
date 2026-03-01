import mongoose from 'mongoose';
import { ProductModel } from './Product.js';

describe('Product Model', () => {
  it('should create a product with valid fields', () => {
    const productData = {
      name: 'Test Product',
      category: 'Audio',
      price: 100,
      description: 'Test Description',
      image: 'test.jpg',
      rating: 4.5,
      reviews: 10
    };
    const product = new ProductModel(productData);
    expect(product.name).toBe(productData.name);
    expect(product.price).toBe(productData.price);
  });

  it('should require a name', () => {
    const product = new ProductModel({ price: 100 });
    const err = product.validateSync();
    expect(err?.errors.name).toBeDefined();
  });
});
