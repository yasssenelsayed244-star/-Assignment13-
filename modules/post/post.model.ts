import mongoose, { Schema, Document } from "mongoose";

export interface IPostDoc extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  createdAt?: Date;
}

const PostSchema: Schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IPostDoc>("Post", PostSchema);