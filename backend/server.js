import express from 'express'
import dotenv from 'dotenv'
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import connectDB from './models/db.js'
import path from 'path'
dotenv.config()

// app
const app = express()

//Database connection
connectDB()



app.use(express.json())
app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

// if in production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/frontend/build')))
//anythin what is not /api routes
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))

}else {
   // routes
app.get('/', (req,res) => {
    res.send ('Api is running')
}) 
}

// use port from .env or if not found use port 5000 anyway
const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`server running on port ${PORT}`))


