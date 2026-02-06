import mongoose from 'mongoose'
//   import {config} from 'dotenv'

const ConnectDB=async()=>{

    try{
        await mongoose.connect(process.env.connectstring)
        console.log("Database connected successfully")
    }
    catch(err){
       console.error(" Database connection failed:", err.message);
        process.exit(1); 
        }
    
}

export default ConnectDB;