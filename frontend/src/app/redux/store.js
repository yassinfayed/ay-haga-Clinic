import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer} from './reducers/userReducer';
import {getDrsForPatientsReducer} from './reducers/doctorReducer';
import { viewPatientsAppointmentsReducer } from './reducers/patientReducer';
import { viewDoctorPatientsReducer } from './reducers/doctorReducer';
import { updateDoctorsReducer } from './reducers/doctorReducer';
import { viewDoctorsAppointmentsReducer } from './reducers/doctorReducer';
import { createHealthPackageReducer, getHealthPackagesReducer, getHealthPackageReducer, updateHealthPackageReducer, deleteHealthPackageReducer } from './reducers/healthPackagesReducer';


const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    getDrsForPatientsReducer,
    viewPatientsAppointmentsReducer,
    viewDoctorPatientsReducer,
    updateDoctorsReducer,
    viewDoctorsAppointmentsReducer
    createHealthPackageReducer,
    getHealthPackagesReducer,
    getHealthPackageReducer,
    updateHealthPackageReducer,
    deleteHealthPackageReducer
  },
});

export default store;
