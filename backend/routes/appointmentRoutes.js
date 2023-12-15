const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();
const { protect } = require("../controllers/authController");
const authController = require("../controllers/authController");
const paymentController = require("../controllers/paymentController");
const enums = require("../constants/enums");
router.use(protect);

router.get(
  "/get-patient-appointments",
  appointmentController.getAllPatientAppointments,
);
router.get(
  "/get-doctor-appointments",
  appointmentController.getAllDoctorAppointments,
);
router.get("/:id", appointmentController.getAppointment);

//This will be deleted in sprints 2 & 3 as it will involve much more complexity, payment refund etc.../ Will be used for now to seed dummy data if we wanted to
router.post("/newAppointment", appointmentController.createAppointment);
router.post(
  "/followUp",
  authController.restrictTo(enums.ROLE.DOCTOR, enums.ROLE.PATIENT),
  appointmentController.followUpAppointment,
);
router.patch(
  "/reschedule/:id",
  authController.restrictTo(enums.ROLE.DOCTOR, enums.ROLE.PATIENT),
  appointmentController.rescheduleAppointment,
);
router.patch(
  "/cancel/:id",
  authController.restrictTo(enums.ROLE.DOCTOR, enums.ROLE.PATIENT),
  appointmentController.cancelAppointment,
);
router.patch("/update/:id", appointmentController.updateAppointment);
router.post(
  "/evaluateFollowUp/:id",
  authController.restrictTo(enums.ROLE.DOCTOR),
  appointmentController.evaluateFollowUp,
);
router.delete("/delete/:id", appointmentController.deleteAppointment);

router
  .route("/reserveStripe/:id/:price")
  .get(authController.protect, paymentController.getReservationCheckoutSession);
router
  .route("/reserve/:id/:price")
  .post(authController.protect, paymentController.createAppointmentReservation);

module.exports = router;
