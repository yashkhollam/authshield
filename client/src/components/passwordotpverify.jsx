





import React, { useState } from 'react'
import '../css/navbar.css'
import {NavLink,useLocation,useNavigate} from 'react-router-dom'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
 import {useDispatch,useSelector} from 'react-redux'
 import { verifypassotpthunk, resendotpforgotpassthuk } from './react-redux/features/userAuthSlice'
import {toast} from 'react-hot-toast'
  import '../css/form.css'
import { useRef } from 'react'
import { useEffect } from 'react'


function Passwordotpverify() {

const[input,setinput]=useState(new Array(6).fill(""))
const[inputArr,setInputArr]=useState(input) 
//  console.log(inputArr)   
const dispatch=useDispatch();
const location=useLocation()
const navigate=useNavigate()
 const email=location.state?.email


const {resendotpforgotpass}=useSelector((state)=>state.userAuth.loading)



 const refs=[useRef(),useRef(),useRef(),useRef(),useRef(),useRef()]

  
useEffect(()=>{
  if(!email){
    toast.error("email not found.Please try again");
    navigate('/forgetpass')
  }
},[email,navigate])

  const handleinputs=(e,index)=>{
     const value=e.target.value

     const copyArr=[...inputArr];

     copyArr[index]=value
     setInputArr(copyArr)

     if(index<inputArr.length-1){
         refs[index+1].current.focus()  
     }

    
  }

 const handlekey=(e,index)=>{
   const {key}=e
   const copyArr=[...inputArr]

   if(key==="ArrowRight"&& index<inputArr.length){
    refs[index+1].current.focus()
   }

   if(key==="ArrowLeft" && index>0){
     refs[index-1].current.focus()
   }


   if(key!=="Backspace")return

  

   if(copyArr[index]!==""){
    copyArr[index]=""
    setInputArr(copyArr)
    return
   }

   if(index > 0){
    copyArr[index-1]=""
    setInputArr(copyArr)
    refs[index-1].current.focus()
    return
   }
 }


    


  const submitform=async(e)=>{
   e.preventDefault();

   try{
    const otp=inputArr.join("")
    const formdata={otp:otp,email:email}
    console.log(formdata)
      const res=await dispatch(verifypassotpthunk(formdata)).unwrap()

      const {message}=res
      toast.success(message)
      navigate('/setnewpassword',{
        state:{
          email:email
        }
      })
   }

   catch(err){
    toast.error(err)
   } 

  }


  useEffect(()=>{
    refs[0].current.focus()
  },[])



  const resendotp = async () => {
      try {
        const formdata = { email: email };
        const data = await dispatch(resendotpforgotpassthuk(formdata)).unwrap();
        const { message } = data;
        toast.success(message);
        // setResendTimer(60);
      } catch (err) {
        toast.error(err);
      }
    };
  return (
    <> 
      {
         resendotpforgotpass && 
        
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
       
      
       
      }
       <div className="container-fluid" id='container'>
         {/* <h1 id='authhead'>AUTHSHIELD</h1> */}
        <div id='form-container'>
               <form className='form ps-4 pe-4' 
                     style={{
                             maxWidth:"400px",
                             width:"100%",
                             maxHeight:"350px",
                             borderRadius:"30px",
                             marginTop:"80px",
                    //  boxShadow:"0 0 10px 0px black",
                             border:"none"
                             }}
                       onSubmit={submitform}>
                 <h2 className='mt-4 text-center'>Verify OTP</h2>

                
               <p style={{fontSize:"15px",color:"gray"}} 
                   className='mt-3 text-center'>
               
              Enter teh 6 The verification code we sent <br/> to {email}
              </p> 
               

                 
                
        
             
             {/* <p></p> */}

             <div className='otp-container mt-4'>
               {
                   input.map((currevalue,index)=>{
                    return <input type="text"
                    key={index}
                     maxLength={1}
                     className='form-control inputs'
                     onChange={(e)=>handleinputs(e,index)}
                     value={inputArr[index]}
                     ref={refs[index]}
                     onKeyDown={(e)=>handlekey(e,index)}
                       />
                   })
               } 
                      

                       
                       
              </div>
        
       
              {/* //////////// */}

           

               <button
                     className='btn
                      bg-warning 
                      text-light
                     
                       d-block
                       mt-4
                       m-auto
                     '
                     type='submit'

                     >verify OTP</button>
<span className="d-flex gap-2 mt-4">
              Didn't receive OTP ?
             
            <button type="button"
                   onClick={resendotp}
                   style={{border:"none",
                    backgroundColor:"white",
                    color:"blue"}}>Resend OTP</button>
             
            </span>

           
                
               

             </form>
        </div>


           
          </div>
        
    </>
  )
}

export default Passwordotpverify