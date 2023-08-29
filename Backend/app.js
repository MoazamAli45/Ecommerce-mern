const express = require("express");
const morgan = require("morgan");
// Global error Handler
const globalErrorHandler = require("./Controllers/errorController");
//        ROUTES
const userRouter = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const productRoutes = require("./Routes/productRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const ratingRoutes = require("./Routes/ratingRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const cartItemRoutes = require("./Routes/cartItemRoutes");
const adminOrderRoutes = require("./Routes/adminOrderRoutes");
const adminProductRoutes = require("./Routes/adminProductRoutes");

const app = express();
// For showing on development
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to ecommerce",
  });
});

//  ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/ratings", ratingRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/cartItems", cartItemRoutes);
app.use("/api/v1/admin/orders", adminOrderRoutes);
app.use("/api/v1/admin/products", adminProductRoutes);
// Global Error Handler

app.use(globalErrorHandler);

module.exports = app;
