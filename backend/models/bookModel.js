import mongoose from 'mongoose'
const reviewSchema = mongoose.Schema({
    name: { type: String, required: true},
    rating : { type: Number, required: true,},
    comment: { type: String, required: true,},
    //assigning user for the review
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const bookSchema = mongoose.Schema({
//to see which user created which product
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    name: {
        type:String,
        required: true,

    },
    image: {
        type:String,
        required: true,

    },
    author: {
        type:String,
        required: true,

    },
    narrated_by: {
        type:String,
        required: true,

    },
    duration: {
        type:String,
        required: false,

    },
    type: {
        type:String,
        required: true,

    },
    category: {
        type:String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
        default: 0.0,

    },
    description:{
        type: String,
        required: false,
        
    },
    stock: {
        type:Number,
        required: false,
        default: 0,

    },
    reviews: [reviewSchema],
    

    
    rating: {
        type:Number,
        required: true,

    },
    numReviews: {
        type:Number,
        required: true,
        default: 0,

    }
    
}, {
    timestamps:true
})

// Create model of user
const Book = mongoose.model('Book', bookSchema)

export default Book