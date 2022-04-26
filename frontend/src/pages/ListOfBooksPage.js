
import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button,Table,Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'


import { listBooks, removeBook, createBook } from '../actions/bookActions'
import { BOOK_CREATE_RESET } from '../constants/bookConstants'

const ListOfBooksPage = ({history}) => {
    const dispatch= useDispatch()

    const bookList = useSelector(state => state.bookList)
    const {loading,error,books} = bookList

    const bookRemove = useSelector(state => state.bookRemove)
    const {loading: loadingRemove,error: errorRemove,success:successRemove} = bookRemove

    const bookCreate = useSelector(state => state.bookCreate)
    const {loading: loadingCreate,error: errorCreate,success:successCreate, book:createdBook} = bookCreate
    

    useEffect(() => {
        dispatch({type: BOOK_CREATE_RESET})
        
        if(successCreate) {
            history.push(`/admin/book/${createdBook._id}/edit`)
        }else {

        }dispatch(listBooks())
    }, [dispatch,history,successRemove,successCreate,createdBook])

    const deleteHandler = (id) => {
        dispatch(removeBook(id))
    }
    const createBookHandler = () => {
        dispatch(createBook())
        
      }
        

  return (
    <>
    <Row className='align-items-center'>
        <Col>
        <h1>Books list</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
            <Button className='my-3 btn-dark text-right' onClick={createBookHandler}>
               Add New Book 
            </Button>
        </Col>
    </Row>
    {loadingRemove && <Loading />}
    {errorRemove && <Message variant='danger'>{errorRemove}</Message>}
    {loadingCreate && <Loading />}
    {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
    {loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Type</th>
                    <th>Edit / Delete</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book._id}>
                        <td>{book._id}</td>
                        <td>{book.name}</td>
                        <td>£{book.price}</td>
                        <td>{book.category}</td>
                        <td>{book.author}</td>
                        <td>{book.type}</td>
                        <td>
                            <LinkContainer to={`/admin/book/${book._id}/edit`}>
                                <Button variant='dark' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                                
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() =>
                            deleteHandler(book._id)}>
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
                    
                    
                
                ))}
            </tbody>
           
        </Table>
        
    )}
    <Row className='align-items-center'>
        
        <Col className='d-flex justify-content-end'>
            <Button className='my-3 btn-dark text-right' onClick={createBookHandler}>
               Add New Book 
            </Button>
        </Col>
    </Row>
    </>
  )
}

export default ListOfBooksPage