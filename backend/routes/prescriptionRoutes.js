const express = require("express");
const prescriptionController = require("../controllers/prescriptionController");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authController");
const enums = require("../constants/enums");

//router.use(protect);

router.post("/addPrescription", prescriptionController.createPrescription);
router.patch("/update/:id", prescriptionController.updatePrescription);
router.get("/download/:id", prescriptionController.downloadPrescription);
router.post("/check", prescriptionController.checkPrescr);
module.exports = router;
