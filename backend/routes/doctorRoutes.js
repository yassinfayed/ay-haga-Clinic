const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();
const authController = require('../controllers/authController');
router.use(authController.protect); 

router.route("/getDoctor/:id").get(doctorController.getDoctor);
router.route("/getallDoctors/:id").get(doctorController.getalldoctors);
router.route("/updatedoctor/:id").post( authController.restrictTo(enums.ROLES.DOCTOR),doctorController.updateDoctor);

module.exports = router;
