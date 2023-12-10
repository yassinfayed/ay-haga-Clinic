// doctorReducers.js
import {
    DOCTOR_REQUEST,
    DOCTOR_SUCCESS,
    DOCTOR_FAIL,
  } from '../constants/doctorConstants'; // Import the correct constants file
  
  const initialState = {
    doctor: null,
    loading: false,
    error: null,
  };
  
  export const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
      case DOCTOR_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DOCTOR_SUCCESS:
        return {
          ...state,
          doctor: action.payload,
          loading: false,
          error: null,
        };
      case DOCTOR_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  