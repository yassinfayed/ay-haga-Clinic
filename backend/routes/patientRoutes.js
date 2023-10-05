const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();

router.route("/getPatient/:id").get(patientController.getPatient);

module.exports = router;
