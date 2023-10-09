import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer} from './reducers/userReducer';
import {getDrsForPatientsReducer} from './reducers/doctorReducer';
import {getHealthPackageReducer, createHealthPackageReducer,updateHealthPackageReducer,deleteHealthPackageReducer} from './reducers/healthPackagesReducer'

const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    getDrsForPatientsReducer,
    getHealthPackageReducer,
    createHealthPackageReducer,
    updateHealthPackageReducer,
    deleteHealthPackageReducer

  },
});

export default store;
