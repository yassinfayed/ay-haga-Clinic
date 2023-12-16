// doctorReducers.js
import {
  PRESCRIPTIONS_REQUEST,
  PRESCRIPTIONS_SUCCESS,
  PRESCRIPTIONS_FAIL,
  VIEW_PRESCRIPTIONS_REQUEST,
  VIEW_PRESCRIPTIONS_SUCCESS,
  VIEW_PRESCRIPTIONS_FAIL,
  DOWNLOAD_PRESCRIPTIONS_FAIL,
  DOWNLOAD_PRESCRIPTIONS_REQUEST,
  DOWNLOAD_PRESCRIPTIONS_SUCCESS,
  ADD_PRESCRIPTIONS_FAIL,
  ADD_PRESCRIPTIONS_REQUEST,
  ADD_PRESCRIPTIONS_SUCCESS,
  UPDATE_PRESCRIPTIONS_FAIL,
  UPDATE_PRESCRIPTIONS_REQUEST,
  UPDATE_PRESCRIPTIONS_SUCCESS,
} from "../constants/prescriptionsConstants"; // Import the correct constants file

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

export const downloadPrescriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_PRESCRIPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOWNLOAD_PRESCRIPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DOWNLOAD_PRESCRIPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createPrescriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRESCRIPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_PRESCRIPTIONS_SUCCESS:
      return {
        ...state,
        prescription: action.payload,
        loading: false,
        error: null,
      };
    case ADD_PRESCRIPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatePrescriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRESCRIPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PRESCRIPTIONS_SUCCESS:
      return {
        ...state,
        prescription: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_PRESCRIPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
