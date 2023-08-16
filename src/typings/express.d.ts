import { IUser } from "../models/user";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Extend the Request interface with the user property
    }
  }
}
