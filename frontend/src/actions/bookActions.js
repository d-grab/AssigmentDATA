import {BOOK_LIST_FAIL, BOOK_LIST_SUCCESS, BOOK_LIST_REQUEST, BOOK_REMOVE_REQUEST, BOOK_REMOVE_SUCCESS, BOOK_REMOVE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_CREATE_FAIL, BOOK_UPDATE_REQUEST, BOOK_UPDATE_SUCCESS, BOOK_UPDATE_FAIL, BOOK_NEW_REVIEW_REQUEST, BOOK_NEW_REVIEW_SUCCESS, BOOK_NEW_REVIEW_FAIL} from '../constants/bookConstants'
import {BOOK_DETAILS_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS} from '../constants/bookConstants'
import axios from 'axios'

export const listBooks = (words= '') => async (dispatch) => {
    try {
        dispatch({type: BOOK_LIST_REQUEST})

        const {data } = await axios.get(`/api/books?words=${words}`)

        dispatch({
            type: BOOK_LIST_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch ({
            type: BOOK_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
    }
}


export const listBookDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: BOOK_DETAILS_REQUEST})

        const {data } = await axios.get(`/api/books/${id}`)

        dispatch({
            type: BOOK_DETAILS_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch ({
            type: BOOK_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
    }
}

export const removeBook = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOOK_REMOVE_REQUEST,
        })

        const {userLogin: {userInfo},} =getState()
        //for sending content type in header application/json
        const config = {
            headers: {
              
                
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/books/${id}`,  config)

        
        dispatch({
            type: BOOK_REMOVE_SUCCESS,
            
          })
          
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') 
        
        dispatch({
          type: BOOK_REMOVE_FAIL,
          payload: message,
        })
      }
    }


    export const createBook = () => async (dispatch, getState) => {
        try {
            dispatch({
                type: BOOK_CREATE_REQUEST,
            })
    
            const {userLogin: {userInfo},} =getState()
            //for sending content type in header application/json
            const config = {
                headers: {
                  
                    
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
    
           const {data}=  await axios.post(`/api/books`,{},  config)
    
            
            dispatch({
                type: BOOK_CREATE_SUCCESS,
                payload: data
                
              })
              
          } catch (error) {
            const message =
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            if (message === 'Not authorized, token failed') 
            
            dispatch({
              type: BOOK_CREATE_FAIL,
              payload: message,
            })
          }
        }


        export const updateBook = (book) => async (dispatch, getState) => {
            try {
                dispatch({
                    type: BOOK_UPDATE_REQUEST,
                })
        
                const {userLogin: {userInfo},} =getState()
                //for sending content type in header application/json
                const config = {
                    headers: {
                        'Content-Type': 'application/json',

                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
        
               const {data}=  await axios.put(`/api/books/${book._id}`,book,  config)
        
                
                dispatch({
                    type: BOOK_UPDATE_SUCCESS,
                    payload: data
                    
                  })
                  dispatch({
                    type: BOOK_DETAILS_SUCCESS,
                    payload: data,
                  })
                  
              } catch (error) {
                const message =
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
                if (message === 'Not authorized, token failed') 
                
                dispatch({
                  type: BOOK_UPDATE_FAIL,
                  payload: message,
                })
              }
            }
    
            
            export const createBookReview = (bookId,review) => async (dispatch, getState) => {
                try {
                    dispatch({
                        type: BOOK_NEW_REVIEW_REQUEST,
                    })
            
                    const {userLogin: {userInfo},} =getState()
                    //for sending content type in header application/json
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
    
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    }
            
                   await axios.post(`/api/books/${bookId}/reviews`,review,  config)
            
                    
                    dispatch({
                        type: BOOK_NEW_REVIEW_SUCCESS,
                        
                      })
                      
                      
                  } catch (error) {
                    const message =
                      error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                    if (message === 'Not authorized, token failed') 
                    
                    dispatch({
                      type: BOOK_NEW_REVIEW_FAIL,
                      payload: message,
                    })
                  }
                }

