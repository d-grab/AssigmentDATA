import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Navbar, Nav, Container, NavDropdown, } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {logout} from '../actions/userActions'
import Filter from './Filter'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin= useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header><Navbar bg="dark" variant="dark" expand={false} collapseOnSelect  >
      
    <Container > 
      
      <LinkContainer to='/'>
      <Navbar.Brand ><strong><h3 >Student Books</h3>  </strong></Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" >
      < Filter />
        
      <Nav className="ms-auto">
        <LinkContainer  to='/basket' className="ms-auto">
        <Nav.Link className='icon'><i className= "fas fa-shopping-cart" ></i>     Basket</Nav.Link>
        </LinkContainer>
        {userInfo ? (
    
          <NavDropdown  title={userInfo.name} id ='username' menuVariant="dark"  className="ms-auto">
            <LinkContainer to= '/profile'>
              <NavDropdown.Item className="ms-auto"  >Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : <LinkContainer to='/login'>
        <Nav.Link className="ms-auto"><i className = "fas fa-user"></i>  Login</Nav.Link>
        </LinkContainer>} 
        {userInfo && userInfo.isAdmin&&  (
          <NavDropdown  title='Admin Panel' id ='adminmenu' menuVariant="dark" className="ms-auto">
          <LinkContainer to= '/admin/userlist'>
            <NavDropdown.Item >Edit Users</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to= '/admin/productlist'>
            <NavDropdown.Item >Edit Books</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to= '/admin/orderlist'>
            <NavDropdown.Item >Edit Orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
        )}
        
        </Nav> 
        </Navbar.Collapse>
    </Container>
  </Navbar></header>
  )
}

export default Header