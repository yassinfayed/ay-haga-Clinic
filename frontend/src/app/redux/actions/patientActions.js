import { PATIENTS_FILTERAPPOINTMENTS_FAIL, PATIENTS_FILTERAPPOINTMENTS_REQUEST, PATIENTS_FILTERAPPOINTMENTS_SUCCESS, PATIENT_FAIL, PATIENT_REQUEST,PATIENT_SUCCESS} from "../constants/patientConstants";
import { formulateQueryString } from '../queryStringBuilder';
import baseURL from '../baseURL';
import axios from 'axios';

export const getPatientAppointments = (queryObj) => async (dispatch) => {
    try {
      dispatch({
        type: PATIENTS_FILTERAPPOINTMENTS_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      };
  
      console.log(queryObj);
      const queryStr = formulateQueryString(queryObj)
      console.log(queryStr);
      let url;
  
      if (!queryObj)
        url = `${baseURL}/api/v1/appointment/get-patient-appointments`
      else
        url = `${baseURL}/api/v1/appointment/get-patient-appointments?${queryStr}`
      const { data } = await axios.get(
        url,
        config
      );
  
      dispatch({
        type: PATIENTS_FILTERAPPOINTMENTS_SUCCESS,
        payload: data.data,
      });
  
    } catch (error) {
      console.log(error)
      dispatch({
        type: PATIENTS_FILTERAPPOINTMENTS_FAIL,
        payload: error.response
          ? error.response.data.message
          : 'Error Retrieving PATIENTS APPOINTMENTS. Please try again.',
      });
    }
  };

  export const viewPatientDetails = (patientId) => async (dispatch) => {
    console.log(patientId);
    try {
      dispatch({
        type: PATIENT_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      let url ="";
      
      url=`${baseURL}/api/v1/patient//my-details`
      
      const { data } = await axios.get(url, config);
  
      dispatch({
        type: PATIENT_SUCCESS,
        payload: data.data.data[0],
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: PATIENT_FAIL,
        payload: error.response
          ? error.response.data.message
          : 'Fetching patient details failed. Please try again.',
      });
    }
  }