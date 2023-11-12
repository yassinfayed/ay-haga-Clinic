import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer,forgetPasswordReducer,changePasswordReducer, resetPasswordReducer,logoutReducer} from './reducers/authReducer';
import {removeUserReducer, getUsersReducer} from './reducers/userReducer';
import {addFamilyMembersReducer} from './reducers/FamilyMembersReducer';
import { viewFamilyMembersReducer,linkFamilyMemberReducer } from './reducers/FamilyMembersReducer';
import { patientsReducer } from './reducers/patientsReducers';
import { doctorReducer } from './reducers/doctorReducers';
import { prescriptionReducer } from './reducers/prescriptionsReducers';
import { viewAllPrescriptionsReducer } from './reducers/prescriptionsReducers';
import { filterPatientsBasedOnUpcomingAppointmentsReducer } from './reducers/patientsReducers';
import {getDrsForPatientsReducer} from './reducers/doctorReducer';
import { viewPatientsAppointmentsReducer,downloadPatienttDocsReducer,patientUploadDocs, patientRemoveRecordReducer } from './reducers/patientReducer';
import { viewDoctorPatientsReducer,doctorViewContractReducer, } from './reducers/doctorReducer';
import { updateDoctorsReducer,adminAcceptDoctorReducer,doctorAcceptContractReducer,doctorAddAvailableDateReducer } from './reducers/doctorReducer';
import { viewDoctorsAppointmentsReducer } from './reducers/doctorReducer';
import { createHealthPackageReducer, getHealthPackagesReducer, getHealthPackageReducer, updateHealthPackageReducer, deleteHealthPackageReducer } from './reducers/healthPackagesReducer';
import {patientViewMyDetailsReducer} from './reducers/patientReducer';
import { uploadHealthRecordsReducer } from './reducers/patientReducer';
import { viewAllFamilyMembersAndPatientsReducer } from './reducers/FamilyMembersReducer';


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
    filterPatientsBasedOnUpcomingAppointmentsReducer,
    getDrsForPatientsReducer,
    viewPatientsAppointmentsReducer,
    viewDoctorPatientsReducer,
    updateDoctorsReducer,
    viewDoctorsAppointmentsReducer,
    createHealthPackageReducer,
    getHealthPackagesReducer,
    getHealthPackageReducer,
    updateHealthPackageReducer,
    deleteHealthPackageReducer,
    getUsersReducer,
    adminAcceptDoctorReducer,
    doctorAcceptContractReducer,
    doctorAddAvailableDateReducer,
    doctorViewContractReducer,
    patientViewMyDetailsReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    logoutReducer,
    changePasswordReducer,
    downloadPatienttDocsReducer,
    patientUploadDocs,
    patientRemoveRecordReducer,
    uploadHealthRecordsReducer,
    linkFamilyMemberReducer,
    viewAllFamilyMembersAndPatientsReducer,

  },
});

export default store;
