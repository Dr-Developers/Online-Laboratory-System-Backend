const router = require("express").Router();
const {
	addAppointment,
	getOneAppointment,
	getDateAndTime,
	updateAppointment,
	deleteAppointment,
	getAppointmentsByFilter,
	statusChange,
} = require("../controllers/appointmentController");

const {
	verifyTokenAuthorization,
	verifyTokenAndLabAss,
} = require("../verifyToken/verifyToken");

//define user routes
router.post("/", getOneAppointment);
router.post("/add", verifyTokenAuthorization, addAppointment);
router.post("/check", verifyTokenAuthorization, getDateAndTime);
router.put("/update/:id", verifyTokenAuthorization, updateAppointment);
router.delete("/delete/:id", verifyTokenAuthorization, deleteAppointment);
router.post("/filter", getAppointmentsByFilter); //2
router.post("/statusChange", statusChange);
module.exports = router;
