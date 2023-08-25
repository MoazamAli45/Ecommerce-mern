const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItems",
    },
  ],
  orderDate: {
    type: Date,
    required: [true, "Please Provide a valid Date"],
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addressses",
    },
  ],
  paymentDetails: {
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
  },
  totalPrice: {
    type: Number,
    requried: true,
    default: 0,
  },
  totalDiscountPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: Number,
    required: true,
    default: "Pending",
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
