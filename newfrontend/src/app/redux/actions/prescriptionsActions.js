import axios from "axios";
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
} from "../constants/prescriptionsConstants"; // Make sure to import the correct constants file

import baseURL from "../baseURL";
import { formulateQueryString } from "../queryStringBuilder";

export const viewPrescriptionsDetails = (prescrId) => async (dispatch) => {
  console.log(prescrId);
  try {
    dispatch({
      type: PRESCRIPTIONS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${baseURL}/api/v1/patient/prescription?_id=${prescrId}`,
      config
    );

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
        : "Fetching prescription details failed. Please try again.",
    });
  }
};

export const viewALLPrescriptions = (queryObj, date) => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_PRESCRIPTIONS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    console.log(queryObj);

    const queryStr = formulateQueryString(queryObj);

    let url = `${baseURL}/api/v1/patient/prescription${
      queryStr ? `?${queryStr}` : ""
    }`;

    if (date)
      url =
        url +
        (queryStr ? `&prescriptionDate=${date}` : `?prescriptionDate=${date}`);
    console.log(url);
    console.log("blaoaowkdowajd");

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
        : "Fetching prescription failed. Please try again.",
    });
  }
};

export const downloadPrescription = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DOWNLOAD_PRESCRIPTIONS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
      withCredentials: true,
    };

    console.log(id);
    const response = await axios.get(
      `${baseURL}/api/v1/prescriptions/download/${id}`,
      config
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `prescription.pdf`);
    document.body.appendChild(link);
    link.click();

    dispatch({
      type: DOWNLOAD_PRESCRIPTIONS_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: DOWNLOAD_PRESCRIPTIONS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Downloading prescription failed. Please try again.",
    });
  }
};

export const createPrescription = (prescription) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_PRESCRIPTIONS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${baseURL}/api/v1/prescriptions/addPrescription`,
      prescription,
      config
    );

    dispatch({
      type: ADD_PRESCRIPTIONS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRESCRIPTIONS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const updatePrescription = (id, reqbody) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRESCRIPTIONS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.patch(
      `${baseURL}/api/v1/prescriptions/update/${id}`,
      reqbody,
      config
    );
    dispatch({
      type: UPDATE_PRESCRIPTIONS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_PRESCRIPTIONS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
