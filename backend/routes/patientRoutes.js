const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const enums =  require('../constants/enums');

router.use(protect);

router.route("/view-Patients").get(patientController.viewMyPatients); 
router.get("/",restrictTo(enums.ROLE.ADMIN),patientController.getAllPatients)
// router.route("/filter-Patients-Based-On-Upcoming-Appointments").get(patientController.FilterPatientsBasedOnUpcomimgAppointments);



router.get('/viewHealthPackageSubscription/:id',patientController.viewHealthPackageSubscription);


router.post('/upload/healthRecords/:id',patientController.uploadHealthRecords.single('image'),patientController.postUploadHealth);

router.get("/viewHealthRecords/:id",patientController.viewHealthRecords);
router.get("/cancelSubscription/:id",patientController.cancelSubscription);
router.route("/getPatient/:id").get(patientController.getPatient);
router.get('/prescription', patientController.getAllPrescriptions);
router.get('/prescription/:id', patientController.getPrescription);
router.post('/upload/medicalRecords',protect,patientController.uploadMedicineRecords.array('documents', 5),patientController.postUpload);
router.get('/download',patientController.downloadSingleRecord);
router.get('/downloadHealthRecord/:id',patientController.downloadHealthRecord);

module.exports = router;
