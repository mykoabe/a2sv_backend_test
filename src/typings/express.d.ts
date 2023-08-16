import { IUser } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Extend the Request interface with the user property
      id?: string;
    }
  }
}
