import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer} from './reducers/userReducer';

const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
  },
});

export default store;
