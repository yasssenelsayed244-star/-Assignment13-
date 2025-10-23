import mongoose, { Schema, Document } from "mongoose";
 
export interface IUserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  createdAt?: Date;
}
const UserSchema: Schema<IUserDoc> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDoc>("User", UserSchema);
