import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveDeliveryAddress } from '../actions/basketActions'
import Checkout from '../components/Checkout'


const DeliveryPage = ({history}) => {
  const basket = useSelector (state => state.basket)
  const {deliveryAddress} = basket

  const [address, setAddress] = useState(deliveryAddress.address|| '')
  const [postCode, setPostCode] = useState(deliveryAddress.postCode|| '')
  const [city, setCity] = useState(deliveryAddress.city|| '')
  const [country, setCountry] = useState(deliveryAddress.country|| '')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveDeliveryAddress({address,postCode,city,country}))
    history.push('/payment')
  }
  return (
    <FormContainer>
      <Checkout stage1 stage2/>
        <h1>Delivery</h1>
        <Form onSubmit = {submitHandler}>
        <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter address' 
                value={address}
                required
                onChange={(e) =>setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='postCode'>
                <Form.Label>Post Code</Form.Label>
                <Form.Control type='text' placeholder='Enter post code' 
                value={postCode}
                required
                onChange={(e) =>setPostCode(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter city' 
                value={city}
                required
                onChange={(e) =>setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter country' 
                value={country}
                required
                onChange={(e) =>setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button className ='mt-3 btn-block btn-dark' type="submit" variant="primary">
              Go Next 
            </Button>
        </Form>
    </FormContainer>
  )
}

export default DeliveryPage