import React, { useState } from 'react'
import '../css/navbar.css';
import { NavLink, replace, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logoutthunk } from './react-redux/features/userAuthSlice';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {
 const [ishamburgershide,setIshamburgershide]=useState(false)
const dispatch=useDispatch()
const navigate=useNavigate()

const {isAuthenticated,user,loading}=useSelector((state)=>state.userAuth)



const handlenavbar=()=>{
   setIshamburgershide(!ishamburgershide)
}

if(loading.authStatus){
   return null
}

const logoutuser=async()=>{
  try{
        const res= await dispatch(Logoutthunk()).unwrap()
     const{message}=res
     toast.success(message)
     navigate('/login',{replace:true} )

  }
  catch(err){
      toast.error(err)
  }
}

// console.log(user.role)
     
  


  return (
    <>
      <div className="container-fluid" id='container'  >
        <div className="row">
            <div className="col-12 p-0 " style={{display:"flex",justifyContent:"center"}} >
                <nav className='navbar'>
                  <div>
                       <FontAwesomeIcon icon={['fas','bars']} 
                          className='hamburgerIcon'
                          onClick={handlenavbar}/>
                  </div>
                  


                    <ul className={`${ishamburgershide ? "res_group_list" :"group_list"}`}>


                     { isAuthenticated &&(
                           <li className='list-item'>
                             <NavLink to={'/home'}
                             className={"navlink"}>home</NavLink>
                           </li>
                      )}



                        <li className='list-item'>
                            <NavLink to={'/'} 
                                    //  className={({isActive})=>isActive? 'nav-link-active' : "navlink"}
                                    className={"navlink"}
                                  
                                     >signup</NavLink>
                        </li>

                        {/* <li className='list-item'>
                             <NavLink to={'/signupotpverify'} 
                             className={"navlink"}>
                                signupotpverify</NavLink></li> */}
                      {
                        !isAuthenticated ?
                        <li className='list-item'>
                             <NavLink to={'/login'} className={"navlink"} >login</NavLink>
                        </li>
                        : <li className='list-item' onClick={logoutuser}>
                            Logout
                        </li>
                      }
                        


                        {/* <li className='list-item'>
                             <NavLink to={'/forgetpass'}
                             className={"navlink"}>forgetpassword</NavLink>
                        </li> */}

                         {/* <li className='list-item'>
                             <NavLink to={'/passotpverify'}
                             className={"navlink"}>
                                passwordotpverify</NavLink>
                        </li>

                        <li className='list-item'>
                             <NavLink to={'/setnewpassword'}
                             className={"navlink"}>
                                Setnewpassword</NavLink>
                        </li> */}
                      
                     
                      
                      { isAuthenticated&&user&&user.role==="admin"&&(
                           <li className='list-item'>
                             <NavLink to={'/adminpanel'}
                             className={"navlink"}>adminpanel</NavLink>
                           </li>
                      )}
                       

                       
                     
                    </ul>
                    
                </nav>
            </div>
        </div>
      </div>
    </>
  )
}

export default Navbar