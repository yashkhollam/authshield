import React, { useState } from 'react'
import '../css/navbar.css'
import {NavLink,useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useDispatch,useSelector} from 'react-redux'
import { Forgetpasswordthunk } from './react-redux/features/userAuthSlice'
import {toast} from 'react-hot-toast'



function Forgetpassword() {


    
    const [formdata,setFormdata]=useState({email:""})
    const dispatch=useDispatch()
    const {forgotPass}=useSelector((state)=>state.userAuth.loading)
    const navigate=useNavigate()

  const handleinputs=(e)=>{
     setFormdata({...formdata,[e.target.name]:e.target.value})
    //  console.log({...formdata,[e.target.name]:e.target.value})
  }

  const submitform=async(e)=>{
     e.preventDefault();
    
    
    try{
       

         const data= await dispatch(Forgetpasswordthunk(formdata)).unwrap()
    //  console.log(data.message)
     const {message}=data
     toast.success(message)
    //  console.log(message)
      navigate('/passotpverify',{
        state:{
          email:formdata.email,
          from:'/forgetpass'
        }
      })
       setFormdata({email:""})
    }
   
    catch(err){
      console.log(err)
    
      toast.error(err)

    }


  }

  return (
    <> 
      {
        forgotPass && 
        
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
             <div className="spinner-border" role="status"
/>
        </div>
       
      
       
      }
       <div className="container-fluid" id='container'>
         {/* <h1 id='authhead'>AUTHSHIELD</h1> */}
        <div id='form-container'>
               <form className='form' 
                     style={{
                             maxWidth:"400px",
                             width:"100%",
                             maxHeight:"300px",
                             borderRadius:"30px",
                             marginTop:"80px",
                    //  boxShadow:"0 0 10px 0px black",
                             border:"none"
                             }}
                       onSubmit={submitform}>
                 <h2 className='mt-4 text-center'>Verify OTP</h2>

                
               <p style={{fontSize:"15px",color:"gray"}} 
                   className='mt-3 text-center'>
               
              Enter your register email so we can send you password reset otp
              </p> 
               

                 <div className='p-4 '>



                  

                 <div className="input-group ">
                 <label className='input-group-text'
                        style={{paddingRight:"40px"}}>Email</label>
                 <input type="email"
                        className='form-control'
                        name='email'
                         value={formdata.email}
                        onChange={handleinputs} />
               </div>

                

              {/* //////////// */}

           

              <button
                     className='btn
                      bg-success 
                      text-light
                     
                       d-block
                       mt-3
                       m-auto
                     '
                     type='submit'

                     >get OTP</button>

                     
           
                 </div>
               

             </form>
        </div>


           
          </div>
        
    </>
  )
}

export default Forgetpassword