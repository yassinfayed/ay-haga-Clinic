const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();


router.route("/deleteUser/:id").delete(userController.deleteUser);
router.post('/signup', authController.signup);

module.exports = router;
