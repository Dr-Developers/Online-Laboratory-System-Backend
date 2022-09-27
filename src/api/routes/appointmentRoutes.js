const router = require("express").Router();
const {
    addAppointment,
    getAppointments,
    getOneAppointment,
    getDateAndTime,
	updateAppointment,
    deleteAppointment,
} = require("../controllers/appointmentController");

const {
    verifyTokenAuthorization,
    verifyTokenAndLabAss,
} = require("../verifyToken/verifyToken");


//define user routes
router.post("/add", verifyTokenAuthorization, addAppointment);
router.get("/", verifyTokenAndLabAss, getAppointments);
router.get("/:id", verifyTokenAuthorization, getOneAppointment);
router.get("/check", verifyTokenAuthorization, getDateAndTime);
router.put("/update/:id", verifyTokenAuthorization, updateAppointment);
router.delete("/delete/:id", verifyTokenAuthorization, deleteAppointment);

module.exports = router;
