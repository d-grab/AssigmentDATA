import {BASKET_ADD_ITEM, BASKET_CLEAR_ITEMS, BASKET_REMOVE_ITEM, BASKET_SAVE_DELIVERY_ADDRESS, BASKET_SAVE_PAYMENT_METHOD} from '../constants/basketConstants'

export const basketReducer = (state = {basketItems: [], deliveryAddress:{} }, action) => {
    switch (action.type) {
        case BASKET_ADD_ITEM:
            
            const item = action.payload

            const existBook = state.basketItems.find(x => x.product === item.product)
    
                if(existBook) {
                    return {
                        ...state,
                        basketItems: state.basketItems.map
                        (x => x.product === existBook.product ? item : x)
                    }
                } else {
                    return {
                        ...state,
                        basketItems: [...state.basketItems, item]
                    }
                }
            case BASKET_REMOVE_ITEM:
                return {
                    ...state,
                    basketItems: state.basketItems.filter(x => x.product !== action.payload)
                }
            case BASKET_SAVE_DELIVERY_ADDRESS:
                return {
                    ...state,
                    deliveryAddress: action.payload,
                }
                case BASKET_SAVE_PAYMENT_METHOD:
                    return {
                        ...state,
                        paymentMethod: action.payload,
                    }
                    case BASKET_CLEAR_ITEMS:
                        return {
                          ...state,
                          basketItems: [],
                        }
        default:
            return state
    }
}