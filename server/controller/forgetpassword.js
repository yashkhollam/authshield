import userdatamodel from '../models/userdata.js'
import otpService from '../services/otpCreationService.js';



const forgetPassword=async(req,res)=>{
    try{
         const {email}=req.body

          const user=await userdatamodel.findOne({email})

          if(!user){

              return res.status(404).json({
            success:false,
            message:"User not Found"
        })
          }

        await otpService(user)

        return res.status(200).json({
            message:"OTP sent successfully to your email"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message || "Internal server problem"
        })
    }
}

export default forgetPassword;