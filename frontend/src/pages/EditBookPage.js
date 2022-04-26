import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import FormContainer from '../components/FormContainer'
import { listBookDetails, updateBook } from '../actions/bookActions'
import { BOOK_UPDATE_RESET } from '../constants/bookConstants'

const EditBookPage = ({match,history}) => {
    const bookId=match.params.id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [author, setAuthor] = useState('')
    const [narrated_by, setNarrated_By] =useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    

    const dispatch = useDispatch()

    const bookDetails = useSelector((state) => state.bookDetails)
    const {loading,error,book} = bookDetails

    const bookUpdate = useSelector((state) => state.bookUpdate)
    const {loading: loadingUpdate,error: errorUpdate, success:successUpdate} = bookUpdate

   useEffect(() => {
        if (successUpdate) {
            dispatch({type: BOOK_UPDATE_RESET})
            history.push(`/admin/productlist`)
        }else {
            if(!book.name|| book._id !== bookId) {
                dispatch(listBookDetails(bookId))
            }else {
                setName(book.name)
                setImage(book.image)
                setAuthor(book.author)
                setNarrated_By(book.narrated_by)
                setType(book.type)
                setCategory(book.category)
                setPrice(book.price)
                setStock(book.stock)
            }
        }
    
        
    }, [dispatch,bookId,book,history,successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateBook({
        _id: bookId,
        name,
        image,
        author,
        narrated_by,
        type,
        category,
        price,
        stock
    }))
    
  }
    
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-dark my-3'>
                go Back
            </Link>
            <FormContainer>
        <h1>Edit a Book</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loading />: error? <Message variant='danger'>{error}</Message> :(
            <Form onSubmit = {submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name}
                onChange={(e) =>setName(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='text' placeholder='Enter URL for image' value={image}
                onChange={(e) =>setImage(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='author'>
                <Form.Label>Author</Form.Label>
                <Form.Control type='text' placeholder='Enter Author' value={author}
                onChange={(e) =>setAuthor(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='narrated_by'>
                <Form.Label>Narrated By</Form.Label>
                <Form.Control type='text' placeholder='Enter narrator' value={narrated_by}
                onChange={(e) =>setNarrated_By(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='type'>
                <Form.Label>Type</Form.Label>
                <Form.Control type='text' placeholder='Enter a type' value={type}
                onChange={(e) =>setType(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder='Enter category' value={category}
                onChange={(e) =>setCategory(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='Enter a price' value={price}
                onChange={(e) =>setPrice(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='stock'>
                <Form.Label>Stock</Form.Label>
                <Form.Control type='number' placeholder='Enter number in stock' value={stock}
                onChange={(e) =>setStock(e.target.value)}>

                </Form.Control>
            </Form.Group>

            
            <Button className ='mt-3 btn-block btn-dark' type='submit' variant='primary' >
                Update
            </Button>
        </Form>
        )}
        

    </FormContainer>
        </>
    )
 
}
export default EditBookPage