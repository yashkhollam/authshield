 import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import ConnectDB from './Database/ConnectDB.js';
import userAuthRoute from './routes/userAuthRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userdataroute from './routes/userdataroute.js';

const app=express();
dotenv.config()

const PORT=process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
      origin:"http://localhost:5173",
      credentials:true
}))
app.use(cookieParser())
app.use('/auth',userAuthRoute)
app.use('/userdata',userdataroute)



ConnectDB()
app.get('/',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:["WELCOME TO AUTHSHIELD",
                 "Secure Authentication & Authorization System. By: YASH KHOLLAM"]
    })
})

app.listen(PORT,(()=>{
     console.log(`Server started successfully at PORT ${PORT}`)
}))