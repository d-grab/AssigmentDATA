import React, {useEffect} from 'react'
import {Row,Col,ListGroup,Image,Card,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import Checkout from '../components/Checkout'
import { createOrder } from '../actions/orderActions'

const MakeOrderPage = ({history}) => {
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }

    //Prices
    basket.itemsPrice =addDecimals( basket.basketItems.reduce((acc,item) => acc + item.price * item.qty,0))
    basket.deliveryPrice= basket.itemsPrice > 25 ? 0 : 5
    basket.totalPrice = (Number(basket.itemsPrice) + Number(basket.deliveryPrice)).toFixed(2)

    
     
    const orderCreate = useSelector (state =>state.orderCreate)
    const {order, success, error} = orderCreate

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
            
        }
        //eslint-disable-next-line
    }, [history, success])
    const makeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: basket.basketItems,
            deliveryAddress: basket.deliveryAddress,
            paymentMethod: basket.paymentMethod.paymentMethod,
            itemsPrice: basket.itemsPrice,
            deliveryPrice: basket.deliveryPrice,
            totalPrice: basket.totalPrice,
        }))
    }
  return (
    <>
        <Checkout stage1 stage2 stage3 stage4 />
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                   <h2>Delivery</h2>
                   <p>
                       <strong>Address: </strong>
                       {basket.deliveryAddress.address}, {basket.deliveryAddress.city},
                       {basket.deliveryAddress.postCode}, {basket.deliveryAddress.country}
                       
                       </p> 
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment</h2>
                    <strong>Method: </strong>
                    {basket.paymentMethod.paymentMethod}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Ordered Items</h2>
                    {basket.basketItems.lenght === 0 ? <Message>Your basket is empty</Message> : (
                        <ListGroup variant='flash'>
                            {basket.basketItems.map((item,index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name}
                                            fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/book/${item.book}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x {item.price} = {item.qty * item.price}
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
                              <Col>Books cost</Col>
                              <Col>£ {basket.itemsPrice}</Col>
                          </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                          <Row>
                              <Col>Delivery cost</Col>
                              <Col>£ {basket.deliveryPrice}</Col>
                          </Row>
                        </ListGroup.Item>
                          

                      <ListGroup.Item>
                          <Row>
                              <Col className='total'><h3>Total</h3></Col>
                              <Col className='total'><h3>£ {basket.totalPrice}</h3></Col>
                          </Row>
                      </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                      <ListGroup.Item>
                          <Button type='button' className='mt-3 btn-block btn-dark' disabled={basket.basketItems === 0} onClick={makeOrderHandler}>Make order</Button>
                          
                          
                      </ListGroup.Item>
                      
                  </ListGroup>
              </Card>
          </Col>
        </Row>
    </>
  )
}

export default MakeOrderPage