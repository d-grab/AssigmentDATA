import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'


const LoginPage = (props) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} = userLogin

    const redirect= props.location.search ? props.location.search.split('=')[1] : '/'

    //if We are already logged in 
   

    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect)
        }
      }, [props.history, userInfo, redirect])
    
      const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
      }
    
    
    return <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant='danger'>{error} </Message>}
        {loading && <Loading />}
        <Form onSubmit = {submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email}
                onChange={(e) =>setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password}
                onChange={(e) =>setPassword(e.target.value)}>
                    
                </Form.Control>
            </Form.Group>
            <Button className ='mt-3 btn-block btn-dark' type='submit' variant='primary' >
                Sign In 
            </Button>
        </Form>

        <Row className= 'py-2'>
            <Col>
            New User ? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>
            Register
            </Link>
            </Col>
        </Row>
    </FormContainer>
  
  
    
  
}

export default LoginPage