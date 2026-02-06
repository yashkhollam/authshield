import React from 'react'



import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


function ProtectedRoutes({children,role}) {

const {isAuthenticated,isauthChecked,user}=useSelector((state)=>state.userAuth)  


if(!isauthChecked){
   console.log("loder start")
    return (
           <div
                    style={{
          position:"absolute",
            // margin: "100px 0 0 0"
            display:"flex",
            justifyContent:"center",
           alignItems:"center",
           top:"0",
           left:"0",
           width:"100vw",
           height:"100vh",
           zIndex:"999",
            background: "rgba(255,255,255,0.4)",
        }}>
             <div className="spinner-border" role="status"/>
        </div>

    )
}

if(!isAuthenticated){
    console.log("not auth")
    return <Navigate to='/login' replace />
}

if(role&&user?.role!==role){
   return <Navigate to='/login' replace />
}



 return children
      

  
}

export default ProtectedRoutes