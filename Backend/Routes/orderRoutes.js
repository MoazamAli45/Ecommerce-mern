const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

const orderController = require("../Controllers/orderController");
router.use(authController.protect);
router.post("/", orderController.createOrder);
router.get("/:id", orderController.findOrderById);
router.get("/orderhistory", orderController.orderHistory);
module.exports = router;