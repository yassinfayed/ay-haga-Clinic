import { 
  PATIENTS_FILTERAPPOINTMENTS_FAIL,  
  PATIENT_REMOVE_RECORD_REQUEST,
  PATIENT_REMOVE_RECORD_SUCCESS,
  PATIENT_REMOVE_RECORD_FAIL,
  PATIENTS_FILTERAPPOINTMENTS_REQUEST, 
  PATIENTS_FILTERAPPOINTMENTS_SUCCESS , 
  PATIENT_DOWNLOAD_DOCS_FAIL, 
  PATIENT_DOWNLOAD_DOCS_REQUEST, 
  PATIENT_DOWNLOAD_DOCS_SUCCESS, 
  PATIENT_FAIL,PATIENT_REQUEST,
  PATIENT_SUCCESS, 
  PATIENT_UPLOAD_DOCS_FAIL, 
  PATIENT_UPLOAD_DOCS_REQUEST, 
  PATIENT_UPLOAD_DOCS_SUCCESS,
  PATIENT_UPLOAD_HEALTHRECORDS_FAIL,
  PATIENT_UPLOAD_HEALTHRECORDS_REQUEST,
  PATIENT_UPLOAD_HEALTHRECORDS_SUCCESS
} from "../constants/patientConstants";

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
          patient: action.payload,
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

  export const patientUploadDocs = (state ={}, action) => {
    switch (action.type) {
      case PATIENT_UPLOAD_HEALTHRECORDS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PATIENT_UPLOAD_HEALTHRECORDS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: null,
        }
      };
      case PATIENT_UPLOAD_HEALTHRECORDS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }

  export const uploadHealthRecordsReducer = (state ={}, action) => {
    switch (action.type) {
      case PATIENT_UPLOAD_DOCS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PATIENT_UPLOAD_DOCS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: null,
        }
      };
      case PATIENT_UPLOAD_DOCS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }

  export const downloadPatienttDocsReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_DOWNLOAD_DOCS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case PATIENT_DOWNLOAD_DOCS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case PATIENT_DOWNLOAD_DOCS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const patientRemoveRecordReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_REMOVE_RECORD_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case PATIENT_REMOVE_RECORD_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case PATIENT_REMOVE_RECORD_FAIL:
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};