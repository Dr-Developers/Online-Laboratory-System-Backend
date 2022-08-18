const Appointment = require("../models/appointmentModel");
const { appointmentValidation } = require("../validations/appointmentValidation");

//add appointment function
const addAppointment = async (req, res) => {

    //validate the appointment input fields
    const { error } = appointmentValidation(req.body);
    if (error) {
    res.send({ message: error["details"][0]["message"] });
    }

    // checking the data in the console
    console.log(req.body);

    //to check appointment already exist
    const appointmentExist = await Appointment.findOne({
    nic: req.body.nic,
    });
    if (appointmentExist) {
    return res.status(400).send({ message: "Appointment already exist" });
    }

    //assign data to the model
    const appointment = new Appointment({
        date: req.body.date,
        time: req.body.date,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        testName: req.body.testName,
    });

    try {
      //save the data in the database
    console.log("Appointment Saved Successfully");
    const savedAppointment = await appointment.save();
    res.send(savedAppointment);
    } catch (error) {
      //error handling
    res.status(400).send({ message: error });
    }
};

module.exports = {
addAppointment,
}; //export functions
