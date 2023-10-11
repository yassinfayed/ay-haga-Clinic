import {
    PATIENTS_REQUEST,
    PATIENTS_SUCCESS,
    PATIENTS_FAIL,
    FILTER_PATIENTS_REQUEST,
    FILTER_PATIENTS_SUCCESS,
    FILTER_PATIENTS_FAIL
  } from '../constants/patientsConstants'; // Make sure to import the correct constants file
  
  const initialState = {
    patients: [],
    loading: false,
    error: null,
  };
  
export const patientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case PATIENTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PATIENTS_SUCCESS:
        return {
          ...state,
          patients: action.payload,
          loading: false,
          error: null,
        };
      case PATIENTS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  export const filterPatientsBasedOnUpcomingAppointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FILTER_PATIENTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FILTER_PATIENTS_SUCCESS:
        return {
          ...state,
          patients: action.payload,
          loading: false,
          error: null,
        };
      case FILTER_PATIENTS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  