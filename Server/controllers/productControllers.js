import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModels.js';

const addProduct = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);
    console.log("Received Files:", req.files);

    const name = req.body["name"]?.trim() || req.body["name "]?.trim();
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const sizes = req.body.sizes;
    

    if (!name) {
      return res.json({ success: false, message: "Product name is required." });
    }

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      sizes: JSON.parse(sizes || "[]"),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.json({ success: true, product });
  } catch (error) {
    console.log("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.log("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const products = await productModel.findOne({ name: name });
    res.json({ success: true, products });
  } catch (error) {
    console.log("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
