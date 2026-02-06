import bcrypt from "bcrypt";
import userDataModel from "../models/userdata.js";

const setNewPassword = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }


    const user = await userDataModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    if (!user.isOtpVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify OTP first",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    user.hashpassword = hashedPassword;
    user.isOtpVerified = false;

    await user.save();


    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

export default setNewPassword;
