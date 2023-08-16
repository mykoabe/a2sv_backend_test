import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  owner: string;
}

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Project = model<IProject>("Project", ProjectSchema);

export default Project;
