import {
  DOCTORS_FILTERAPPOINTMENTS_FAIL,
  DOCTORS_FILTERAPPOINTMENTS_REQUEST,
  DOCTORS_FILTERAPPOINTMENTS_SUCCESS,
  DOCTORS_UPDATE_FAIL,
  DOCTORS_UPDATE_REQUEST,
  DOCTORS_UPDATE_SUCCESS,
  DOCTORS_VIEWPATIENTSINFO_FAIL,
  DOCTORS_VIEWPATIENTSINFO_REQUEST,
  DOCTORS_VIEWPATIENTSINFO_SUCCESS,
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
    case DOCTORS_VIEW_SUCCESS: {
      return {
        ...state,
        doctors: action.payload,
        loading: false,
        error: null,
      }
    };
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


export const viewDoctorPatientsReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTORS_VIEWPATIENTSINFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOCTORS_VIEWPATIENTSINFO_SUCCESS: {
      return {
        ...state,
        patients: action.payload,
        loading: false,
        error: null,
      }
    };
    case DOCTORS_VIEWPATIENTSINFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const updateDoctorsReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTORS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        doctor: action.payload,
        error: null,
      };
      break;
    case DOCTORS_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    case DOCTORS_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      break;
    default:
      return state;
  }
}

export const viewDoctorsAppointmentsReducer = (state ={}, action) => {
  switch (action.type) {
    case DOCTORS_FILTERAPPOINTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOCTORS_FILTERAPPOINTMENTS_SUCCESS: {
      return {
        ...state,
        appointments: action.payload,
        loading: false,
        error: null,
      }
    };
    case DOCTORS_FILTERAPPOINTMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}