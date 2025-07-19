const http = require('http');
const fs  = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();

const PRODUCTS_FILE = path.join(__dirname, 'products.json');

app.use(cors());
app.use(express.json());

const readProductsFromFile = () => {
  if (fs.existsSync(PRODUCTS_FILE)) {
    const data = fs.readFileSync(PRODUCTS_FILE);
    return JSON.parse(data);
  }
  return [];
};

const writeProductsToFile = (products) => {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

// PRODUCTS CRUD

// Create product
app.post('/products', (req, res) => {
  const products = readProductsFromFile();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeProductsToFile(products);
  res.status(201).json(newProduct);
});

// Read all products
app.get('/products', (req, res) => {
  const products = readProductsFromFile();
  res.json(products);
});

// Read one product
app.get('/products/:id', (req, res) => {
  const products = readProductsFromFile();
  const product = products.find(p => p.id == req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
});

// Update product
app.put('/products/:id', (req, res) => {
  const products = readProductsFromFile();
  const idx = products.findIndex(p => p.id == req.params.id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...req.body };
    writeProductsToFile(products);
    res.json(products[idx]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete product
app.delete('/products/:id', (req, res) => {
    //console.log(req);
    const products = readProductsFromFile();
  const idx = products.findIndex(p => p.id == req.params.id);
  if (idx !== -1) {
    const deleted = products.splice(idx, 1);
    writeProductsToFile(products);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
