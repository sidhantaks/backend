const http = require('http');
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, Sidhanta Kumar !\n');
// });

// PRODUCTS CRUD

let products = [];

// Create product
app.post('/products', (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Read all products
app.get('/products', (req, res) => {
    //console.log(products);
  res.json(products);
});

// Read one product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
});

// Update product
app.put('/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id == req.params.id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...req.body };
    res.json(products[idx]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete product
app.delete('/products/:id', (req, res) => {
    console.log(req);
  const idx = products.findIndex(p => p.id == req.params.id);
  if (idx !== -1) {
    const deleted = products.splice(idx, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
