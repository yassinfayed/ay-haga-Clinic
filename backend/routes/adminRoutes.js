const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.route("/addAdmin").post(adminController.addAdmin);

module.exports = router;
