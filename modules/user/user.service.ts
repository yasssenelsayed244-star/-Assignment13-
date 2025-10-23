import UserModel from "./user.model";
import { CreateUserDTO, LoginDTO } from "./user.dto";
import bcrypt from "bcrypt";
import { generateOTP, hashToken, generateOTPExpiry } from "../../utils/otpHelpers";
import { sendEmail } from "../../utils/send_email_function";
import { getEmailVerificationTemplate } from "../../utils/emailTemplates/Confirm_Email_Part_1";

export const loginUser = async (dto: LoginDTO) => {
  const user = await UserModel.findOne({ email: dto.email });
  if (!user) throw { status: 400, message: "Invalid credentials" };
  const match = await bcrypt.compare(dto.password, user.password);
  if (!match) throw { status: 400, message: "Invalid credentials" };
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };
};

export const getAllUsers = async () => {
  const users = await UserModel.find().select(
    "-password -emailVerificationToken"
  );
  return users;
};
function newFunction() {
  return async (dto: CreateUserDTO) => {
    const hashed = await bcrypt.hash(dto.password, 10);

    const otp = generateOTP();
    const hashedToken = hashToken(otp);

    const user = await UserModel.create({
      ...dto,
      password: hashed,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: generateOTPExpiry(10),
    });

    const emailHtml = getEmailVerificationTemplate(otp, user.name);
    await sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      html: emailHtml,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };
  };
}

