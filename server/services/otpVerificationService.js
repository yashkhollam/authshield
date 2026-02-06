import bcrypt from "bcrypt";
// import userDataModel from "../models/userdata";

const otpVerificationService = async (otp, user) => {
 
    const MaxAttempt = 3;
    const currenttime = Date.now();

    if (user.otpAttempts >= MaxAttempt) {
      throw new Error("MAX_OTP_ATTEMPTS");
    }

    if (currenttime > user.otpExpiresAt) {
      throw new Error("OTP_EXPIRED");
    }

    const isOtpValid  = await bcrypt.compare(otp, user.hashotp);
   
    if (!isOtpValid ) {
      user.otpAttempts += 1;
    
       await user.save();
       throw new Error("INVALID_OTP");
    }
    
    
    
   
       user.hashotp=null
       user.otpExpiresAt=null
        user.otpAttempts=0
        user.isOtpVerified = true

      await user.save()

     

      return { success: true };
    
};

export default otpVerificationService;
