import { Request, Response } from "express";
import UserModel from "../modules/user/user.model";
import { hashToken } from "../utils/otpHelpers";
import { sendEmail } from "../utils/send_email_function";
import { getEmailVerifiedSuccessTemplate } from "../utils/emailTemplates/Confirm_Email_Part_2";
import { successResponse, errorResponse } from "../utils/response";

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return errorResponse(res, {
        status: 400,
        message: "Email and OTP are required",
      });
    }

    const hashedToken = hashToken(otp);
    const user = await UserModel.findOne({
      email,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return errorResponse(res, {
        status: 400,
        message: "Invalid or expired OTP",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    const emailHtml = getEmailVerifiedSuccessTemplate(user.name);
    await sendEmail({
      to: user.email,
      subject: "Email Verified Successfully",
      html: emailHtml,
    });

    return successResponse(res, null, "Email verified successfully");
  } catch (err) {
    return errorResponse(res, err);
  }
};
