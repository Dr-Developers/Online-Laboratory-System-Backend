const router = require("express").Router();
const {
    addAppointment,
    getAppointments,
    getOneAppointment,
	updateAppointment,
    deleteAppointment,
} = require("../controllers/appointmentController");

//define user routes
router.post("/add", addAppointment);
router.get("/", getAppointments);
router.get("/:id", getOneAppointment);
router.put("/update/:id", updateAppointment);
router.delete("/delete/:id", deleteAppointment);

module.exports = router;
