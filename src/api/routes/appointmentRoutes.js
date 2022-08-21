const router = require("express").Router();
const {
    addAppointment,
    getAppointments,
    getOneAppointment,
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
router.put("/update/:id", verifyTokenAuthorization, updateAppointment);
router.delete("/delete/:id", verifyTokenAuthorization, deleteAppointment);

module.exports = router;
