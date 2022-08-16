const Appointment = require("../models/appointmentModel");
const { appointmentValidation } = require("../validations/appointmentValidation");

//add appointment function
const addAppointment = async (req, res) => {
const validate = localStorage.getItem("isPatient");

if (validate === "true") {
    //validate the appointment input fields
    const { error } = appointmentValidation(req.body.data);
    if (error) {
    res.send({ message: error["details"][0]["message"] });
    }

    //to check appointment already exist
    const appointmentExist = await Appointment.findOne({
    nic: req.body.data.nic,
    });
    if (appointmentExist) {
    return res.status(400).send({ message: "Appointment already exist" });
    }

    //assign data to the model
    const appointment = new Appointment({
        firstName: req.body.data.firstName,
        lastName: req.body.data.lastName,
        nic: req.body.data.nic,
        phoneNumber: req.body.data.phoneNumber,
        email: req.body.data.email,
        gender: req.body.data.gender,
        age: req.body.data.age,
        testName: req.body.data.testName,
    });

    try {
      //save the data in the database
    const savedAppointment = await appointment.save();
    res.send(savedAppointment);
    } catch (error) {
      //error handling
    res.status(400).send({ message: error });
    }
} else {
    return res.status(403).json("You do not have permission to access this");
}
};

module.exports = {
addAppointment,
}; //export functions
