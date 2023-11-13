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
        url = `${baseURL}/api/v1/doctor${queryStr ?`?${queryStr}` : ''}`;}
    else
      url = `${baseURL}/api/v1/doctor/getAllDoctors${queryStr ? `?${queryStr}` : ''}`
    const { data } = await axios.get(
      url,
      config
    );
    const {data:data2} = await axios.get(`${baseURL}/api/v1/doctor/specialities`,config)
    data.data.specialities = data2;
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


export const adminAcceptDoctor = (doctorId,body) => async (dispatch) => {
  
  try {
    dispatch({
      type: DOCTOR_ACCEPTED_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    let url ="";
    
    url=`${baseURL}/api/v1/doctor/acceptdoctor/${doctorId}`
    
    const { data } = await axios.patch(url, body,config);

    dispatch({
      type: DOCTOR_ACCEPTED_SUCCESS,
      payload: data.data
    });
  } catch (error) {
   
    dispatch({
      type: DOCTOR_ACCEPTED_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Accepting doctor failed. Please try again.',
    });
  }
};



export const doctorViewContract = () => async (dispatch) => {

  try {
    dispatch({
      type: DOCTOR_VIEWCONTRACT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    let url ="";
    
    url=`${baseURL}/api/v1/doctor/viewcontract`
    
    const { data } = await axios.get(url, config);

    dispatch({
      type: DOCTOR_VIEWCONTRACT_SUCCESS,
      payload: data.data
    });
  } catch (error) {
   
    dispatch({
      type: DOCTOR_VIEWCONTRACT_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Could not retrieve contract. Please try again.',
    });
  }
};

export const doctorAcceptContract = () => async (dispatch) => {

  try {
    dispatch({
      type: DOCTOR_ACCEPTCONTRACT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    let url ="";
    
    url=`${baseURL}/api/v1/doctor/acceptcontract`
    
    const { data } = await axios.patch(url,{}, config);

    dispatch({
      type: DOCTOR_ACCEPTCONTRACT_SUCCESS,
      payload: data.data
    });
  } catch (error) {
   
    dispatch({
      type: DOCTOR_ACCEPTCONTRACT_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Could not accept contract. Please try again.',
    });
  }
};


export const doctorAddAvailableDate = (body) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_ADDAVAILABLEDATE_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    const url = `${baseURL}/api/v1/doctor/addavailabledate`;
    const { data } = await axios.patch(url, body, config);

    dispatch({
      type: DOCTOR_ADDAVAILABLEDATE_SUCCESS,
      doctor: data.data,
    })


  } catch (error) {
   
    dispatch({
      type: DOCTOR_ADDAVAILABLEDATE_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error adding new available date. Please try again.',
    });
  }
}

export const doctorFollowUpAction = (appointmentId, date) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_FOLLOWUP_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const reqbody = {
      appointmentId,
      date,
    };

    const { data } = await axios.post(`${baseURL}/api/v1/appointment/followUp`, reqbody, config);

    dispatch({
      type: DOCTOR_FOLLOWUP_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_FOLLOWUP_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Following up appointment failed. Please try again.',
    });
  }
};


export const rejectDoctor = (doctorId,body) => async (dispatch) => {
  
  try {
    dispatch({
      type: DOCTOR_REJECTED_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    let url ="";
    
    url=`${baseURL}/api/v1/doctor/rejectdoctor/${doctorId}`
    
    const { data } = await axios.patch(url, body,config);

    dispatch({
      type: DOCTOR_REJECTED_SUCCESS,
      payload: data.data
    });
  } catch (error) {
   
    dispatch({
      type: DOCTOR_REJECTED_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Rejecting doctor failed. Please try again.',
    });
  }
};

export const downloadDoctorDocs = (DoctorId) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_DOWNLOAD_DOCS_REQUEST,
    });

    const config = {
      headers: {
        
        'Content-Type': 'application/zip',
      },
      responseType: 'blob',
      withCredentials: true,
    };

    const url = `${baseURL}/api/v1/doctor/doctorDocs/${DoctorId}`;

    const response = await axios.get(url, config);

    const ContentDisposition = response.headers['content-disposition'];
    const fileName = 'doctor_documents.zip';

    const blob = new Blob ([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    dispatch({
      type: DOCTOR_DOWNLOAD_DOCS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_DOWNLOAD_DOCS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Downloading pharmacist documents failed. Please try again.',
    });
  }
};
