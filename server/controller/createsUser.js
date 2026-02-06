import userdatamodel from '../models/userdata.js'
import bcrypt from 'bcrypt'
import otpService from '../services/otpCreationService.js';


const createuser=async(req,res)=>{
    try{
       const {username,email,password}=req.body;

    console.log(req.body)
       const user=await userdatamodel.findOne({email})

       if(user && user.isEmailverified===true){
        return res.status(400).json({
            success:false,
            message:"User already exist !! please login "
        })
       }

       
       const hashpassword=await bcrypt.hash(password,10)
       if(user && user.isEmailverified===false){
       
        await otpService(user)  //email sent from here



           return res.status(200).json({
            success:true,
            message:"verification code send !! Please verify ."
           })
         }
     

      
            const newuser=await userdatamodel.create({
            username,
            email,
            hashpassword:hashpassword,
            isEmailverified:false
           })

       await otpService(newuser)//email send here

        res.status(201).json({
        success:true,
        message:"OTP sent successfully. Please verify your email.",
       
       })

       }
    
    
       

      
    
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"internal server problem "    
    })
}
}
export default createuser