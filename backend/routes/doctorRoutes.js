const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();

router.route("/getDoctor/:id").get(doctorController.getDoctor);

module.exports = router;
