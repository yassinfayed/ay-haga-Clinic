import axios from 'axios';
import {
  FAMILY_MEMBERS_REQUEST,
  FAMILY_MEMBERS_SUCCESS,
  FAMILY_MEMBERS_FAIL,
  VIEW_FAMILY_MEMBERS_REQUEST,
  VIEW_FAMILY_MEMBERS_SUCCESS,
  VIEW_FAMILY_MEMBERS_FAIL,
  LINK_FAMILY_MEMBER_REQUEST,
  LINK_FAMILY_MEMBER_SUCCESS,
  LINK_FAMILY_MEMBER_FAIL,
  VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_REQUEST,
  VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_SUCCESS,
  VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_FAIL,
} from '../constants/FamilyMembersConstants';
import baseURL from '../baseURL';


export const addFamilyMembers = (reqBody) => async (dispatch) => {
  try {
    console.log("hey")
    dispatch({
      type: FAMILY_MEMBERS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/familyMembers`,
      reqBody ,
      config
    );

    dispatch({
      type: FAMILY_MEMBERS_SUCCESS,
      payload: data.data,
    });

    // localStorage.setItem('userInfo', JSON.stringify(data)); 
  } catch (error) {
    console.log(error);
    dispatch({
      type: FAMILY_MEMBERS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'adding a family member failed. Please try again.',
    });
  }
};

export const viewFamilyMembers = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_FAMILY_MEMBERS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.get(
      `${baseURL}/api/v1/familyMembers`,
      config
    );

    dispatch({
      type: VIEW_FAMILY_MEMBERS_SUCCESS,
      payload: data.data,
    });
 
  } catch (error) {
    console.log(error);
    dispatch({
      type: VIEW_FAMILY_MEMBERS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'viewing family members failed. Please try again.',
    });
  }
};

export const LinkFamilyMember = (body) => async (dispatch) => {
  try {
    dispatch({
      type: LINK_FAMILY_MEMBER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/familyMembers/link`,
      body,
      config
    );

    dispatch({
      type: LINK_FAMILY_MEMBER_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    console.log(error);
    dispatch({
      type: LINK_FAMILY_MEMBER_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Linking family members failed. Please try again.',
    });
  }
};

export const viewAllFamilyMembersAndPatients = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`${baseURL}/api/v1/familyMembers/view-all-family-members`, config);

    dispatch({
      type: VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Fetching family members and patient details failed. Please try again.',
    });
  }
};

