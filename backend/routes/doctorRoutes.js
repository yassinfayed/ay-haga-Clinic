const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();
const authController = require('../controllers/authController');
const enums = require('../constants/enums');
router.use(authController.protect); 



router.route("/").get(doctorController.getAllDoctors);
router.route("/updatedoctor").patch( authController.restrictTo(enums.ROLE.DOCTOR),doctorController.updateDoctor);
router.route('/acceptdoctor/:id').patch(authController.restrictTo(enums.ROLE.ADMIN),doctorController.acceptDoctor);
router.route('/rejectdoctor/:id').patch(doctorController.rejectDoctor);
//Reject will use same endpoint as removing a user and same for rejecting a contract
router.route('/viewcontract').get(authController.restrictTo(enums.ROLE.DOCTOR),doctorController.viewEmploymentContract)
router.route('/acceptcontract').patch(authController.restrictTo(enums.ROLE.DOCTOR),doctorController.acceptEmploymentContract)

router.route('/addavailabledate').patch(authController.restrictTo(enums.ROLE.DOCTOR),doctorController.addAvailableDate)
router.get("/doctorDocs/:id",doctorController.getDoctorDocs);

router.route("/getAllDoctors").get(doctorController.getallDoctorsForPatient)
router.get('/specialities',doctorController.allSpecialities)
router.route("/:id").get(doctorController.getDoctor);
router.route("/my-details").get(doctorController.getMyDetails);


module.exports = router;
