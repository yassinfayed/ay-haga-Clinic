import axios from 'axios';
import {
    FOLLOWUP_REQUEST,
    FOLLOWUP_SUCCESS,
    FOLLOWUP_FAIL,
    RESCHEDULE_REQUEST,
    RESCHEDULE_SUCCESS,
    RESCHEDULE_FAIL,
    CANCEL_REQUEST,
    CANCEL_SUCCESS,
    CANCEL_FAIL
} from '../constants/appointmentConstants';
import baseURL from '../baseURL';

export const followUpAction = (appointmentId, date) => async (dispatch) => {
    try {
      dispatch({
        type: FOLLOWUP_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const reqbody = {
        appointmentId,
        date
      };
  
      const { data } = await axios.post(`${baseURL}/api/v1/appointment/followUp`, reqbody, config);
  
      dispatch({
        type: FOLLOWUP_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FOLLOWUP_FAIL,
        payload: error.response
          ? error.response.data.message
          : 'Following up appointment failed. Please try again.',
      });
    }
  };

  export const rescheduleAction = (appointmentId,date) => async (dispatch) => {
    try {
      dispatch({
        type: RESCHEDULE_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
   const reqbody={date}
  
      const { data } = await axios.patch(`${baseURL}/api/v1/appointment/reschedule/${appointmentId}`, reqbody, config);
  
      dispatch({
        type: RESCHEDULE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: RESCHEDULE_FAIL,
        payload: error.response
          ? error.response.data.message
          : 'Following up appointment failed. Please try again.',
      });
    }
  };

  export const cancelAction = (appointmentId) => async (dispatch) => {
    try {
      dispatch({
        type: CANCEL_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
   //const reqbody={date}
  
      const { data } = await axios.patch(`${baseURL}/api/v1/appointment/cancel/${appointmentId}`, reqbody, config);
  
      dispatch({
        type: CANCEL_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: CANCEL_FAIL,
        payload: error.response
          ? error.response.data.message
          : 'Following up appointment failed. Please try again.',
      });
    }
  };