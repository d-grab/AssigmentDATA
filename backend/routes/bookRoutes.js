import express from 'express'
import { protect, isAdmin} from '../middleware/authMiddleware.js'
import {getBooks,getBookById, deleteBookById,createBook,updateBook, createReviewBook} from '../controllers/bookController.js'

const router = express.Router()

router.route('/').get(getBooks).post(protect,isAdmin,createBook)
router.route('/:id/reviews').post(protect,createReviewBook)
router.route('/:id').get(getBookById).delete(protect,isAdmin,deleteBookById).put(protect,isAdmin,updateBook)


export default router