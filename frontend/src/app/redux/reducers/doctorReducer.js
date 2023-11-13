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
  DOCTORS_VIEW_SUCCESS,
  DOCTOR_ACCEPTED_REQUEST,
  DOCTOR_ACCEPTED_SUCCESS,
  DOCTOR_ACCEPTED_FAIL,
  DOCTOR_VIEWCONTRACT_REQUEST,
  DOCTOR_VIEWCONTRACT_SUCCESS,
  DOCTOR_VIEWCONTRACT_FAIL,
  DOCTOR_ACCEPTCONTRACT_REQUEST,
  DOCTOR_ACCEPTCONTRACT_SUCCESS,
  DOCTOR_ACCEPTCONTRACT_FAIL,
  DOCTOR_ADDAVAILABLEDATE_REQUEST,
  DOCTOR_ADDAVAILABLEDATE_SUCCESS,
  DOCTOR_ADDAVAILABLEDATE_FAIL,
  DOCTOR_FOLLOWUP_FAIL,
  DOCTOR_FOLLOWUP_REQUEST,
  DOCTOR_FOLLOWUP_SUCCESS,
  DOCTOR_REJECTED_REQUEST,
  DOCTOR_REJECTED_SUCCESS,
  DOCTOR_REJECTED_FAIL,
  DOCTOR_DOWNLOAD_DOCS_FAIL,
  DOCTOR_DOWNLOAD_DOCS_REQUEST,
  DOCTOR_DOWNLOAD_DOCS_SUCCESS
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
        specialities : action.payload.specialities,
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

export const adminAcceptDoctorReducer = (state ={}, action) => {
  switch (action.type) {
    case DOCTOR_ACCEPTED_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOCTOR_ACCEPTED_SUCCESS: {
      return {
        ...state,
        doctor: action.payload,
        loading: false,
        error: null,
      }
    };
    case DOCTOR_ACCEPTED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const doctorViewContractReducer = (state ={}, action) => {
  switch (action.type) {
    case DOCTOR_VIEWCONTRACT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOCTOR_VIEWCONTRACT_SUCCESS: {
      return {
        ...state,
        contract: action.payload,
        loading: false,
        error: null,
      }
    };
    case DOCTOR_VIEWCONTRACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const doctorAcceptContractReducer = (state ={}, action) => {
  switch (action.type) {
    case DOCTOR_ACCEPTCONTRACT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOCTOR_ACCEPTCONTRACT_SUCCESS: {
      return {
        ...state,
        contract: action.payload,
        loading: false,
        error: null,
      }
    };
    case DOCTOR_ACCEPTCONTRACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}


export const doctorAddAvailableDateReducer = (state ={}, action) => {
  switch (action.type) {
    case DOCTOR_ADDAVAILABLEDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOCTOR_ADDAVAILABLEDATE_SUCCESS: {
      return {
        ...state,
        availableDates: action.payload,
        loading: false,
        error: null,
      }
    };
    case DOCTOR_ADDAVAILABLEDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const doctorFollowUpReducer = (state ={}, action) => {
  switch (action.type) {
    case DOCTOR_FOLLOWUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case DOCTOR_FOLLOWUP_SUCCESS: {
        return {
          ...state,
          appointment: action.payload,
          loading: false,
          error: null,
        };
      }
    case DOCTOR_FOLLOWUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const rejectDoctorReducer = (state ={}, action) => {
  switch (action.type) {
    case DOCTOR_REJECTED_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case DOCTOR_REJECTED_SUCCESS: {
        return {
          ...state,
          doctor: action.payload,
          loading: false,
          error: null,
        };
      }
    case DOCTOR_REJECTED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const downloadDoctorDocsReducer = (state = {}, action) => {
  switch (action.type) {
      case DOCTOR_DOWNLOAD_DOCS_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          };
      case DOCTOR_DOWNLOAD_DOCS_SUCCESS:
          return {
              ...state,
              loading: false,
              error: null,
          };
      case DOCTOR_DOWNLOAD_DOCS_FAIL:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};