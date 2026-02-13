import userDataModel from "../models/userdata.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Login=async(req,res)=>{
    try{
        
  
    const {email,password}=req.body
  
   
    const user=await userDataModel.findOne({email})

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
    })
    }

     if (!user.isEmailverified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before login"
      })
    }

    if(!user.isActive){
        return res.status(401).json({
        success: false,
        message: "Your Account is Blocked !!!"
      }) 
    }
 


    const isPasswordVerified=await bcrypt.compare(password,user.hashpassword)

   if(!isPasswordVerified){
     return res.status(400).json({
         success:false,
         message:"Incorrect Password !! Please try again"
     })
   }

   const token=jwt.sign(
    {id:user._id,role:user.role},
    process.env.JWTSecret,
     {expiresIn:'24h'}
     )

     

     res.cookie('JWT_token',token,{
         httpOnly:true,
           secure:true,  //true only in production 
            sameSite:"none",  //if not iin production use lax
           maxAge:24*60*60*1000
     })



     return res.status(200).json({
        success:true,
        message:"Login Successfully",
        data:{
           username:user.username,
           email:user.email,
           role:user.role,
           isActive:user.isActive
        }
     })
    }

    catch(err){
      
     console.log(err)
        return res.status(500).json({
            success:false,
            message:err.message || "Internal server problem"
        })
    }
}


export default Login;