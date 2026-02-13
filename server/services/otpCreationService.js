import axios from "axios";
import bcrypt from "bcrypt";

const otpCreationService = async (user) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const hashotp = await bcrypt.hash(otp.toString(), 10);
    const otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);

    // Send Email via Brevo HTTP API
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.Email_sender,
          name: "AUTHSHIELD",
        },
        to: [{ email: user.email }],
        subject: "OTP Verification from AUTHSHIELD",
        htmlContent: `
          <h2>Your verification code is ${otp}</h2>
          <h3>This code will expire in 3 minutes</h3>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    user.otpAttempts = 0;
    user.hashotp = hashotp;
    user.otpExpiresAt = otpExpiresAt;
    user.lastOtpSendAt = new Date();

    await user.save();

    return { success: true };

  } catch (err) {
    console.log("Brevo Error:", err.response?.data || err.message);
    throw new Error("Failed to send OTP");
  }
};

export default otpCreationService;
