import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer} from './reducers/userReducer';
import {getDrsForPatientsReducer} from './reducers/doctorReducer';
import { viewPatientsAppointmentsReducer } from './reducers/patientReducer';
import { viewDoctorPatientsReducer } from './reducers/doctorReducer';
import { updateDoctorsReducer } from './reducers/doctorReducer';
import { viewDoctorsAppointmentsReducer } from './reducers/doctorReducer';

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
  },
});

export default store;
