import React, { useEffect } from 'react'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import CreateAccount from './components/createaccount'
import Login from './components/login'
import Passwordotpverify from './components/passwordotpverify'
import Signupotpverify from './components/signupotpverify'
import Forgetpassword from './components/forgetpassword'
import Home from './components/home.jsx'
import {Toaster} from 'react-hot-toast'
import Setnewpassword from './components/setnewpassword.jsx'
import Adminpanel from './components/adminpanel.jsx'
 import { useDispatch } from 'react-redux'
import { authStatusthunk } from './components/react-redux/features/userAuthSlice.js'
import ProtectedRoutes from './components/protectedRoutes.jsx'


function App() {

const dispatch=useDispatch()

useEffect(()=>{
  dispatch(authStatusthunk())
},[dispatch])


const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<CreateAccount/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/home",
        element:
        
          <ProtectedRoutes >
              <Home/>
          </ProtectedRoutes>
         
      },
      {
        path:'/forgetpass',
        element:<Forgetpassword/>
      },
      {
        path:'/passotpverify',
        element:<Passwordotpverify/>
      },
      {
        path:'/signupotpverify',
        element:<Signupotpverify/>
      },
      {
        path:'/setnewpassword',
        element:<Setnewpassword/>
      },

      {
        path:'/adminpanel',
        element:
        <ProtectedRoutes role="admin">
           <Adminpanel/>
        </ProtectedRoutes>
        
      }
    ]
  }
])

  return (
   <>
      <RouterProvider router={router}/>
     
         <Toaster 
                 position='top-center'
                 reverseOrder={true}
                 
                 
                 toastOptions={{
                  duration:3000,
                  style:{
                    marginTop:"30px"
                  }
                 }}/>
    
   </>
  )
}

export default App