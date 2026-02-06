import React, { useState } from 'react'
import '../css/navbar.css'
import {NavLink,useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useDispatch,useSelector} from 'react-redux'
import { Loginthunk, Signupthunk } from './react-redux/features/userAuthSlice'
import {toast} from 'react-hot-toast'



function Login() {
    const [passhide,setPasshide]=useState(true)

    const data={email:"",password:""}
    const [formdata,setFormdata]=useState(data)
    const dispatch=useDispatch()
    const {login}=useSelector((state)=>state.userAuth.loading)
    const navigate=useNavigate()

  const handlepassvisibility=()=>{
    setPasshide(!passhide)
    console.log(passhide)
  }

  const handleinputs=(e)=>{
     setFormdata({...formdata,[e.target.name]:e.target.value})
     console.log({...formdata,[e.target.name]:e.target.value})
  }

  const submitform=async(e)=>{
     e.preventDefault();
    try{
        console.log("Sending data:", formdata)

         const data= await dispatch(Loginthunk(formdata)).unwrap()
    //  console.log(data.message)
     const {message}=data
     toast.success(message)
     console.log(message)
      navigate('/home',{
        state:{
          email:formdata.email,
          from:'/login'
        }
      })
       setFormdata({email:"",password:""})
    }
   
    catch(err){
      console.log(err)
    
      toast.error(err)

    }


  }

  return (
    <> 
      {
        login && 
        
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
                             maxHeight:"400px",
                             borderRadius:"30px",
                             marginTop:"80px",
                    //  boxShadow:"0 0 10px 0px black",
                             border:"none"
                             }}
                       onSubmit={submitform}>
                 <h1 className='mt-4 text-center'>Login</h1>

                
               

                 <div className='p-4 '>



                  

                 <div className="input-group mt-4">
                 <label className='input-group-text'
                        style={{paddingRight:"40px"}}>Email</label>
                 <input type="email"
                        className='form-control'
                        name='email'
                         value={formdata.email}
                        onChange={handleinputs} />
               </div>

                 <div className="input-group mt-4">
                 <label className='input-group-text'>Password</label>
                 <input type={`${passhide ? "password" :"text"}`}
                        className='form-control'
                        name='password'
                         value={formdata.password}
                        onChange={handleinputs} 
                        style={{paddingRight:"35px"}}/>
                 
                  <FontAwesomeIcon icon={['fa',`${passhide ? 'eye':'eye-slash'}`]} 
                                   style={{position:"absolute",
                                          margin:"3% 0 0 90%",
                                          zIndex:"5",
                                          overflowY:"hidden",
                                          cursor:"pointer"
                                   }}
                                   onClick={handlepassvisibility} />
               </div>

              {/* //////////// */}

               <p style={{fontSize:"15px",color:"gray"}} 
                   className='mt-3 text-end'>
               
                
                <NavLink to={'/forgetpass'} className="ms-2">
                  forgot password ?
                </NavLink>
              </p>
           

              <button
                     className='btn
                      bg-success 
                      text-light
                     
                       d-block
                       mt-5
                       m-auto
                     '
                     type='submit'

                     >Get Started</button>

                     
           
                 </div>
               

             </form>
        </div>


           
          </div>
        
    </>
  )
}

export default Login