const express = require("express");
const morgan = require("morgan");
// Global error Handler
const globalErrorHandler = require("./Controllers/errorController");

const userRouter = require("./Routes/userRoutes");

const app = express();
// For showing on development
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to ecommerce",
  });
});
app.use("/api/v1/users", userRouter);

// Global Error Handler

app.use(globalErrorHandler);

module.exports = app;
