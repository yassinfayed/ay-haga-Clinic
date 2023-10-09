import axios from 'axios';
import {
  DOCTOR_REQUEST,
  DOCTOR_SUCCESS,
  DOCTOR_FAIL,
} from '../constants/doctorConstants'; // Import the correct constants file
import baseURL from '../baseURL';

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
