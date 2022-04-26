import React, {useEffect, useState} from 'react'
import {Row,Col,ListGroup,Image,Card,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import axios from 'axios'
import Loading from '../components/Loading'
import { getOrderDetails, orderPay, deliverOrder } from '../actions/orderActions'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAYMENT_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderPage = ({match,history}) => {
    const orderId= match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()
    
   
    
    const orderDetails = useSelector ((state) =>state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPayment = useSelector ((state) =>state.orderPayment)
    const {loading:loadingPayment, success:successPayment}=orderPayment
    
    const orderDeliver = useSelector ((state) =>state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver}=orderDeliver

 

    const userLogin = useSelector ((state) =>state.userLogin)
    const {userInfo}=userLogin

   
    
    
    
   
    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(
          order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      }
    
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
        const PaypalScript = async() => {
            const {data:clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        
        if(!order ||successPayment|| successDeliver || order._id !== orderId) {
            dispatch({type: ORDER_PAYMENT_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
            
        } else if(!order.isPaid) {
            if(!window.paypal) {
                PaypalScript()
            }else {
                setSdkReady(true)
            }

        }
    }, [dispatch, orderId,  order,successPayment,successDeliver,history,userInfo]) 
    
    const PaymentHandler= (paymentResult) => {
        console.log(paymentResult)
        dispatch(orderPay(orderId,paymentResult))

    }

    const deliverHandler = ()=> {dispatch(deliverOrder(order))} 
  return loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> : <>
    <h1>Order {order._id}</h1>
    <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                   <h2>Delivery</h2>
                   <strong>User Name</strong> {order.user.name} 
                   <p><strong>User Email</strong> {order.user.email}</p>

                   
                   <p>
                       <strong>Address: </strong>
                       {order.deliveryAddress.address}, {order.deliveryAddress.city},
                       {order.deliveryAddress.postCode}, {order.deliveryAddress.country}
                       
                       </p> 
                       {order.isDelivered ? <Message variant='success'>Delivered on  {order.deliveredAt.substring(0,10)}</Message> : <Message variant='danger'>Not delivered yet !</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment</h2>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                    
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message> : <Message variant='danger'>Not paid</Message>}
                    
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Ordered Items</h2>
                    {order.orderItems.lenght === 0 ? <Message>Your Order is empty</Message> : (
                        <ListGroup variant='flash'>
                            {order.orderItems.map((item,index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name}
                                            fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/book/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x {item.price}  ={item.qty*item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
          </Col> 
          <Col md={4}>
              <Card>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                          <h2>Summary</h2>
                      </ListGroup.Item>

                      

                      <ListGroup.Item>
                          <Row>
                              <Col>Delivery cost</Col>
                              <Col>£ {order.deliveryPrice}</Col>
                          </Row>
                        </ListGroup.Item>
                        
                          

                      <ListGroup.Item>
                          <Row>
                              <Col className='total'><h3>Total</h3></Col>
                              <Col className='total'><h3>£ {order.totalPrice}</h3></Col>
                          </Row>
                      </ListGroup.Item>
                      {!order.isPaid && (
                          <ListGroup.Item>
                              {loadingPayment && <Loading />}
                              {!sdkReady ? <Loading />: (
                                  <PayPalButton amount={order.totalPrice}onSuccess={PaymentHandler}/>
                              )}
                          </ListGroup.Item>
                      )}
                      {loadingDeliver && <Loading />}
                      {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                          <ListGroup.Item>
                              <Button type='button' className='btn btn-block mt-3 btn-dark' onClick={deliverHandler}>
                                  Mark as Delivered
                              </Button>
                          </ListGroup.Item>
                      )}
                        
                  </ListGroup>
              </Card>
          </Col>
        </Row>
  </>
}

export default OrderPage