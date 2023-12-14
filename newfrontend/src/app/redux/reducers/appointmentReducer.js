import {
    FOLLOWUP_REQUEST,
    FOLLOWUP_SUCCESS,
    FOLLOWUP_FAIL,
    RESCHEDULE_REQUEST,
    RESCHEDULE_SUCCESS,
    RESCHEDULE_FAIL,
    CANCEL_REQUEST,
    CANCEL_SUCCESS,
    CANCEL_FAIL
  } from '../constants/appointmentConstants';


  export const followUpReducer = (state ={}, action) => {
    switch (action.type) {
      case FOLLOWUP_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case FOLLOWUP_SUCCESS: {
          return {
            ...state,
            appointment: action.payload,
            success:true,
            loading: false,
            error: null,
          };
        }
      case FOLLOWUP_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const rescheduleReducer = (state ={}, action) => {
    switch (action.type) {
      case RESCHEDULE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case RESCHEDULE_SUCCESS: {
          return {
            ...state,
            appointment: action.payload,
            loading: false,
            success:true,
            error: null,
          };
        }
      case RESCHEDULE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const cancelReducer = (state ={}, action) => {
    switch (action.type) {
      case CANCEL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case CANCEL_SUCCESS: {
          return {
            ...state,
            appointment: action.payload,
            success:true,
            loading: false,
            error: null,
          };
        }
      case CANCEL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };