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
  VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_FAIL,
  VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_SUCCESS,
  VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_REQUEST,
} from "../constants/FamilyMembersConstants";

const initialState = {
  familyMember: null,
  loading: false,
  error: null,
};

export const addFamilyMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAMILY_MEMBERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAMILY_MEMBERS_SUCCESS: {
      console.log(state);
      return {
        ...state,
        familyMember: true,
        loading: false,
        error: null,
      };
    }
    case FAMILY_MEMBERS_FAIL:
      console.log(action.payload);
      return {
        ...state,
        familyMember: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const initialState2 = {
  familyMembers: null,
  loading: false,
  error: null,
};
export const viewFamilyMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_FAMILY_MEMBERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case VIEW_FAMILY_MEMBERS_SUCCESS: {
      return {
        ...state,
        familyMember: action.payload,
        loading: false,
        error: null,
      };
    }
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

export const linkFamilyMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case LINK_FAMILY_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case LINK_FAMILY_MEMBER_SUCCESS: {
      return {
        ...state,
        familyMember: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    }
    case LINK_FAMILY_MEMBER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
const initialState3 = {
  familyMembersWithPatients: null,
  loading: false,
  error: null,
};
export const viewAllFamilyMembersAndPatientsReducer = (
  state = initialState3,
  action
) => {
  switch (action.type) {
    case VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_SUCCESS:
      return {
        ...state,
        familyMembersWithPatients: action.payload,
        loading: false,
        error: null,
      };
    case VIEW_ALL_FAMILY_MEMBERS_AND_PATIENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
