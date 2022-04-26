import React from 'react'
import { Container  } from 'react-bootstrap'
import Header from './components/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home'
import BookScreen from './pages/BookScreen'
import BasketScreen from './pages/BasketScreen'
import LoginPage from './pages/LoginPage';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import DeliveryPage from './pages/DeliveryPage';
import PaymentPage from './pages/PaymentPage';
import MakeOrderPage from './pages/MakeOrderPage';
import OrderPage from './pages/OrderPage';
import ListOfUsersPage from './pages/ListOfUsersPage';
import EditUserPage from './pages/EditUserPage';
import ListOfBooksPage from './pages/ListOfBooksPage';
import EditBookPage from './pages/EditBookPage';
import ListOfOrdersPage from './pages/ListOfOrdersPage';
const App =()=> {
  return (
    <Router>
    <Header />
    
      <Container >
        <Route path='/' component={Home} exact/>
        <Route path='/search/:words' component={Home}/>
        <Route path='/makeorder' component={MakeOrderPage}/>
        <Route path='/order/:id' component={OrderPage}/>
        <Route path='/payment' component={PaymentPage}/>
        <Route path='/delivery' component={DeliveryPage}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/book/:id' component={BookScreen} />
        <Route path= '/basket/:id?' component={BasketScreen}/>
        <Route path= '/login' component={LoginPage}/>
        <Route path= '/profile' component={ProfileScreen}/>
        <Route path= '/admin/userlist' component={ListOfUsersPage}/>
        <Route path= '/admin/user/:id/edit' component={EditUserPage}/>
        <Route path= '/admin/productlist' component={ListOfBooksPage}/>
        <Route path= '/admin/book/:id/edit' component={EditBookPage}/>
        <Route path= '/admin/orderlist' component={ListOfOrdersPage}/>
      </Container>

   
    
    </Router>
  );
}

export default App;
