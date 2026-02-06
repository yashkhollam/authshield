import joi from 'joi';

const Schema=joi.object({
    email:joi.string().email().trim().lowercase().required(),
    otp:joi.string().length(6).pattern(/^[0-9]+$/).required()
}).unknown(false)


// .pattern(/^[0-9]+$/)

const OtpMiddleware=(req,res,next)=>{
    try{
        const {error}=Schema.validate(req.body,{abortEarly:true});

        if(error){
            return res.status(400).json({
                success:false,
                message:error.details[0]?.message
            })
        }
        next()
    }
catch(err){

    return res.status(500).json({
                success:false,
                message:"Internal server problem"
            })
}
}

export default OtpMiddleware