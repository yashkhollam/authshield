import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const userdatathunk=createAsyncThunk('userdata/getalluserdata',async(_,{rejectWithValue})=>{
  try{
     const res=await axios.get(`${import.meta.env.VITE_API_URL}/userdata/alluser`,{withCredentials:true})
      console.log("from thunk",res.data)
     return res.data
  }

  catch(err){
    return rejectWithValue(err.response?.data)
  }
})


//getuserbyId



export const getuserbyIdthunk=createAsyncThunk('userdata/getuserbyId',async(_id,{rejectWithValue})=>{
  try{
     const res=await axios.get(`${import.meta.env.VITE_API_URL}/getuserbyId/${_id}`,{withCredentials:true})
    //  console.log("from thunk",res.data)
     return res.data
  }

  catch(err){
    return rejectWithValue(err.response?.data)
  }
})


//update user

export const updateuserthunk=createAsyncThunk('userdata/updateuser',async(_id,{rejectWithValue})=>{
  try{
     const res=await axios.patch(`${import.meta.env.VITE_API_URL}/updateuser/${_id}`,{withCredentials:true})
    //  console.log("from thunk",res.data)
     return res.data
  }

  catch(err){
    return rejectWithValue(err.response?.data)
  }
})




export const deleteuserthunk=createAsyncThunk('userdata/deleteuser',async(_id,{rejectWithValue})=>{
  try{
      // console.log("id from slice",_id)
      await axios.delete(`${import.meta.env.VITE_API_URL}/userdata/deleteuser/${_id}`,{withCredentials:true})
    //  console.log("from thunk",res.data)
     return _id
  }

  catch(err){
     const {message}=err.response?.data;
    return rejectWithValue(message)
  }
})




export const updateuserstatusthuk=createAsyncThunk('userdata/updateuserstatus',async(data,{rejectWithValue})=>{
  try{
    
    const res=  await axios.patch(`${import.meta.env.VITE_API_URL}/userdata/updateuserstatus/${data.id}`,{isActive:data.isActive},{withCredentials:true})
 


     return res.data
  }

  catch(err){
    //  console.log(err.response?.data?.message)
     const {message}=err.response?.data;
    
    return rejectWithValue(message)
  }
})


const userdataSlice=createSlice({
    name:"userdata",
    initialState:{
        useralldata:[],
        user:null,
        loading:{
            userdataloading:false,
            userdeleteloading:false,
            userstatusloading:false
        },
        error:null
    },

    extraReducers:(builder)=>{
        builder.
       
           addCase(userdatathunk.pending,(state)=>{
              state.loading.userdataloading=true
             
           })
            .addCase(userdatathunk.fulfilled,(state,action)=>{
              state.useralldata=action.payload.data
                state.loading.userdataloading=false
              
           })
            .addCase(userdatathunk.rejected,(state,action)=>{
              state.loading.userdataloading=false
              state.error=action.payload
           })


           //get user by id

             .addCase(getuserbyIdthunk.pending,(state)=>{
              state.loading.userdataloading=true
             
           })
            .addCase(getuserbyIdthunk.fulfilled,(state,action)=>{
                state.user=action.payload.data
                state.loading.userdataloading=false
              
           })
            .addCase(getuserbyIdthunk.rejected,(state,action)=>{
              state.loading.userdataloading=false
              state.error=action.payload
           })
        //  delete user



           .addCase(deleteuserthunk.pending,(state)=>{
              state.loading.userdeleteloading=true
             
           })
            .addCase(deleteuserthunk.fulfilled,(state,action)=>{
              
               
                    const deletedId=action.payload
                    state.useralldata=state.useralldata.filter((item)=>item._id!==deletedId)
                    state.loading.userdeleteloading=false 
            
           })
            .addCase(deleteuserthunk.rejected,(state,action)=>{
              state.loading.userdeleteloading=false
              state.error=action.payload
           })


           //update user

           .addCase(updateuserthunk.pending,(state)=>{
              state.loading.userdeleteloading=true
             
           })
            .addCase(updateuserthunk.fulfilled,(state,action)=>{
              
               
                    const updateduser=action.payload
                    state.useralldata=state.useralldata.map((item)=>item._id===updateduser?updateduser:state.useralldata)
                    state.loading.userdeleteloading=false 
            
           })
            .addCase(updateuserthunk.rejected,(state,action)=>{
              state.loading.userdeleteloading=false
              state.error=action.payload
           })



           //updateuserstatusthuk


           .addCase(updateuserstatusthuk.pending,(state)=>{
              state.loading.userstatusloading=true
              state.error=null
             
           })
            .addCase(updateuserstatusthuk.fulfilled,(state,action)=>{
              
                const{_id,isActive}=action.payload.data
                    
                
                    const user=state.useralldata.find((user)=>user._id===_id)
                  
                    if(user){
                      user.isActive=isActive
                    }
                    state.loading.userstatusloading=false 
            
           })
            .addCase(updateuserstatusthuk.rejected,(state,action)=>{
              state.loading.userstatusloading=false
              state.error=action.payload
           })



        

    }
   
    
})

export default userdataSlice.reducer