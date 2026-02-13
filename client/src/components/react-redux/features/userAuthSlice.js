import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



// Signup
export const Signupthunk = createAsyncThunk(
  "userAuth/signup",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/createuser`,
        formdata,{withCredentials:true}
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Signup failed"
      );
    }
  }
);

// Signup OTP verify
export const SignupOtpVerification = createAsyncThunk(
  "userAuth/signupOtpVerify",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signupverify`,
        formdata,{withCredentials:true}
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// Login
export const Loginthunk = createAsyncThunk(
  "userAuth/login",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formdata,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

//logout

export const Logoutthunk = createAsyncThunk(
  "userAuth/logout",
  async (_,{ dispatch,rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(authStatusthunk()); //to check the user is present or not
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);




// Resend OTP
export const Resendotpthunk = createAsyncThunk(
  "userAuth/resendOtp",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resendotp`,
        formdata
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Resend OTP failed"
      );
    }
  }
);

//resendotpforgotpass

export const resendotpforgotpassthuk = createAsyncThunk(
  "userAuth/resendotpforgotpass",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resendotpforgotpass`,
        formdata
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Resend OTP failed"
      );
    }
  }
);

// Forgot password
export const Forgetpasswordthunk = createAsyncThunk(
  "userAuth/forgotPassword",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgetpassword`,
        formdata
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Forgot password failed"
      );
    }
  }
);

// Verify forgot-password OTP
export const verifypassotpthunk = createAsyncThunk(
  "userAuth/verifyPassOtp",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/passotpverify`,
        formdata
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// Reset password
export const setnewpasswordthunk = createAsyncThunk(
  "userAuth/setNewPassword",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resetpass`,
        formdata
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Reset password failed"
      );
    }
  }
);

//check user auth Status

export const authStatusthunk=createAsyncThunk('userAuth/authStatus',async(_,{rejectWithValue})=>{
  
  try{
       const res=await axios.post(`${import.meta.env.VITE_API_URL}/auth/authstatus`,{},{withCredentials:true})

       return res.data
  }
  catch(err){
    console.log(err)
     return rejectWithValue(err.response.data?.message || "user not Authenticated")
  }
})

// ======================= SLICE ======================= 

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
   isAuthenticated:false,
   isauthChecked:false,
    loading: {
      signup: false,
      signupOtp: false,
      login: false,
      logout:false,
      resendOtp: false,
      resendotpforgotpass:false,
      forgotPass: false,
      verifyPassOtp: false,
      resetPassword: false,
      authStatus:false
    },

    error: null,
  },

  extraReducers: (builder) => {
    builder

      /* -------- Signup -------- */
      .addCase(Signupthunk.pending, (state) => {
        state.loading.signup = true;
        state.error = null;
      })
      .addCase(Signupthunk.fulfilled, (state, action) => {
        state.loading.signup = false;
        state.user = action.payload;
      })
      .addCase(Signupthunk.rejected, (state, action) => {
        state.loading.signup = false;
        state.error = action.payload;
      })

      /* -------- Signup OTP -------- */
      .addCase(SignupOtpVerification.pending, (state) => {
        state.loading.signupOtp = true;
        state.error = null;
      })
      .addCase(SignupOtpVerification.fulfilled, (state) => {
        state.loading.signupOtp = false;
      })
      .addCase(SignupOtpVerification.rejected, (state, action) => {
        state.loading.signupOtp = false;
        state.error = action.payload;
      })

      /* -------- Login -------- */
      .addCase(Loginthunk.pending, (state) => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(Loginthunk.fulfilled, (state, action) => {
       state.user = action.payload.data;
        state.isAuthenticated=true
        state.isauthChecked=true
        state.loading.login = false;
        
      })
      .addCase(Loginthunk.rejected, (state, action) => {
        state.loading.login = false;
        state.error = action.payload;
      })

      /* -------- Resend OTP -------- */
      .addCase(Resendotpthunk.pending, (state) => {
        state.loading.resendOtp = true;
        state.error = null;
      })
      .addCase(Resendotpthunk.fulfilled, (state) => {
        state.loading.resendOtp = false;
      })
      .addCase(Resendotpthunk.rejected, (state, action) => {
        state.loading.resendOtp = false;
        state.error = action.payload;
      })


      /* -------- Resend OTP for Forgot Password-------- */

    .addCase(resendotpforgotpassthuk.pending, (state) => {
        state.loading.resendotpforgotpass = true;
        state.error = null;
      })
      .addCase(resendotpforgotpassthuk.fulfilled, (state) => {
        state.loading.resendotpforgotpass = false;
      })
      .addCase(resendotpforgotpassthuk.rejected, (state, action) => {
        state.loading.resendotpforgotpass = false;
        state.error = action.payload;
      })


      /* -------- Forgot Password -------- */
      .addCase(Forgetpasswordthunk.pending, (state) => {
        state.loading.forgotPass = true;
        state.error = null;
      })
      .addCase(Forgetpasswordthunk.fulfilled, (state) => {
        state.loading.forgotPass = false;
      })
      .addCase(Forgetpasswordthunk.rejected, (state, action) => {
        state.loading.forgotPass = false;
        state.error = action.payload;
      })

      /* -------- Verify Forgot OTP -------- */
      .addCase(verifypassotpthunk.pending, (state) => {
        state.loading.verifyPassOtp = true;
        state.error = null;
      })
      .addCase(verifypassotpthunk.fulfilled, (state) => {
        state.loading.verifyPassOtp = false;
      })
      .addCase(verifypassotpthunk.rejected, (state, action) => {
        state.loading.verifyPassOtp = false;
        state.error = action.payload;
      })

      /* -------- Reset Password -------- */
      .addCase(setnewpasswordthunk.pending, (state) => {
        state.loading.resetPassword = true;
        state.error = null;
      })
      .addCase(setnewpasswordthunk.fulfilled, (state) => {
        state.loading.resetPassword = false;
      })
      .addCase(setnewpasswordthunk.rejected, (state, action) => {
        state.loading.resetPassword = false;
        state.error = action.payload;
      })


      /*------------logout thunk------------ */

      .addCase(Logoutthunk.pending, (state) => {
        state.loading.logout = true;
        state.error = null;
      })
      .addCase(Logoutthunk.fulfilled, (state) => {
         state.isAuthenticated=false
         state.isauthChecked=true
        state.loading.logout = false;
      })
      .addCase(Logoutthunk.rejected, (state, action) => {
        state.loading.logout = false;
        state.error = action.payload;
      })


    
      /*------------user Auth Status thunk------------ */
    
      .addCase(authStatusthunk.pending, (state) => {
       state.loading.authStatus=true
        state.error = null;
      })
      .addCase(authStatusthunk.fulfilled, (state,action) => {
         state.user=action.payload.data
         state.isauthChecked=true;
        state.isAuthenticated=true;
      
        state.loading.authStatus=false
      })
      .addCase(authStatusthunk.rejected, (state, action) => {
      
        state.error = action.payload;
         state.loading.authStatus=false;
         state.isAuthenticated=false;
         state.isauthChecked=true

      })

  },
});



export default userAuthSlice.reducer;
