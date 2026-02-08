import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_user,
    pass: process.env.Email_apppass,
  },
});

const otpCreationService = async (user) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  user.hashotp = await bcrypt.hash(otp.toString(), 10);
  user.otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);
  user.otpAttempts = 0;
  user.lastOtpSendAt = new Date();
  await user.save();

  transporter.sendMail({
    from: `"Authshield" <${process.env.Email_user}>`,
    to: user.email,
    subject: "OTP Verification",
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 3 minutes</p>`
  })
  .then(() => console.log("OTP sent"))
  .catch(err => console.error("OTP failed:", err.message));

  return { success: true };
};

export default otpCreationService;
