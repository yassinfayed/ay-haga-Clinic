const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();

router.route("/view-Patients").get(patientController.viewAllPatients); 
router.route("/search-patient-By-Name").get(patientController.SearchPatientByName);
router.route("/filter-Patients-Based-On-Upcoming-Appointments").get(patientController.FilterPatientsBasedOnUpcomimgAppointments);
router.route("/view-All-Appointments").get(patientController.viewAllAppointments);

module.exports = router;
