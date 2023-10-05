const express = require('express');
const exampleController = require('../controllers/exampleController');
const { getAllPrescriptions, getPrescription } = require('../controllers/patientController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.use(protect);
router.get('/prescriptions', getAllPrescriptions);
router.get('/prescription/:id', getPrescription);

module.exports = router;
