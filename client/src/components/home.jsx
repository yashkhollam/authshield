
import React from 'react'
import { useSelector } from 'react-redux'

function Home() {

 const {user}=useSelector((state)=>state.userAuth)

const {username,email,role,isActive}=user
// console.log(user)

  return (
  
    <div className="container-fluid "
        style={{display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                 height:"100vh",
                 color:"blue"
        }}>
    
    
         <h1>{`Welcome , ${username.toUpperCase()} 👏🏼👏🏼`}</h1>

        
       <br/>
        
       <h2>{`Email: ${email}`}</h2>
       <h2>{`Role: ${role}`}</h2>
      
       
    </div>
  )
}

export default Home