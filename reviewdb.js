const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://krishnaonlinetutorials:qwerty123456789@cluster0.jwtby.mongodb.net/sample_airbnb?retryWrites=true&w=majority';

const client = new MongoClient(uri);
let reviewsCollection;

async function connectDB() {
  await client.connect();
  const db = client.db('sample_airbnb');
  reviewsCollection = db.collection('listingsAndReviews');
  //console.log("reviewsCollection initialized:", !!reviewsCollection);
}

function getReviewsCollection() {
  return reviewsCollection;
}

module.exports = { connectDB, getReviewsCollection };