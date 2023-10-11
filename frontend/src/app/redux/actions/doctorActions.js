import axios from 'axios';
import {
  DOCTOR_REQUEST,
  DOCTOR_SUCCESS,
  DOCTOR_FAIL,
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
} from '../constants/doctorConstants'; // Import the correct constants file
import baseURL from '../baseURL';
import { formulateQueryString } from '../queryStringBuilder';

export const viewDoctorDetails = (doctorId) => async (dispatch) => {
  console.log(doctorId);
  try {
    dispatch({
      type: DOCTOR_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    let url ="";
    if(!doctorId){
      url=`${baseURL}/api/v1/doctor`
    }
    else{
      url=`${baseURL}/api/v1/doctor?_id=${doctorId}`
    }
    const { data } = await axios.get(url, config);

    dispatch({
      type: DOCTOR_SUCCESS,
      payload: data.data.data[0],
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: DOCTOR_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Fetching doctor details failed. Please try again.',
    });
  }
};

export const getDoctorsForPatientAction = (queryObj) => async (dispatch) => {
  try {

    dispatch({
      type: DOCTORS_VIEW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    const queryStr = formulateQueryString(queryObj)
    let url;
    console.log(JSON.parse(localStorage.getItem('userInfo')).data.user.role);
    if(JSON.parse(localStorage.getItem('userInfo')).data.user.role === 'administrator')
      { 
        url = `${baseURL}/api/v1/doctor${queryStr ?`  ?${queryStr}` : ''}`;}
    else
      url = `${baseURL}/api/v1/doctor/getAllDoctors${queryStr ? `? ${queryStr}` : ''}`
    const { data } = await axios.get(
      url,
      config
    );

    dispatch({
      type: DOCTORS_VIEW_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    console.log(error)
    dispatch({
      type: DOCTORS_VIEW_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error Retrieving DOCTORS. Please try again.',
    });
  }
};

export const updateDoctor = (body) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTORS_UPDATE_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    const url = `${baseURL}/api/v1/doctor/updatedoctor`;
    const { data } = await axios.patch(url, body, config);

    dispatch({
      type: DOCTORS_UPDATE_SUCCESS,
      payload: data.data,
    })


  } catch (error) {
    console.log(error)
    dispatch({
      type: DOCTORS_UPDATE_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error Upadting DOCTOR. Please try again.',
    });
  }
}

export const getDoctorPatientsInfo = (patientId) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTORS_VIEWPATIENTSINFO_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    const url = `${baseURL}/api/v1/patient/getPatient/${patientId}`
    const { data } = await axios.get(
      url,
      config
    );

    dispatch({
      type: DOCTORS_VIEWPATIENTSINFO_SUCCESS,
      payload: data.data,
    })


  } catch (error) {
    console.log(error)
    dispatch({
      type: DOCTORS_VIEWPATIENTSINFO_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error Viewing DOCTOR PATIENT. Please try again.',
    });
  }
}

export const getDoctorAppointments = (queryObj) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTORS_FILTERAPPOINTMENTS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    const queryStr = formulateQueryString(queryObj)
    let url;

    if (!queryObj)
      url = `${baseURL}/api/v1/appointment/get-doctor-appointments`
    else
      url = `${baseURL}/api/v1/appointment/get-doctor-appointments?${queryStr}`
    const { data } = await axios.get(
      url,
      config
    );

    dispatch({
      type: DOCTORS_FILTERAPPOINTMENTS_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    console.log(error)
    dispatch({
      type: DOCTORS_FILTERAPPOINTMENTS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error Retrieving DOCTORS APPOINTMENTS. Please try again.',
    });
  }
}