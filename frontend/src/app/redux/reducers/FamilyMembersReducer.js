import {
    FAMILY_MEMBERS_REQUEST,
    FAMILY_MEMBERS_SUCCESS,
    FAMILY_MEMBERS_FAIL,
    VIEW_FAMILY_MEMBERS_REQUEST,
    VIEW_FAMILY_MEMBERS_SUCCESS,
    VIEW_FAMILY_MEMBERS_FAIL

  } from '../constants/FamilyMembersConstants';
  
  const initialState = {
    familyMember:null,
    loading: false,
    error: null,
  };
  
  export const addFamilyMembersReducer= (state = initialState, action) => {
    switch (action.type) {
      case FAMILY_MEMBERS_REQUEST :
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FAMILY_MEMBERS_SUCCESS:{
        console.log("success")
        return {
          ...state,
          familyMember: action.payload.data,
          loading: false,
          error: null,
        }};
      case FAMILY_MEMBERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  const initialState2 = {
    familyMembers:null,
    loading: false,
    error: null,
  };
  export const viewFamilyMembersReducer= (state = initialState, action) => {
    switch (action.type) {
      case VIEW_FAMILY_MEMBERS_REQUEST :
        return {
          ...state,
          loading: true,
          error: null,
        };
      case VIEW_FAMILY_MEMBERS_SUCCESS:{
        console.log("success")
        return {
          ...state,
          familyMember: action.payload.data,
          loading: false,
          error: null,
        }};
      case VIEW_FAMILY_MEMBERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };