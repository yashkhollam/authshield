
import mongoose from 'mongoose';

const userDataSchema=mongoose.Schema({
    username:{
        type:String,
         required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    hashpassword:{
        type:String,
        required:true
    },
    hashotp:{
        type:String,
        
    },
    isEmailverified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user"
    },
    verificationExpiresAt:{
        type:Date
    },
    isActive:{
        type:Boolean,
        default:true

    },
    otpExpiresAt:{
        type:Date
    },
    otpAttempts:{
        type:Number,
        default:0
    },
        lastOtpSendAt:{
        type:Date
    },
    
    isOtpVerified:{
        default:false,
        type:Boolean
    }

    // otpResendCount:{
    //     type:Number,
    //     default:0
    // },
    // otpBlockedUntil:{
    //     type:Date,
    // },

    
},{
    timestamps:true
})

userDataSchema.index({verificationExpiresAt:1},{expireAfterSeconds:0})

const userDataModel=mongoose.model('userData',userDataSchema)

export default userDataModel;


// “Why two expiry fields?”

// You say:

// “OTP expiry ensures short-lived OTP validity, while verification expiry controls the lifetime of unverified accounts using TTL cleanup. They serve different security and lifecycle purposes.”