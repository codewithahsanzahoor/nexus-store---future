import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isBestseller: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false }
}, {
  timestamps: true
});

export const ProductModel = mongoose.model('Product', productSchema);
