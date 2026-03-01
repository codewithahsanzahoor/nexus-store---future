import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import { ProductModel } from '../models/Product.js';

// jest.mock('../models/Product.js');

describe('Product Routes', () => {
  it('GET /api/products should return all products', async () => {
    const mockProducts = [{ name: 'P1' }, { name: 'P2' }];
    jest.spyOn(ProductModel, 'find').mockResolvedValue(mockProducts as any);

    const response = await request(app).get('/api/products');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });
});
