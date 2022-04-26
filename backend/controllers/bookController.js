import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'



// @des Fetch all
// @route GET /api/books
// @access Public
// rooute for all books
const getBooks = asyncHandler(async (req,res) => {
    const words= req.query.words ? {
        name:{
            $regex:req.query.words,
            $options: 'i',
        }
    } : {}
    const books = await Book.find({...words})
    
    res.json(books)
})

// @des Fetch single book
// @route GET /api/books/:id
// @access Public
// route for 1 book
const getBookById = asyncHandler(async (req,res) => {
    const book = await Book.findById(req.params.id)

    if (book) {
    res.json(book)
    } else {
        res.status(404).json({message: 'Book not found'})
    }
})
// @des Delete a single book
// @route DELETE /api/books/:id
// @access Private and Admin only
// route for 1 book
// Any admin can add and delete products
const deleteBookById = asyncHandler(async (req,res) => {
    const book = await Book.findById(req.params.id)

    if (book) {
        await book.remove()
        res.json({message: 'Book deleted successfully'})
    } else {
        res.status(404).json({message: 'Book not found'})
    }
})

// @des Create a book
// @route POST /api/books/
// @access Private and Admin only

const createBook = asyncHandler(async (req,res) => {
    const book = new Book({
        user: req.user._id,
        name: 'sample name',
        image: 'images/sample.jpg',
        author: 'sample aouthor',
        narrated_by: 'sample narrated',
        category:'sample category',
        duration: '0hrs',
        type: 'sample type',
        price: 0,
        stock: 0,
        rating: '0',
        numReviews: 0,
    })

    const createdBook = await book.save()
    res.status(201).json(createdBook)
})

// @des Update a single book
// @route POST /api/books/:id
// @access Private and Admin only
const updateBook = asyncHandler(async (req,res) => {
    const {name,image,author,narrated_by,duration,type,price,stock,}= req.body
    const book = await Book.findById(req.params.id)

    if(book) {

        book.name = name
        book.image = image
        book.author = author
        book.narrated_by = narrated_by
        book.duration = duration
        book.type = type
        book.price = price
        book.stock = stock

    const updatedBook = await book.save()
    res.json(updatedBook)

    }else {
        res.status(404)
        throw new Error ('Book not found')
    }

    
})


// @des Create a single review
// @route POST /api/books/:id/review
// @access Private and Admin only
const createReviewBook = asyncHandler(async (req,res) => {
    const {rating, comment}= req.body
    const book = await Book.findById(req.params.id)
//if book exist, check if user submited reviews
    if(book) {
        const reviewed = book.reviews.find(rev => rev.user.toString() === req.user._id.toString())

        if(reviewed) {
            res.status(400)
            throw new Error('You reviewed this book already')
        }
        //if no review create one
        const review= {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user:req.user._id
        }
        
        book.reviews.push(review)
        book.numReviews = book.reviews.length
        //update number of reviews
        

        book.rating = book.reviews.reduce((acc, bk) => bk.rating + acc, 0)/ book.reviews.length

        await book.save()
        res.status(201).json({message:'Your review has been added'})
    }else {
        res.status(404)
        throw new Error ('Book not found')
    }

    
})

export {
    getBooks,
    getBookById,
    deleteBookById,
    createBook,
    updateBook,
    createReviewBook,
}