// user fields username, email, password, role, tasks, projects
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  tasks: string[];
  projects: string[];
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

const User = model<IUser>("User", UserSchema);
export default User;
