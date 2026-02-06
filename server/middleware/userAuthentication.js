
import jwt from 'jsonwebtoken'
import userDataModel from '../models/userdata.js'


const userAuthentication=async(req,res,next)=>{
    try{
        const token=req.cookies.JWT_token

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Authentication required"
            })
        }

        const decoded= jwt.verify(token,process.env.JWTSecret)

    // console.log("from decoded",decoded)
        const user=await userDataModel.findById(decoded.id)

        if(!user || user.isActive===false){
            return res.status(401).json({
            success: false,
            message: "Acoount is blocked"
    });
        }

        req.user=decoded

    next()
    }

     catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

export default userAuthentication