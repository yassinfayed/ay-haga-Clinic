import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer} from './reducers/userReducer';
import {addFamilyMembersReducer} from './reducers/FamilyMembersReducer';
import { viewFamilyMembersReducer } from './reducers/FamilyMembersReducer';
import { patientsReducer } from './reducers/patientsReducers';
import { doctorReducer } from './reducers/doctorReducers';
import { prescriptionReducer } from './reducers/prescriptionsReducers';
import { viewAllPrescriptionsReducer } from './reducers/prescriptionsReducers';
import { filterPatientsBasedOnUpcomingAppointmentsReducer } from './reducers/patientsReducers';

const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    addFamilyMembersReducer,
    viewFamilyMembersReducer,
    patientsReducer,
    doctorReducer,
    prescriptionReducer,
    viewAllPrescriptionsReducer,
    filterPatientsBasedOnUpcomingAppointmentsReducer
  },
});

export default store;
