import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/basketActions'
import Checkout from '../components/Checkout'


const PaymentPage = ({history}) => {
  const basket = useSelector (state => state.basket)
  const {deliveryAddress} = basket

  if(!deliveryAddress){
      history.push('/delivery')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')


  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod({paymentMethod}))
    history.push('/makeorder')
  }
  return (
    <FormContainer>
      <Checkout stage1 stage2 stage3/>
        <h1>Payment Method</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group>
                <Form.Label  as='legend'>Payment Method</Form.Label>
            
            <Col  >
                <Form.Check   type='radio' label='PayPal or Credit Card' id='Paypal' 
                name='paymentMethod' value='Paypal'
                checked onChange={(e)=> setPaymentMethod(e.target.value)}></Form.Check> 
            </Col>
            </Form.Group>

            <Button className ='mt-3 btn-block btn-dark' type="submit" variant="primary">
              Go Next 
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentPage