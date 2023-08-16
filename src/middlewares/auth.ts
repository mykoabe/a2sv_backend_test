import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";
import User, { IUser } from "../models/user";

// Extend the Request interface to include the 'user' property
interface CustomRequest extends Request {
  user: IUser;
}

// Protect routes
export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
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
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded.id) {
      throw new Error("Invalid JWT payload"); // Handle invalid payload
    }

    const user = await User.findById(decoded.id).exec(); // Use .exec() to return a promise
    if (!user) {
      throw new Error("User not found"); // Handle user not found
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }

    next();
  };
};
