const router = require("express").Router();

const {
    registerPatient,
    getPatients,
    getOnePatient,
    deletePatient,
    updatePatient,
    getPatientsByFilter,
} = require("../controllers/patientController");
const {
    verifyTokenAuthorization,
    verifyTokenAndLabAss,
} = require("../verifyToken/verifyToken");

// defining routes
router.post("/register", registerPatient);
router.get("/", verifyTokenAndLabAss, getPatients);
router.get("/:id", getOnePatient);
router.delete("/delete/:id", verifyTokenAndLabAss, deletePatient);
router.put("/update/:id", updatePatient);
router.post("/filter", getPatientsByFilter);

module.exports = router;