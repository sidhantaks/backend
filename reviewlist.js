const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();
const reviewRoutes = require('./routes/reviews');
const { connectDB } = require('./reviewdb');

app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    app.use('/reviews', reviewRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });