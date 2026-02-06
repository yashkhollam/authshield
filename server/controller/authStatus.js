import userDataModel from "../models/userdata.js"


const authStatus=async(req,res)=>{
    try{
       
        const {id}=req.user

        const user=await userDataModel.findOne({_id:id})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }


        if(user.isActive===false){
              return res.status(403).json({
                success:false,
                message:"User is blocked"
            })
        }

        return res.status(200).json({
            success:true,
            message:"user is Authenticated",
            data:{
           _id:user._id,
           username:user.username,
           email:user.email,
           role:user.role,
          
            }
        })
    }
    catch(err){
              console.log(err)
              return res.status(500).json({
                success:false,
                message:"Internal server problem"
              })
    }
}


export default authStatus