const Product = require('../models/products');

let productsCollection; 

const postProduct = async (req, res) => {
  const newProduct = new Product({ id: Date.now(), ...req.body });
  await newProduct.save();
  res.status(201).json(newProduct);
}

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(201).json(products);
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Mongoose auto-converts to ObjectId
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id },
      req.body,
      { new: true } // returns the updated document
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteOne({ id: Number(req.params.id) });
    if (result.deletedCount === 1) {
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
    deleteProduct
}