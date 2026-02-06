import {Router} from 'express';
import createuser from '../controller/createsUser.js';
 import userAuthentication from '../middleware/userAuthentication.js';
import Login from '../controller/login.js'
import resendotp from '../controller/resendOtp.js';
import forgetpassword from '../controller/forgetpassword.js'
import passwordotpverification from '../controller/passwordOtpVerification.js'
import SignupOtpVerification from '../controller/SignupOtpVerification.js';
import LoginMiddleware from '../middleware/loginMiddleware.js';
import OtpMiddleware from '../middleware/otpMiddleware.js';
import setNewPassword from '../controller/setnewpassword.js';
import resendotpforgotpass from '../controller/resendotpforgotpass.js';
import SignupMiddleware from '../middleware/SignupMiddleware.js';
import Logout from '../controller/Logout.js';
import authStatus from '../controller/authStatus.js';





const userAuthRoute=Router()


userAuthRoute.post('/createuser',SignupMiddleware,createuser)
userAuthRoute.post('/signupverify',OtpMiddleware,SignupOtpVerification)
userAuthRoute.post('/resendotp',resendotp)
userAuthRoute.post('/resendotpforgotpass',resendotpforgotpass)
userAuthRoute.post('/forgetpassword',forgetpassword)
userAuthRoute.post('/passotpverify',OtpMiddleware,passwordotpverification)
userAuthRoute.post('/resetpass',setNewPassword)
userAuthRoute.post('/login',LoginMiddleware,Login)
userAuthRoute.post('/logout',userAuthentication,Logout)
userAuthRoute.post('/authstatus',userAuthentication,authStatus)


export default userAuthRoute;