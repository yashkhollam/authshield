import React, { useState } from 'react'
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { userdatathunk ,deleteuserthunk,updateuserstatusthuk} from './react-redux/features/userdataSlice';
// import Edituser from './edituser';
import {toast} from 'react-hot-toast'



// const getallusers=async()=>{
//     const res=await 
// }



function Adminpanel() {
console.log("Admin panel mounted")

     const dispatch=useDispatch();
    //  const[isActive,setIsactive]=useState(true)
    const {useralldata}=useSelector((state)=>state.userdata)
   

    useEffect(()=>{

    
          dispatch(userdatathunk())
          },[dispatch])

   

//delete user
    const deleteuser=async(e,_id)=>{
       e.preventDefault()

    try{
        console.log(_id)
       await dispatch(deleteuserthunk(_id)).unwrap()

       }
       catch(err){
       
        toast.error(err)
      
       }
    }

const handleblock=async({_id,isActive})=>{
  try{
  console.log(_id)
   await dispatch(updateuserstatusthuk({
      id:_id,
      isActive:!isActive})).unwrap()

      
      //  toast.success()
  }

 



  catch(err){
   console.log(err) 
    toast.error(err)
  }
}

   
  return (
   <>
      <div className="container-fluid mt-5">
      
      <div className='table-responsive'>
       
                <table className='mt-3 table table-bordered mx-md-auto'
                        style={{maxWidth:"700px",
                                textAlign:"center",
                               
                              
                                
                                
                           

                        }}>
           
            <thead >
                <tr>
                    <th >Sr No</th>
                    <th style={{verticalAlign:"middle"}}>Name</th>
                    <th style={{verticalAlign:"middle"}}>email</th>
                    <th style={{verticalAlign:"middle"}}>verified</th>
                    <th style={{verticalAlign:"middle"}}>role</th>
                    <th style={{verticalAlign:"middle"}}>status</th>
                    <th  style={{verticalAlign:"middle"}}  colSpan={2}>actions</th>
                </tr>
            
            </thead>
            <tbody >
               {
                 Array.isArray(useralldata)?

                   useralldata.map((data,index)=>(
                        <tr key={index}  >
                            <td style={{verticalAlign:"middle"}}>{index+1}</td>
                            <td style={{verticalAlign:"middle"}}>{data.username}</td>
                            <td style={{verticalAlign:"middle"}}>{data.email}</td>
                            <td style={{verticalAlign:"middle"}}>{data.verified? "true" :"false"}</td>
                           
                           
                            <td style={{verticalAlign:"middle"}}>{data.role}</td>
                            <td style={{verticalAlign:"middle"}}>{data.isActive?"Active":"Blocked"}</td>
                             {/* <td>{data._id}</td> */}

                            
                            
                            <td>
                                <button className='btn bg-warning' onClick={()=>handleblock({_id:data._id,isActive:data.isActive})}>{data.isActive?"block":"unblock"}</button>
                            </td>

                            <td>
                                <button className='btn bg-danger text-light' onClick={(e)=>deleteuser(e,data._id)}>delete</button>
                            </td>

                        </tr>
                   ))
                 :(<tr><td>No user</td></tr>)
               }
            </tbody>
          </table>
        </div>
         
      </div>

     
   </>
  )
}

export default Adminpanel