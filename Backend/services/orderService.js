const Address = require("../Model/addressModel");
const Cart = require("../Model/cartModel");
const OrderItem = require("../Model/orderItemModel");
const Order = require("../Model/orderModel");
// Create Order
exports.createOrder = async (user, shipAddress) => {
  try {
    let address;
    // if already present Address
    if (shipAddress._id) {
      const existingAddress = await Address.findById(shipAddress._id);
      address = existingAddress;
    } else {
      address = new Address({
        shipAddress,
      });
      address.user = user;
      await address.save();

      // Now adding in user
      user.addresses.push(address);
      await user.save();
    }

    //          Now finding cart with that user
    const cart = await Cart.findOne({ user: user._id });
    let orderItems = [];

    for (let cartItem of cart.cartItems) {
      // now creating orderItem
      const orderItem = new OrderItem({
        product: cartItem.product,
        size: cartItem.size,
        quantity: cartItem.quantity,
        price: cartItem.price,
        discountPrice: cartItem.discountPrice,
        userId: user._id,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }
    // Now creatinf Order
    const createdOrder = new Order({
      orderItems,
      shippingAddress: address,
      user: user._id,
      totalPrice: cart.totalPrice,
      totalDiscountPrice: cart.totalDiscountPrice,
      totalItems: cart.totalItems,
      discount: cart.discount,
    });
    const savedOrder = await createdOrder.save();
    return savedOrder;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Place Oredr
exports.placeOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.confirmOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.shipOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.deliverOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);

    order.orderStatus = "DELIVERED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.cancelOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

///  User Order History

exports.userOrderHistory = async (userId) => {
  try {
    const order = await Order.find({
      user: userId,
      orderStatus: "PLACED",
    })
      .populate({
        path: "orderItems",
        populate: {
          path: "products",
        },
      })
      // lean()  This method call converts the query results into plain JavaScript objects rather than Mongoose documents. This can improve performance and reduce memory consumption, especially when you don't need the full functionality of Mongoose objects.
      .lean();

    return order;
  } catch (err) {
    throw new Error(err.message);
  }
};
//   GET ALL ORDERS
exports.getAllOrders = async () => {
  try {
    const orders = await Order.find()
      .populate({
        path: "orderItems",
        populate: {
          path: "products",
        },
      })
      .lean();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.deleteOrder = async (orderId) => {
  await Order.findByIdAndDelete(orderId);
};
const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    //    in order Items also product
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
};
