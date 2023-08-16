import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import ErrorResponse from "../utils/errorResponse";
import bcrypt from "bcryptjs";

// @desc      register user
// @route     POST /api/v1/auth/register
// @access    Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
};

// @desc      login user
// @route     POST /api/v1/auth/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
};

// @desc      logout user

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return next(err);
  }
};

// get token from model
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRE!) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
