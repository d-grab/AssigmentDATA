import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {Link} from 'react-router-dom'
import {Row,Col, Image,ListGroup,Card,Button, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listBookDetails, createBookReview} from '../actions/bookActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { addToBasket } from '../actions/basketActions'
import { BOOK_NEW_REVIEW_RESET } from '../constants/bookConstants'



const BookScreen = ({ history, match}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const bookDetails = useSelector((state) => state.bookDetails)
    const {loading, error, book}= bookDetails

    const bookNewReview = useSelector((state) => state.bookNewReview)
    const {error:errorReview, success:successReview }= bookNewReview

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo}= userLogin

    useEffect(() => {
        if(successReview) {
            alert('New Review Added')
            setRating(0)
            setComment('')
            dispatch({type: BOOK_NEW_REVIEW_RESET})
        }
        dispatch(listBookDetails(match.params.id))
        
    }, [dispatch,match,successReview])

   const addToBasketHandler = () => {
    dispatch(addToBasket(book._id,qty))
    history.push('/basket')

   }

   const submitHandler=(e) => {
    e.preventDefault()
    dispatch(createBookReview(match.params.id, {rating,comment}))
}

    
  return (
  <>
  <Link className='btn btn-dark my-3'    to='/'>
      Go back
  </Link>
  {loading ? (<Loading />) : error ?<Message variant='danger'>{error}</Message> :(
      <>
    <Row>
    <Col md={6}>
        <Image src={book.image} alt={book.name} fluid />
    </Col>
    <Col md={3}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <h3>{book.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={book.rating} color='black' text={`reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
            <h3><strong>Price: £{book.price}</strong></h3>
            </ListGroup.Item>
            <ListGroupItem>
                <h3>Description:</h3>
                {book.description}
            </ListGroupItem>
        </ListGroup>
    </Col>
    <Col md={3}>
        <Card>
            <ListGroup variant='flash'>
                <ListGroup.Item>
                    <Row>
                        <Col>
                          Price:
                        </Col>
                        <Col>
                        <strong>Price: £{book.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
               

                <ListGroup.Item>
                    <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                       {book.stock > 0 ? 'In stock' : 'Out of stock'}
                        </Col>
                    </Row>
                </ListGroup.Item>

                {book.stock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>qty</Col>
                            <Col>
                                <Form.Select as='select' value={qty} onChange={(e) =>
                                setQty(e.target.value)}>

                                    {
                                    [...Array(book.stock).keys()].map((i) => (
                                        <option key={i + 1} value={i + 1}>
                                        {i +  1} 
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}
                <ListGroup.Item>
                    <Button onClick={addToBasketHandler} className='btn-dark btn-block' type='button'
                    disabled={book.stock === 0}
                     >
                    Add to basket
                    </Button>
                    

                </ListGroup.Item>
            </ListGroup>
        </Card>
    </Col>

</Row>
<Row>
    <Col md={6}>
        <h2>Reviews</h2>
        {book.reviews.length === 0 && <Message>No reviews</Message>}
        <ListGroup variant='flush'>
            {book.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                </ListGroup.Item>
            ))}
            <ListGroup.Item>
                <h2>Add a Review</h2>
                {errorReview && (<Message>{errorReview}</Message>)}
                {userInfo ? (<Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(val) => setRating(val.target.value)}>
                            <option value=''>Seleect Rating</option>
                            <option value='1'>1- Poor</option>
                            <option value='2'>2- Not bad</option>
                            <option value='3'>3- Fine</option>
                            <option value='4'>4- Good</option>
                            <option value='5'>5- Excelent</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='dark'>Submit your comment</Button>
                </Form>) : <Message>To write a review You need to  <Link to='/login'>Sign in</Link></Message>}
            </ListGroup.Item>
        </ListGroup>
    </Col>
</Row>
</>
  ) }
  
  </>
  
  )
}

export default BookScreen