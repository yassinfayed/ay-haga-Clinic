const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();
const authController = require('../controllers/authController');
const enums = require('../constants/enums');
router.use(authController.protect); 


router.route("/:id").get(doctorController.getDoctor);
router.route("/").get(doctorController.getAllDoctors);
router.route("/getallDoctors/:id").get(doctorController.getallDoctorsForPatient);
router.route("/updatedoctor").patch( authController.restrictTo(enums.ROLE.DOCTOR),doctorController.updateDoctor);


module.exports = router;
