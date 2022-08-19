const router = require("express").Router();

const {
	registerPatient,
	getPatients,
	getOnePatient,
	deletePatient,
	updatePatient,
} = require("../controllers/patientController");

// defining routes
router.post("/register", registerPatient);
router.get("/", getPatients);
router.get("/:id", getOnePatient);
router.delete("/delete/:id", deletePatient);
router.put("/update/:id", updatePatient);

module.exports = router;
