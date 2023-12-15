const express = require("express");
const healthPackagesController = require("../controllers/healthPackagesController");
const router = express.Router();
const authController = require("../controllers/authController");
const paymentController = require("../controllers/paymentController");

router
  .route("/")
  .get(healthPackagesController.getAllHealthPackage)
  .post(
    authController.protect,
    authController.restrictTo("administrator"),
    healthPackagesController.createHealthPackage,
  );

router
  .route("/subscribeStripe/:id")
  .get(authController.protect, paymentController.getCheckoutSession);
router
  .route("/subscribe/:id")
  .post(authController.protect, paymentController.createOrder);

router
  .route("/:id")
  .get(healthPackagesController.getHealthPackage)
  .patch(
    authController.protect,
    authController.restrictTo("administrator"),
    healthPackagesController.updateHealthPackage,
  )
  .delete(
    authController.protect,
    authController.restrictTo("administrator"),
    healthPackagesController.deleteHealthPackage,
  );

router
  .route("/services")
  .get(healthPackagesController.getAllHealthPackage)
  .post(
    authController.protect,
    authController.restrictTo("administrator"),
    healthPackagesController.createHealthPackage,
  );

module.exports = router;
