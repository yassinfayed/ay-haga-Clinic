import { PATIENTS_FILTERAPPOINTMENTS_FAIL, PATIENTS_FILTERAPPOINTMENTS_REQUEST, PATIENTS_FILTERAPPOINTMENTS_SUCCESS , PATIENT_FAIL,PATIENT_REQUEST,PATIENT_SUCCESS} from "../constants/patientConstants";

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

  export const patientViewMyDetailsReducer = (state ={}, action) => {
    switch (action.type) {
      case PATIENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PATIENT_SUCCESS: {
        return {
          ...state,
          appointments: action.payload,
          loading: false,
          error: null,
        }
      };
      case PATIENT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }

