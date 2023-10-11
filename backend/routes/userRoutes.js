const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();
const enums = require('../constants/enums');


router.route("/:id").delete(authController.protect,authController.restrictTo(enums.ROLE.ADMIN),userController.deleteUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get("/", userController.getAllUsers);

module.exports = router;
