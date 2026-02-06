const roleAuthorization=async(req,res,next)=>{
    const role=req.user?.role;


    if(role!=="admin"){
        return res.status(403).json({
            success:false,
            message:"Access denaid. Only Admin can have Access"
        })
    }

   next()


}
export default roleAuthorization