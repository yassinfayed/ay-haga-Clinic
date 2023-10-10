import { PATIENTS_FILTERAPPOINTMENTS_FAIL, PATIENTS_FILTERAPPOINTMENTS_REQUEST, PATIENTS_FILTERAPPOINTMENTS_SUCCESS } from "../constants/patientConstants";

export const viewPatientsAppointmentsReducer = (state ={}, action) => {
    switch (action.type) {
      case PATIENTS_FILTERAPPOINTMENTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PATIENTS_FILTERAPPOINTMENTS_SUCCESS: {
        return {
          ...state,
          appointments: action.payload,
          loading: false,
          error: null,
        }
      };
      case PATIENTS_FILTERAPPOINTMENTS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }