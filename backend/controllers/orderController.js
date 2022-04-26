import asyncHandler from 'express-async-handler'

import Order from '../models/order.js'



// @des Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req,res) => {
    const {orderItems, deliveryAddress,paymentMethod,itemsPrice,deliveryPrice,totalPrice} = req.body
    
    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        
    } else {
        const order = new Order({
            orderItems, user: req.user._id, deliveryAddress,paymentMethod,itemsPrice,deliveryPrice,totalPrice

        })
        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

// @des GET ORDER BY ID
// @route GET /api/orders/:id
// @access Private
// rooute for all books
const getOrderById = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )


    if(order) {
        res.json(order)
    }else {
        res.status(404)
        throw new Error('Order not found')
    }
})



const updateOrderStatus = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
  


    if(order) {
        order.paidAt = Date.now()
        order.isPaid = true
        
        order.paymentResult = {id:req.body.id, status:req.body.status, update_time:req.body.update_time, email_address:req.body.payer.email_address}
        const updatedOrder= await order.save()
        res.json(updatedOrder)
    }else {

        res.status(404)
        throw new Error('Order not found')
    }
})

// @des GET orders already made for user
// @route GET /api/orders/allorders
// @access Private
const getAllOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
    
})


// @des GET orders in admin panel
// @route GET /api/orders/
// @access Private
const getViewOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user','id name')
    res.json(orders)
    
})

// @des Update status to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateDeliverStatus = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
  


    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        
        
        
        const updatedOrder= await order.save()
        res.json(updatedOrder)
    }else {

        res.status(404)
        throw new Error('Order not found')
    }
})




export {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    getViewOrders,
    updateDeliverStatus,
}


