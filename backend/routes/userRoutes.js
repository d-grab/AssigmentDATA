import express from 'express'
const router = express.Router()
import {authUSer, getUserProfile, registerUser,updateUserProfile,getAllUsers, deleteOneUser,updateOneUser,getOneUser} from '../controllers/userController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

router.route('/profile').get(protect,getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect,isAdmin,deleteOneUser).get(protect,isAdmin,getOneUser).put(protect,isAdmin,updateOneUser)
router.route('/').post(registerUser).get(protect,isAdmin,getAllUsers)
router.post('/login', authUSer)




export default router