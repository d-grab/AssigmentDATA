import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,

    },
    password: {
        type:String,
        required: true,

    },
    email: {
        type:String,
        unique:true,
        required: true,

    },
    

    isAdmin: {
        type:Boolean,
        default:false,
        

    }
}, {
    timestamps:true,
})
// checking if entered password (string) is eaual to bcrypted password already existing in database
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//middleware to encrpy password before we save
userSchema.pre('save', async function(next){
    //chech if it was modified if not hash password
    if(!this.isModified('password')) {
        next()
    }
    //to hash password
    const salt =await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Create model of user
const User = mongoose.model('User',userSchema)

export default User