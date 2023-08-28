const CartItem = require("../Model/cartItemModel");
const Cart = require("../Model/cartModel");
const Product = require("../Model/productModel");

exports.createCart = async (user) => {
  try {
    // console.log("From Cart Service ", user);
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Find Cart by ID
exports.findUserCartById = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    const cartItems = await CartItem.find({ cart: cart._id }).populate(
      "products"
    );

    // Now assigning in database
    cart.cartItems = cartItems;

    // now adding price
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;

    // Counting for cartItems
    for (let cartItem of cart.cartItems) {
      totalPrice = cartItem.price;
      totalDiscountedPrice = cartItem.discountPrice;
      totalItems = cartItem.quantity;
    }

    // Now assigning in DB
    // Now Cart
    cart.totalPrice = totalPrice;
    cart.totalDiscountPrice = totalDiscountedPrice;
    cart.totalItems = totalItems;

    return cart;
  } catch (err) {
    throw new Error(err.message);
  }
};

// add Cart Item
exports.addCartItem = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    // Now finding product by using Id
    const product = await Product.findById(req.productId);
    // Checking if it is already present then not add
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      products: product._id,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        cart: cart._id,
        products: product._id,
        size: req.size,
        quantity: req.quantity,
        price: product.price,
        discountPrice: product.discountPrice,
        userId: userId,
      });
      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);

      await cart.save();

      return "Item added Successfully";
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
