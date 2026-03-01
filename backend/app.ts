import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
