const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// PROMISIFY FOR RETURN PROMISE FROM JWT VERIFY METHoD
const { promisify } = require("util");
// Cart service
const { createCart } = require("../services/cartService");

// creating jwt token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createdSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  // Sending  cookie
  res.cookie("jwt", token, cookieOptions);

  // sending response
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res) => {
  // before password will hash because I have used pre save middleware in user Model
  const user = await User.create(req.body);

  //  on Sign Up cart will be created
  await createCart(user);

  createdSendToken(user, 201, res);
});
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email or password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  console.log("From Login ", user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createdSendToken(user, 200, res);
});

// protecting
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //eg: Bearer 12345678899
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in", 404));
  }

  // Decoding Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does not exist")
    );
  }
  console.log(currentUser);
  req.user = currentUser;

  // to be available in frontend
  res.locals.user = currentUser;
  next();
});

//  AUthorization
// wrapping as we can't pass value to middleware
exports.restrictTo = (...roles) => {
  // Due to closure it can access
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
