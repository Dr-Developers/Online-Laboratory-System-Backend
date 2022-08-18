const router = require("express").Router();
const {
    addAppointment,
    
} = require("../controllers/appointmentController");

//define user routes
router.post("/add", addAppointment);
module.exports = router;
