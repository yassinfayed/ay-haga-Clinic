import axios from 'axios';
import {
  PRESCRIPTIONS_REQUEST,
  PRESCRIPTIONS_SUCCESS,
  PRESCRIPTIONS_FAIL,
  VIEW_PRESCRIPTIONS_REQUEST,
  VIEW_PRESCRIPTIONS_SUCCESS,
  VIEW_PRESCRIPTIONS_FAIL

} from '../constants/prescriptionsConstants'; // Make sure to import the correct constants file

 import baseURL from '../baseURL';
import { formulateQueryString } from '../queryStringBuilder';

export const viewPrescriptionsDetails = (prescrId) => async (dispatch) => {
  console.log(prescrId);
  try {
    dispatch({
      type: PRESCRIPTIONS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`${baseURL}/api/v1/patient/prescription?_id=${prescrId}`, config);

    dispatch({
      type: PRESCRIPTIONS_SUCCESS,
      payload: data.data.data[0],
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: PRESCRIPTIONS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Fetching doctor details failed. Please try again.',
    });
  }
};

export const viewALLPrescriptions = (queryObj) => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_PRESCRIPTIONS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const queryStr = formulateQueryString(queryObj);
    const url = `${baseURL}/api/v1/patient/prescription${queryStr ? `?${queryStr}` : ''}`;
    console.log(url);

    const { data } = await axios.get(url, config);

    dispatch({
      type: VIEW_PRESCRIPTIONS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: VIEW_PRESCRIPTIONS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Fetching patients failed. Please try again.',
    });
  }
};
