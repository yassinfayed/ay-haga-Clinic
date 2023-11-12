import axios from 'axios';
import {
  PATIENTS_REQUEST,
  PATIENTS_SUCCESS,
  PATIENTS_FAIL,
  FILTER_PATIENTS_REQUEST,
  FILTER_PATIENTS_SUCCESS,
  FILTER_PATIENTS_FAIL
} from '../constants/patientsConstants'; // Make sure to import the correct constants file

import baseURL from '../baseURL';
import { formulateQueryString } from '../queryStringBuilder';

export const viewPatients = (queryObj) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENTS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const queryStr = formulateQueryString(queryObj);

    let url =""
    if(JSON.parse(localStorage.getItem('userInfo')).data.user.role === 'administrator')
      url = `${baseURL}/api/v1/patient${queryStr ? `?${queryStr}` : ''}`;
    else
      url = `${baseURL}/api/v1/patient/view-Patients${queryStr ? `?${queryStr}` : ''}`;
    console.log(url);

    const { data } = await axios.get(url, config);

    dispatch({
      type: PATIENTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: PATIENTS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Fetching patients failed. Please try again.',
    });
  }
};

export const filterPatientsBasedOnUpcomingAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: FILTER_PATIENTS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.get(
      `${baseURL}/api/v1/patient/filter-Patients-Based-On-Upcoming-Appointments`,
      config
    );

    dispatch({
      type: FILTER_PATIENTS_SUCCESS,
      payload: data.data,
    });
 
  } catch (error) {
    console.log(error);
    dispatch({
      type: FILTER_PATIENTS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'filtering patients failed. Please try again.',
    });
  }
};
