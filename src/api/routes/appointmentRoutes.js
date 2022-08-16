const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const {
    addAppointment,
    
} = require("../controllers/appointment.controller");
const Appointment = require("../model/appointmentModel");

//define user routes
router.post("/add", verifyToken, addAppointment);
module.exports = router;
