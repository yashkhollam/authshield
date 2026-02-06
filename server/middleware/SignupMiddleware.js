import joi from 'joi';


const Schema=joi.object({
         username:joi.string().max(50).min(3).required(),
         email:joi.string().email().required(),
         password:joi.string().max(30).min(4).required(),
        
       }).unknown(false)

const SignupMiddleware=(req,res,next)=>{
    try{
       


       const {error}= Schema.validate(req.body,{
        abortEarly:true
       });

       if(error){
            return res.status(403).json({
        success:false,
        message:error.details[0]?.message 
       })
       }
       next()
    }
    catch(err){
         return res.status(400).json({
        success:false,
        message:"internal server problem"
    })

   
}
}

export default SignupMiddleware



