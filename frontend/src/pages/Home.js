import { useDispatch,  useSelector } from 'react-redux'
import React, { useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Product from '../components/Book'
import { listBooks } from '../actions/bookActions'




const Home = ({match}) => {
    const words= match.params.words
    const dispatch = useDispatch()
    
    const bookList = useSelector(state => state.bookList)
    const {loading, error, books} = bookList
//fetching books from the backend usnig dipsatch react-redux
    useEffect(() => {
        dispatch(listBooks(words))
        },[dispatch,words])

        

    return (
        <>
        <h1>All products</h1>
        {loading ?( <Loading /> ): error ?(<Message variant='danger'>{error}</Message> ):( <Row>
            {books.map(product => (
                <Col className= 'align-items-stretch d-flex' key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>)}
        
        </>
    )
}

export default Home