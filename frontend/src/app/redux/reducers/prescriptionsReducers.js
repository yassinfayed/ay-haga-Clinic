// doctorReducers.js
import {
    PRESCRIPTIONS_REQUEST,
    PRESCRIPTIONS_SUCCESS,
    PRESCRIPTIONS_FAIL,
    VIEW_PRESCRIPTIONS_REQUEST,
    VIEW_PRESCRIPTIONS_SUCCESS,
    VIEW_PRESCRIPTIONS_FAIL
  } from '../constants/prescriptionsConstants'; // Import the correct constants file
  
  const initialState = {
    prescription: null,
    loading: false,
    error: null,
  };
  
  export const prescriptionReducer = (state = initialState, action) => {
    switch (action.type) {
      case PRESCRIPTIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PRESCRIPTIONS_SUCCESS:
        return {
          ...state,
          prescription: action.payload,
          loading: false,
          error: null,
        };
      case PRESCRIPTIONS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const viewAllPrescriptionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case VIEW_PRESCRIPTIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case VIEW_PRESCRIPTIONS_SUCCESS:
        return {
          ...state,
          prescription: action.payload,
          loading: false,
          error: null,
        };
      case VIEW_PRESCRIPTIONS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };