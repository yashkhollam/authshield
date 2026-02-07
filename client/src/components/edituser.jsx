import React from 'react'

function Edituser({user,onClose}) {

    console.log("hello")
    console.log(user)
  return (
    <>
      <div className="container">
         <form action="">
            <div className='input-group'>
              <label className='input-group-text'>username</label>

              <input type="text" 
                     className='form-control' />
            </div>

           
             <div className='input-group'>
              <label className='input-group-text'>role</label>

              <input type="text" 
                     className='form-control' />
            </div>
         </form>
      </div>
    </>
  )
}

export default Edituser