const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

const productController = require("../Controllers/productController");
router.get("/", productController.getAllProducts);
//  middleware
router.use(authController.protect);
router.get("/:productId", productController.getProductById);
