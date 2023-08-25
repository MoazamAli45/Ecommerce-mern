const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

// protecting with token
router.use(authController.protect);

router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUsers);

module.exports = router;
