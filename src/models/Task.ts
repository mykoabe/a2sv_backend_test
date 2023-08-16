// tasks fields title, description, dueDate, status, priority, labels
import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  labels: string[];
  project: string;
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  labels: [{ type: String, required: true }],
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
});

const Task = model<ITask>("Task", TaskSchema);
export default Task;
