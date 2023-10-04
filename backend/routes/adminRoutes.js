const express = require('express');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const doctorController = require('../controllers/doctorController');
const router = express.Router();

router.route("/addAdmin").post(adminController.addAdmin);

module.exports = router;
