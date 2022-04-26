import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { bookListReducer, bookDetailsReducer,bookRemoveReducer, bookCreateReducer, bookUpdateReducer, bookNewReviewReducer} from './reducers/bookReducers'
import {basketReducer} from './reducers/basketReducers'
import {userLoginReducer, userRegisterReducer, userDetailsReducer,userUpdateProfileReducer,userListReducer, userDeleteReducer,userUpdateReducer} from './reducers/userRecuders'
import { orderCreateReducer } from './reducers/orderReducers'
import { orderDetailsReducer } from './reducers/orderReducers'
import { orderPaymentReducer } from './reducers/orderReducers'
import { orderAllOrdersReducer } from './reducers/orderReducers'
import { orderViewReducer } from './reducers/orderReducers'
import { orderDeliverReducer } from './reducers/orderReducers'
const reducer = combineReducers({
    bookList:bookListReducer,
    bookDetails:bookDetailsReducer,
    basket:basketReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPayment: orderPaymentReducer,
    orderAllOrders:orderAllOrdersReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    bookRemove:bookRemoveReducer,
    bookCreate:bookCreateReducer,
    bookUpdate:bookUpdateReducer,
    orderView:orderViewReducer,
    orderDeliver:orderDeliverReducer,
    bookNewReview: bookNewReviewReducer,
})

const basketItemsFromStorage= localStorage.getItem('basketItems') ? JSON.parse(localStorage.getItem('basketItems')) : []
const userInfoFromStorage= localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const deliveryAddressFromStorage= localStorage.getItem('deliveryAddress') ? JSON.parse(localStorage.getItem('deliveryAddress')) : {};
const middleware = [thunk]
const initialState = {
    basket: {basketItems: basketItemsFromStorage, 
             deliveryAddress: deliveryAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage},
}

const store = createStore (reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store