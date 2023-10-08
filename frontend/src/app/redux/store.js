import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer} from './reducers/userReducer';
import {addFamilyMembersReducer} from './reducers/FamilyMembersReducer';

const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    addFamilyMembersReducer,
  },
});

export default store;
