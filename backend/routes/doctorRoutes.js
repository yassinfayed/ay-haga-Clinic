const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();

router.route("/getDoctor/:id").get(doctorController.getDoctor);
router.route("/getallDoctors/:id").get(doctorController.getalldoctors);
router.route("/updatedoctor/:id").post(doctorController.updateDoctor);

module.exports = router;
