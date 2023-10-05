const express = require('express');
const healthPackagesController = require('../controllers/healthPackagesController');
const router = express.Router();
const authController = require('../controllers/authController');



router.route("/")
    .get(authController.protect, healthPackagesController.getAllHealthPackage)
    .post(authController.protect, authController.restrictTo("administrator"), healthPackagesController.createHealthPackage)

router.route("/:id").get(healthPackagesController.getHealthPackage)
    .patch(authController.protect, authController.restrictTo("administrator"),healthPackagesController.updateHealthPackage)
    .delete(authController.protect, authController.restrictTo("administrator"), (healthPackagesController.deleteHealthPackage))

module.exports = router;
