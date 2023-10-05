const express = require('express');
const familyMemberController = require('../controllers/familyMemberController');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post(
  "/add-family-member",
 authController.restrictTo('patient'),
  familyMemberController.addFamilyMembers
);
router.route("/view-registered-familyMembers").get(authController.restrictTo('patient'),familyMemberController.viewRegisteredFamilyMembers);

module.exports = router;
