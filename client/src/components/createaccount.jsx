import React, { useState } from 'react'
import '../css/form.css'
import {NavLink,useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useDispatch,useSelector} from 'react-redux'
import { Signupthunk } from './react-redux/features/userAuthSlice'
import {toast} from 'react-hot-toast'



function CreateAccount() {
    const [passhide,setPasshide]=useState(true)

    const data={username:"",email:"",password:""}
    const [formdata,setFormdata]=useState(data)
    const dispatch=useDispatch()
    const {signup}=useSelector((state)=>state.userAuth.loading)
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
         const data= await dispatch(Signupthunk(formdata)).unwrap()
    //  console.log(data.message)
     const {message}=data
     toast.success(message)
     console.log(message)
      navigate('/signupotpverify',{
        state:{
          email:formdata.email,
          from:'/'
        }
      })
       setFormdata({username:"",email:"",password:""})
    }
   
    catch(err){
     
      toast.error(err)

    }


  }

  return (
    <> 
      {
        signup && 
        
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
        <div id='form-container' >
               <form className='form' 
                     style={{
                             maxWidth:"400px",
                             width:"100%",
                             maxHeight:"460px",
                             borderRadius:"30px",
                             marginTop:"80px",
                    //  boxShadow:"0 0 10px 0px black",
                             border:"none"
                             }}
                       onSubmit={submitform}>
                 <h1 className='mt-4 text-center'>Create Account</h1>

                
                <p style={{fontSize:"15px",color:"gray"}} 
                   className='mt-2 text-center'>
                Already account!! Please 
                
                <NavLink to={'/login'} className="ms-2">
                  Login
                </NavLink>
              </p>

                 <div className='p-4 '>



                   <div className="input-group " >
                 <label className='input-group-text'
                        style={{paddingLeft:" 7px"}}>Username</label>
                 <input type="text"
                        className='form-control'
                        name='username'
                        value={formdata.username}
                        onChange={handleinputs} />
               </div>

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
           

              <button
                     className='btn
                      bg-success 
                      text-light
                     
                       d-block
                       mt-5
                       m-auto
                     '
                     type='submit'

                     >Create Account</button>

                     
           
                 </div>
               

             </form>
        </div>


           
          </div>
        
    </>
  )
}

export default CreateAccount