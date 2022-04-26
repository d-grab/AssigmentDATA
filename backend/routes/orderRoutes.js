import express from 'express'
const router = express.Router()
import {addOrderItems, getOrderById, updateOrderStatus, getAllOrders, getViewOrders,updateDeliverStatus} from '../controllers/orderController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect,isAdmin,getViewOrders)
router.route('/allorders').get(protect,getAllOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderStatus)
router.route('/:id/deliver').put(protect, isAdmin, updateDeliverStatus)



export default router