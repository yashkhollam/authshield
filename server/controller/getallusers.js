
import userDataModel from "../models/userdata.js"


export const getallusers=async(req,res)=>{
    try{
         const users=await userDataModel.find({role:"user"})
      
         
        
        const onlyuserdata=users.map((user)=>({
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role,
                verified:user.isEmailverified,
                isActive:user.isActive
    }))

         return res.status(200).json({
            success:true,
            message:"Fetch all users",
            data:onlyuserdata
         })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:err.message|| "Internal server problem"
        })
    }
}



export const getuserbyId=async(req,res)=>{
    try{
        const {id}=req.params
         const user=await userDataModel.findOne({_id:id})
      
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
         }
        
        

         return res.status(200).json({
            success:true,
            message:"Fetch users",
            data:user
         })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message|| "Internal server problem"
        })
    }
}




export const updateuser=async(req,res)=>{
    try{
          const {id}=req.params

          const {username,role}=req.body

          const user=await userDataModel.findOne({_id:id})

          if(!user){
              return res.status(404).json({
                success:false,
                message:"user not found"
            })
          }


          const updateduser=await userDataModel.findByIdAndUpdate({_id:id},{username,role},{new:true})

           return res.status(200).json({
            success:true,
            message:"Updates the user data successfully",
            data:updateduser
         })

    } 
    catch(err){
        console.log(err)
 return res.status(500).json({
            success:false,
            message:err.message|| "Internal server problem"
        })
    }
}






export const deleteuser=async(req,res)=>{
    try{
         const {id}=req.params

         const user=await userDataModel.findOne({_id:id})

         if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
         }

        await userDataModel.findByIdAndDelete(user._id)
         
         return res.status(200).json({
            success:true,
            message:"user deleted successfully",
            
         })
    }
    catch(err){
        console.log(err)
        return err.message
    }
}





// export const blockuser=async(req,res)=>{

// try{
    
//     const {_id}=req.params;
//     const adminid=req.user.id;
   

//     if(_id===adminid){
//           return res.status(401).json({
//                 success:false,
//                 message:"Admin cannot block himself"
//             })
//     }



//     const user=await userDataModel.findOne({_id:_id})

//       if(!user){
//             return res.status(404).json({
//                 success:false,
//                 message:"user not found"
//             })
//          }


//     if(user.role==="admin"){
//         return res.status(404).json({
//                 success:false,
//                 message:"Cannot block another admin"
//             })
//     }


//           user.isActive=false;
//           await user.save()

//           return res.status(200).json({
//             success:true,
//             message:"user blocked"
//           })
// }

// catch(err){
      
//         console.log(err)
//         return err.message || "internal server problem"
    
// }


// } 







export const updateuserstatus=async(req,res)=>{
    try{

        // console.log(req.user)
        const {id}=req.params;
        console.log("from back",id)
       const {isActive}=req.body;
       const {id:adminId,role:adminRole}=req.user


       const user=await userDataModel.findOne({_id:id})


      if(typeof isActive!=="boolean"){
          return res.status(400).json({
            success:false,
            message:"isActive must be boolean"
        })
      }


    if(!user){
         return res.status(404).json({
            success:false,
            message:"user not found"
        }) 
    }

    if(user._id.toString()===adminId){
         return res.status(403).json({
            success:false,
            message:"Admin cannot block or unblocked himself"
        }) 
    }

    if(user.role==="admin"){
         return res.status(403).json({
            success:false,
            message:"Admin cannot modify another admin"
        })  
    }


    user.isActive=isActive
    await user.save();

     return res.status(200).json({
            success:true,
            message:isActive ? "User unblocked successfully"
                             : "User blocked successfully",
            data:{
                _id:user._id,
                isActive:user.isActive
            }
        })
    }

    catch(err){
        //   console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal server problem"
  });
    }
}


