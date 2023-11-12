const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();
const enums = require('../constants/enums');


router.route("/:id").delete(authController.protect,authController.restrictTo(enums.ROLE.ADMIN),userController.deleteUser);
router.post('/signup', authController.upload.array('documents', 5), authController.signup);
router.post('/login', authController.login);
router.get("/", userController.getAllUsers);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword', authController.resetPassword);


router.patch('/changePassword', authController.protect,authController.updatePassword);

router.post('/logout', authController.logout);

module.exports = router;
