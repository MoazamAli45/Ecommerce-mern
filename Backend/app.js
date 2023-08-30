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

// For mongo sanitization
const mongoSanitize = require("express-mongo-sanitize");
// For html Sanitization
const xss = require("xss-clean");

const helmet = require("helmet");

const cors = require("cors");

const app = express();
// For showing on development
app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));

//   without this you can login as {"$gt":""} with known password without signup
app.use(mongoSanitize());
// Data sanitization against XSS
// html sanitization
app.use(xss());

app.use(helmet());

app.use(cors());

app.options('*',cors());

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
