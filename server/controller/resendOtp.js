import userDataModel from '../models/userdata.js';
import otpService from '../services/otpCreationService.js';
const resendotp=async(req,res)=>{
    try{
        
        const {email}=req.body
        
     const user=await userDataModel.findOne({email})
    
    if(!user){
         return res.status(400).json({
            success:false,
            message:"User not found !! please signup"
        })
    }

     if(user.isEmailverified===true){
        return res.status(400).json({
            success:false,
            message:"User Already exist !! Please login"
        })
     }

     if(user.otpAttempts>=3){
          return res.status(400).json({
            success:false,
            message:" Please try again later"
        })
     }
     
    // 1 sec=1000 milleseconds, 10 sec=10,000 milleseconds
    //60,000 milleseconds= 1 minutes
     

     const oneMinute=60*1000
    const currenttime= Date.now()

     if(user.lastOtpSendAt){

        
     const timepassed=currenttime-user.lastOtpSendAt.getTime()
   //          ^
    //         ||
     //ex= timepassed=10min 50 sec- 10min 20sec
    //if(30 sec< 1min)

     if(timepassed<oneMinute){

    
       return res.status(400).json({
         success:false,
         message:"Please wait 1 minute before resending OTP"
       }) 
     }

     }   
     await otpService(user)


    

    return res.status(200).json({
        success:true,
        message:"OTP send successfully"
    })


    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:true,
            message:err.message||"Internal server problem"
        })
    }
}

export default resendotp;