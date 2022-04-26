import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    //embeded object to display a list of ordered items
    orderItems: [{
        name: {type : String, required: true,},
        qty: {type : Number, required: true,},
        image: {type : String, required: true,},
        price: {type : Number, required: true,},
        product: {type :mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    }],
    deliveryAddress: {
        address: {type: String, required: true},
        postCode: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},

    },
    //paymentMethod to create different methods of payment
    paymentMethod: {
        type:String,
        required: false,
        
    },
    paymentResult: {
        id: {type:String},
        status: {type:String},
        update_time: {type:String},
        email_address: {type:String}
    },
    
    deliveryPrice: {
        type:Number,
        default:0.0,
    },
    totalPrice: {
        type:Number,
        default:0.0,
    },
    isPaid: {
        type:Boolean,
        required: true,
        default : false,
    },
    paidAt: {
        type:Date,
        
    },
    isDelivered: {
        type:Boolean,
        required: true,
        default : false,
    },
    deliveredAt: {
        type:Date,
        
    },
    
}, {
    timestamps:true
})

// Create model of user
const Order = mongoose.model('Order',orderSchema)

export default Order