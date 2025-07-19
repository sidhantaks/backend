const {MongoClient, ObjectId} = require('mongodb');
const Product = require('../models/products');

const mongoUrl = 'mongodb+srv://krishnaonlinetutorials:qwerty123456789@cluster0.jwtby.mongodb.net/mern_testing?retryWrites=true&w=majority';


let productsCollection; 

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
  const db = client.db('mern_testing');
  productsCollection = db.collection('products');  
  console.log('Connected to MongoDB');
 })
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const postProduct = async (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  const result = await productsCollection.insertOne(newProduct);  
  res.status(201).json(result);
}

const getProducts = async (req, res) => {
  const products = productsCollection ? await productsCollection.find().toArray() : [];
  res.json(products);
}

const getProductById = async (req, res) => {
  const products = productsCollection ? await productsCollection.find().toArray() : [];
  const product = products.find(p => p.id == req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
}

const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await productsCollection.findOneAndUpdate(
      { id: id },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (result.value) {
      res.json(result.value);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
}

const deleteProduct = async (req, res) => {
  try {
    //console.log("Delete request for id:", req.params.id);
    const result = await productsCollection.deleteOne({ id: Number(req.params.id) });
    //console.log("Delete result:", result);
    if (result.deletedCount === 1) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
}

module.exports = {
    postProduct, 
    getProducts,
    getProductById,    
    updateProduct,
    deleteProduct
}