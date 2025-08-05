const Product = require("../models/products");

// Create a new product
const postProduct = async (req, res) => {
  try {
    const { title, price, brand, stock } = req.body;
    console.log("Request Body:", req.body);
    console.log("File Upload:", req.file);
    const image = req.file
      ? {
          filename: req.file.filename,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          path: req.file.path,
          size: req.file.size,
        }
      : null;
    console.log(image);
    const newProduct = new Product({
      title,
      price,
      brand,
      stock,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: "Failed to create product." });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by _id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update product by _id
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedProduct) res.json(updatedProduct);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete product by _id
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  postProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
