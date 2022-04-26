import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS, ORDER_PAYMENT_FAIL, ORDER_ALL_ORDERS_REQUEST, ORDER_ALL_ORDERS_SUCCESS, ORDER_ALL_ORDERS_FAIL, ORDER_VIEW_REQUEST, ORDER_VIEW_SUCCESS, ORDER_VIEW_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL} from "../constants/orderConstants"
import axios from 'axios'
import { BASKET_CLEAR_ITEMS } from "../constants/basketConstants"
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const {userLogin: {userInfo}} =getState()
        //for sending content type in header application/json
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`,order, config)

        
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
          })
          dispatch({
            type: BASKET_CLEAR_ITEMS,
            payload: data,
          })
          localStorage.removeItem('basketItems')
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') 
        
        dispatch({
          type: ORDER_CREATE_FAIL,
          payload: message,
        })
      }
    }


    export const getOrderDetails = (id) => async (dispatch, getState) => {
      try {
          dispatch({
              type: ORDER_DETAILS_REQUEST,
          })
  
          const {userLogin: {userInfo},} =getState()
          //for sending content type in header application/json
          const config = {
              headers: {
                  
                  Authorization: `Bearer ${userInfo.token}`
              }
          }
  
          const { data } = await axios.get(`/api/orders/${id}`, config)
  
          
          dispatch({
              type: ORDER_DETAILS_SUCCESS,
              payload: data,
            })
            
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          if (message === 'Not authorized, token failed') 
          
          dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
          })
        }
      }


      export const orderPay = (orderId, paymentResult) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_PAYMENT_REQUEST,
            })
    
            const {userLogin: {userInfo},} =getState()
            //for sending content type in header application/json
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                    
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
    
            const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
    
            
            dispatch({
                type: ORDER_PAYMENT_SUCCESS,
                payload: data,
              })
              
          } catch (error) {
            const message =
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            if (message === 'Not authorized, token failed') 
            
            dispatch({
              type: ORDER_PAYMENT_FAIL,
              payload: message,
            })
          }
        }


        export const MyOrders = () => async (dispatch, getState) => {
          try {
              dispatch({
                  type: ORDER_ALL_ORDERS_REQUEST,
              })
      
              const {userLogin: {userInfo},} =getState()
              //for sending content type in header application/json
              const config = {
                  headers: {
                    
                      
                      Authorization: `Bearer ${userInfo.token}`
                  }
              }
      
              const { data } = await axios.get(`/api/orders/allorders`,  config)
      
              
              dispatch({
                  type: ORDER_ALL_ORDERS_SUCCESS,
                  payload: data,
                })
                
            } catch (error) {
              const message =
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message
              if (message === 'Not authorized, token failed') 
              
              dispatch({
                type: ORDER_ALL_ORDERS_FAIL,
                payload: message,
              })
            }
          }


          export const ViewOrders = () => async (dispatch, getState) => {
            try {
                dispatch({
                    type: ORDER_VIEW_REQUEST,
                })
        
                const {userLogin: {userInfo},} =getState()
                //for sending content type in header application/json
                const config = {
                    headers: {
                      
                        
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
        
                const { data } = await axios.get(`/api/orders`,  config)
        
                
                dispatch({
                    type: ORDER_VIEW_SUCCESS,
                    payload: data,
                  })
                  
              } catch (error) {
                const message =
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
                if (message === 'Not authorized, token failed') 
                
                dispatch({
                  type: ORDER_VIEW_FAIL,
                  payload: message,
                })
              }
            }


            export const deliverOrder = (order) => async (dispatch, getState) => {
              try {
                  dispatch({
                      type: ORDER_DELIVER_REQUEST,
                  })
          
                  const {userLogin: {userInfo},} =getState()
                  //for sending content type in header application/json
                  const config = {
                      headers: {
                        
                          
                          Authorization: `Bearer ${userInfo.token}`,
                      },
                  }
          
                  const { data } = await axios.put(`/api/orders/${order._id}/deliver`,{}, config)
          
                  
                  dispatch({
                      type: ORDER_DELIVER_SUCCESS,
                      payload: data,
                    })
                    
                } catch (error) {
                  const message =
                    error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message
                  if (message === 'Not authorized, token failed') 
                  
                  dispatch({
                    type: ORDER_DELIVER_FAIL,
                    payload: message,
                  })
                }
              }