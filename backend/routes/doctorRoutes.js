const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();
const authController = require('../controllers/authController');
const enums = require('../constants/enums');
router.use(authController.protect); 



router.route("/").get(doctorController.getAllDoctors);
router.route("/updatedoctor").patch( authController.restrictTo(enums.ROLE.DOCTOR),doctorController.updateDoctor);
 


router.route("/getAllDoctors").get(doctorController.getallDoctorsForPatient)
router.get('/specialities',doctorController.allSpecialities)
router.route("/:id").get(doctorController.getDoctor);
router.route("/my-details").get(doctorController.getMyDetails);


module.exports = router;
