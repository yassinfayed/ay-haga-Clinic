const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();
const { protect } = require('../controllers/authController');

router.route("/view-Patients").get(patientController.viewAllPatients); 
router.route("/search-patient-By-Name").get(patientController.SearchPatientByName);
router.route("/filter-Patients-Based-On-Upcoming-Appointments").get(patientController.FilterPatientsBasedOnUpcomimgAppointments);
router.route("/view-All-Appointments").get(patientController.viewAllAppointments);


router.use(protect);
router.route("/getPatient/:id").get(patientController.getPatient);
router.get('/prescriptions', patientController.getAllPrescriptions);
router.get('/prescription/:id', patientController.getPrescription);

module.exports = router;
