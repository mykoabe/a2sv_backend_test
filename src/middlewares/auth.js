const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return next(new Error("Not authorized to access this route"));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      throw new Error("Invalid JWT payload"); // Handle invalid payload
    }

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      throw new Error("User not found"); // Handle user not found
    }

    next();
  } catch (err) {
    return next(new Error("Not authorized to access this route"));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new Error("User not authenticated"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new Error(`User role ${req.user.role} is not authorized to access this route`)
      );
    }

    next();
  };
};

module.exports = { protect, authorize };
