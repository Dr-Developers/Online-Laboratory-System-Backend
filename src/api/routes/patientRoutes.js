const router = require("express").Router();

const { registerPatient } = require("../controllers/patientController");

// defining routes
router.post("/register", registerPatient);

module.exports = router;