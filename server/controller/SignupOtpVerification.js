import userDataModel from '../models/userdata.js'
import otpVerificationService from '../services/otpVerificationService.js'


const SignupOtpVerification=async(req,res)=>{
    try{
      
         const {otp,email}=req.body
        
         const user=await userDataModel.findOne({email})

         if(!user){ 
            return res.status(400).json({
                success:false,
                message:"INVALID_VERIFICATION"
            })
         }

         if(user.isEmailverified===true){
           return res.status(400).json({
            success:false,
            message:"User already verified, please login"
           })
         }
         
        
        await otpVerificationService(otp,user)

        user.isEmailverified=true
        await user.save()


        return res.status(200).json({
            success:true,
            message:"OTP Successfully verified",
            
        })

        }


    catch(err){

    //    OTP_EXPIRED ,  

    if(err.message==="INVALID_OTP"){
        const user=await userDataModel.findOne({email:req.body.email})
        const remaining=3-user.otpAttempts
        return res.status(401).json({
            success:false,
            message:`Invalid OTP . ${remaining} attempts remaining`
        })
    }

     if(err.message==="MAX_OTP_ATTEMPTS"){
        return res.status(429).json({
            success:false,
            message:"Max attempts reached !! Try later"
        })
    }

    if(err.message==="OTP_EXPIRED"){
       
        return res.status(401).json({
            success:false,
            message:"OTP expired. Please resend OTP"
        })
    }




        return res.status(429).json({
            success:false,
            message:err.message || "Internal server problem"
        })
    
}}


export default SignupOtpVerification