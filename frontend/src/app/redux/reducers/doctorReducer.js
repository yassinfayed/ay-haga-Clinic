import {
    DOCTORS_VIEW_FAIL,
    DOCTORS_VIEW_REQUEST,
    DOCTORS_VIEW_SUCCESS
} from '../constants/doctorConstants';

export const getDrsForPatientsReducer = (state = {}, action) => {
    switch (action.type) {
      case DOCTORS_VIEW_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DOCTORS_VIEW_SUCCESS:{
        console.log(action.payload.data)
        console.log("heyy")

        return {
          ...state,
          doctors: action.payload,
          loading: false,
          error: null,
        }};
      case DOCTORS_VIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };