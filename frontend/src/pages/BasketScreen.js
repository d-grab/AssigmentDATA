
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import {Row,Col,ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {addToBasket, removeFromBasket} from '../actions/basketActions'

const BasketScreen = ({match, location, history}) => {
  

  



 

  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket)
  const {basketItems} = basket
  const checkoutHandler =() => {
    history.push('/login?redirect=delivery')
  }

  console.log(basketItems)
  const removeFromBasketHandler = (id) => {
    dispatch(removeFromBasket(id))
  }

  
  
  
  return (
    <>
    <Link className='btn btn-dark my-3'    to='/'>
    Go back to All products
    </Link>
    <Row>
      <Col md={8}>
        <h1> Shopping Basket</h1>
        {basketItems.length === 0 ? <Message>Your Basket is empty ! <Link to= '/'><p color='black'>Go back</p></Link></Message> : (
          <ListGroup variant ='flush'>
            {basketItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/book/${item.product}`}>{item.name}</Link>
                  
                  </Col>
                  <Col md={2}>
                    £{item.price}
                  </Col>
                  <Col md={2}>
                  <Form.Select as='select' value={item.qty} onChange={(e) => {dispatch(
                    addToBasket(item.product,Number( e.target.value))
                    )
                    history.push('/basket')
                    }}>

                                    {
                                    [...Array(item.stock).keys()].map((i) => (
                                        <option key={i + 1} value={i + 1}>
                                        {i +  1} 
                                        </option>
                                    ))}
                                </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromBasketHandler(item.product)}>
                    
                    <i className="fa-solid fa-trash" > </i> Delete
                   
                    </Button>
                  </Col>
                  
                  
                  
                  
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) }
      </Col>
      <Col md ={4}>
        <Card>
          <ListGroup variant ='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({basketItems.reduce((acc,item) => acc + item.qty,0)})
              items
              </h2>
              £{basketItems.reduce((acc,item) => acc +item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className ='btn-block btn-dark' disabled={basketItems.length ===0} onClick={checkoutHandler}>
                Proceed to checkout 
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>

      </Col>
      </Row>
      </>
  )
}

export default BasketScreen