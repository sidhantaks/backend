const http = require('http');
const fs  = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();
const {MongoClient, ObjectId} = require('mongodb');
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

app.use(cors());
app.use(express.json());

// PRODUCTS CRUD

// Create product
app.post('/products', async (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  const result = await productsCollection.insertOne(newProduct);  
  res.status(201).json(result);
});

// Read all products
app.get('/products', async (req, res) => {
  const products = productsCollection ? await productsCollection.find().toArray() : [];
  res.json(products);
});

// Read one product
app.get('/products/:id', async (req, res) => {
  const products = productsCollection ? await productsCollection.find().toArray() : [];
  const product = products.find(p => p.id == req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
});

// Update product
app.put('/products/:id', async (req, res) => {
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
});

// Delete product
app.delete('/products/:id', async (req, res) => {
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
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
