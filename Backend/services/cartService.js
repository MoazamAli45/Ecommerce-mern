const Cart = require("../Model/cartModel");

exports.createCart = async (user) => {
  try {
    console.log("From Cart Service ", user);
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (err) {
    throw new Error(err.message);
  }
};
