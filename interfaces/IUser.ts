export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role?: "user" | "admin";
  isEmailVerified?: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
}
