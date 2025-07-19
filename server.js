const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const { constructMongoUri } = require('./helpers/dbHelper'); 
const app = express();

//const mongoUrl = 'mongodb+srv://sidhantaks:ssp1234@cluster0.wijrd8t.mongodb.net/mern_testing?retryWrites=true&w=majority';
//const mongoUrl = 'mongodb+srv://krishnaonlinetutorials:qwerty123456789@cluster0.jwtby.mongodb.net/mern_testing?retryWrites=true&w=majority';

const mongoUrl = constructMongoUri(); // Use the helper function to construct the MongoDB URI

app.use(cors());
app.use(express.json());

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB using Mongoose'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
