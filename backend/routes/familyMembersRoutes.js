const express = require('express');
const familyMemberController = require('../controllers/familyMemberController');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.post(
  "/link",
 authController.restrictTo('patient'),
  familyMemberController.linkFamilyMember

);
router.post(
  "/",
 authController.restrictTo('patient'),
  familyMemberController.addFamilyMembers,
  authController.signup
);
router.route("/").get(authController.restrictTo('patient'),familyMemberController.viewRegisteredFamilyMembers);

module.exports = router;
