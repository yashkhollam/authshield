

import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
// import userdatamodel from '../models/userdata.js'

const otpCreationService=async(user)=>{
   
    const otp=Math.floor(100000+Math.random()*900000)


    const hashotp=await bcrypt.hash(otp.toString(),10)
    const otpExpiresAt= new Date(Date.now()+3*60*1000)

   
          user.otpAttempts=0
       
          user.hashotp=hashotp,
          user.otpExpiresAt=otpExpiresAt
          user.lastOtpSendAt=new Date
          await user.save()


     try{
    // const otpAttempts=

          const transporter=nodemailer.createTransport({
               host:process.env.Email_host,
               port:process.env.Email_port,
               secure:true,
               auth:{
                 user:process.env.Email_user,
                 pass:process.env.Email_apppass,
               }
               
          })
   
         const info= await transporter.sendMail({
           from:`"AUTHSHIELD" ${process.env.Email_user}`,
           to:user.email,
           subject:"Otp verification from AUTHSHIELD",
           html:`<h2>Your verification code is  ${otp}</h2>
                 <h3>This code will expires in 1 minutes</h3>`
          })

        //   await transporter.sendMail(otoption)
   
console.log("Email sent:", info.response);

       
         
   
    }
    catch(err){
      console.log("OTP email failed",err.message)
    
    }

     return {success:true}
}

export default otpCreationService