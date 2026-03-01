import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { connectDB } from './db.js';

// jest.mock('mongoose', () => ({
//   connect: jest.fn(),
// }));

describe('connectDB', () => {
  it('should call mongoose.connect with the correct URI', async () => {
    const mockUri = 'mongodb://localhost:27017/test';
    process.env.MONGODB_URI = mockUri;
    
    jest.spyOn(mongoose, 'connect').mockResolvedValueOnce({
      connection: { host: 'localhost' }
    } as any);
    
    await connectDB();
    
    expect(mongoose.connect).toHaveBeenCalledWith(mockUri);
  });

  it('should exit the process on connection failure', async () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
        throw new Error('process.exit called');
    });
    
    jest.spyOn(mongoose, 'connect').mockRejectedValueOnce(new Error('Connection failed'));
    
    await expect(connectDB()).rejects.toThrow('process.exit called');
    
    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });
});
