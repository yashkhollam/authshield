import userDataModel from "../models/userdata.js"
import otpVerificationService from "../services/otpVerificationService.js"
import bcrypt from 'bcrypt'

const passwordOtpVerification=async(req,res)=>{
    
    try{
          const {otp,email}=req.body

          const user=await userDataModel.findOne({email})
         
      
             if(!user){ 
            return res.status(404).json({
                success:false,
                message:"user not found !!"
            })
         }

         await otpVerificationService(otp,user)


        //   const {email,password}=req.body
        //  const hashpassword=await bcrypt.hash(password,10)
         
        //  user.hashpassword=hashpassword
        //  await user.save();

        //  return res.status(200).json({
        //     success:true,
        //     message:"Password update Successfully"
        //  })

          
    }
    catch(err){
        
     if(err.message==="INVALID_OTP"){
            const user=await userDataModel.findOne({email:req.body.email})
            const remaining=3-user.otpAttempts
            return res.status(400).json({
                success:false,
                message:`Invalid OTP . ${remaining} attempts remaining`
            })
        }
    
         if(err.message==="MAX_OTP_ATTEMPTS"){
            return res.status(429).json({
                success:false,
                message:"Too many incorrect attempts. Please try again later"
            })
        }
    
        if(err.message==="OTP_EXPIRED"){
           
            return res.status(401).json({
                success:false,
                message:"OTP expired. Please resend OTP"
            })
        }
    
    

        return res.status(500).json({
            success:false,
            message:err.message || "Internal server problem"
        })
    }
}

export default passwordOtpVerification;