import { MAKE_ORDER_FAILURE, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../constants/paymentConstants";


  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case MAKE_ORDER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case MAKE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          session: action.payload,
          error: null
        };
      case MAKE_ORDER_FAILURE:
        return {
          ...state,
          loading: false,
          session: null,
          error: action.payload
        };
      default:
        return state;
    }
  };