const { getReviewsCollection } = require('../reviewdb');

const getReviews = async (req, res) => {
  try {
    const collection = getReviewsCollection();
    if (!collection) {
      return res.status(500).json({ message: "Collection not initialized" });
    }

    // Get page and limit from query params, set defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch paginated data
    const reviews = await collection
      .find()
      .sort({ last_review: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Optionally, get total count for frontend pagination
    const total = await collection.countDocuments();

    res.json({
      reviews,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

module.exports = { getReviews };