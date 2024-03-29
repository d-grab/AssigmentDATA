import React, {useState,useEffect} from 'react'

import {Form, Button, Row, Col,Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { MyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import Loading from '../components/Loading'
import { LinkContainer } from 'react-router-bootstrap'



const ProfilePage = ({location,history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { user } = userDetails
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
	
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderAllOrders = useSelector((state) => state.orderAllOrders)
    const { loading:loadingOrders, error:errorOrders, orders } = orderAllOrders
  

useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success ) {

        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails('profile'))
        dispatch(MyOrders())
        
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user,success])

	const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({id: user._id, name, email, password}))
    }
  }
	

    
    return <Row>
        <Col md={3}>
        <h1>User profile</h1>
        {message && <Message variant='danger'>{message} </Message>}
        {success && <Message variant='success'>Profile Updated Successfully ! </Message>}
        
        <Form onSubmit = {submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name}
                onChange={(e) =>setName(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email}
                onChange={(e) =>setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password}
                onChange={(e) =>setPassword(e.target.value)}>
                    
                </Form.Control>
                
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                onChange={(e) =>setConfirmPassword(e.target.value)}>
                    
                </Form.Control>
                
            </Form.Group>
            <Button  className ='mt-3 btn-block btn-dark' type='submit' variant='primary' >
                Update
            </Button>
        </Form>
        </Col>
        <Col md={9}>
            <h2 className='orders'> My orders</h2>
            {loadingOrders? <Loading /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>: (
              <Table  bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>TOTAL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0,10)}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0,10) : 'not paid yet'}</td>
                      <td>{order.isDelivered ? order.deliveredAt : 'not delivered yet'}</td>
                      <td>£{order.totalPrice}</td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='dark'>Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
        </Col>
    </Row>
  
    
  
}
export default ProfilePage