const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.route("/addAdmin").post(adminController.addAdmin);
router.route("/deleteUser/:id").delete(adminController.deleteUser);
router.route("/viewDoctorApplication/:id").get(adminController.viewDoctorApplication);

module.exports = router;
