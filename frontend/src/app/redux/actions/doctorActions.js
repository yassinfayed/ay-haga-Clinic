import axios from 'axios';
import {
    DOCTORS_VIEW_FAIL,
    DOCTORS_VIEW_REQUEST,
    DOCTORS_VIEW_SUCCESS
} from '../constants/doctorConstants';
import baseURL from '../baseURL';
import { formulateQueryString } from '../queryStringBuilder';

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
  
    const { data } = await axios.get(
      `${baseURL}/api/v1/doctor/getallDoctors?${queryStr}`,
      config
    );

    dispatch({
      type: DOCTORS_VIEW_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: DOCTORS_VIEW_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error Retrieving DOCTORS. Please try again.',
    });
  }
};