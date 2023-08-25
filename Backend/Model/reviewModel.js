const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  review: {
    type: String,
    required: [true, "Please provide Review"],
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
