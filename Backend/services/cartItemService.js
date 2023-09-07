const CartItem = require("../Model/cartItemModel");
const Cart = require("../Model/cartModel");
const User = require("../Model/userModel");
const AppError = require("../utils/appError");

exports.updateCartItem = async (userId, cartItemId, data) => {
  try {
    const item = await CartItem.findById(cartItemId);

    if (!item) {
      throw new Error("Cart not found");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    console.log("item" + item);

    if (user._id.toString() === item.userId.toString()) {
      item.quantity = +data.quantity;
      item.price = item.quantity * +data.price;
      item.discountPrice = item.quantity * item.discountPrice;

      const updatedItem = await item.save();

      console.log("updatedItem" + updatedItem);
      return updatedItem;
    } else {
      // Our generated Error
      throw new AppError(
        "You are not authorized to update this cart item",
        401
      );
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

//   Remove Cart Item
exports.removeCartItem = async (userId, cartItemId) => {
  try {
    const item = await CartItem.findById(cartItemId);

    if (!item) {
      throw new Error("Cart not found");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user._id.toString() === item.userId.toString()) {
      await item.remove();
      console.log(item);
      return item;
    } else {
      // Our generated Error
      throw new AppError(
        "You are not authorized to remove this cart item",
        401
      );
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

// Finding Cart item
exports.findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId).populate("products");
    if (cartItem) {
      return cartItem;
    }
  } catch (err) {
    throw new Error("Cart Item not found with this id", cartItemId);
  }
};
