import {Router} from 'express' 
 import roleAuthorization from '../middleware/roleAuthorization.js'
  import userAuthentication from '../middleware/userAuthentication.js'
import {deleteuser, getallusers, getuserbyId, updateuser, updateuserstatus} from '../controller/getallusers.js'

const userdataroute=Router()
// 

userdataroute.get('/alluser',userAuthentication,roleAuthorization,getallusers)
// userdataroute.get('/getuserbyId/:id',getuserbyId)
userdataroute.delete('/deleteuser/:id',userAuthentication,roleAuthorization,deleteuser)
userdataroute.patch('/updateuser/:id',updateuser)
userdataroute.patch('/updateuserstatus/:id',userAuthentication,roleAuthorization,updateuserstatus)

export default userdataroute