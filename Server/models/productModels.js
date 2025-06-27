import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  sizes: [String],
  image: [String],
  date: Date
});

const productModel = mongoose.model('Product', productSchema);
export default productModel;
