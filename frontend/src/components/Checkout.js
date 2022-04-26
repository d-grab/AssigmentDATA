import React from 'react'
import {Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Checkout = ({stage1,stage2,stage3,stage4}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {stage1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link className='first'  >Register</Nav.Link>
                </LinkContainer>
            ): (<Nav.Link disabled>Register</Nav.Link>) }
        </Nav.Item>
        <Nav.Item>
            {stage2 ? (
                <LinkContainer to='/delivery'>
                    <Nav.Link className='first'>Delivery</Nav.Link>
                </LinkContainer>
            ): (<Nav.Link disabled>Delivery</Nav.Link>) }
        </Nav.Item>
        <Nav.Item>
            {stage3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link className='first'>Payment</Nav.Link>
                </LinkContainer>
            ): (<Nav.Link disabled>Payment</Nav.Link>) }
        </Nav.Item>
        <Nav.Item>
            {stage4 ? (
                <LinkContainer to='/makeorder'>
                    <Nav.Link className='first'>Make order</Nav.Link>
                </LinkContainer>
            ): (<Nav.Link disabled>Make Order</Nav.Link>) }
        </Nav.Item>
    </Nav>
  )
}

export default Checkout