const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();
const { protect } = require('../controllers/authController');

router.use(protect);
router.route("/getPatient/:id").get(patientController.getPatient);
router.get('/prescriptions', patientController.getAllPrescriptions);
router.get('/prescription/:id', patientController.getPrescription);

module.exports = router;
