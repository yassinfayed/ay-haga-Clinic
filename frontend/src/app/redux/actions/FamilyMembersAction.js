import axios from 'axios';
import {
  FAMILY_MEMBERS_REQUEST,
  FAMILY_MEMBERS_SUCCESS,
  FAMILY_MEMBERS_FAIL,
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

    localStorage.setItem('userInfo', JSON.stringify(data)); 
  } catch (error) {
    console.log("hhhhhhhhh");
    dispatch({
      type: FAMILY_MEMBERS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'adding a family member failed. Please try again.',
    });
  }
};
