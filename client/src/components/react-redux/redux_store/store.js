import {configureStore} from '@reduxjs/toolkit'
import Signupthunk from '../features/userAuthSlice.js'
import userdataSlice from '../features/userdataSlice.js'


export const store=configureStore({
    reducer:{
     userAuth:Signupthunk,
     userdata:userdataSlice
    }
})