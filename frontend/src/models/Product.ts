import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});

export default mongoose.models.product ||
  mongoose.model('product', ProductSchema, 'menu');
