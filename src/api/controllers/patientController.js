const CryptoJS = require("crypto-js");

const patient = require("../models/patientModel");
const {
    RegistrationValidation,
} = require("../validations/patientValidation");

const registerPatient = async(req, res) => {
    // validating user input fields
    const { err } = RegistrationValidation(req.body);
    if(err) {
        res.send({ message: err["details"][0]["message"] });
    }

    // checking whther the user has already registered
    const emailExists = await patient.findOne({
        email: req.body.email,
    });

    const usernameExists = await patient.findOne({
        username: req.body.username,
    });

    const nicExists = await patient.findOne({
        nic: req.body.nic,
    });

    if(emailExists || nicExists || usernameExists) {
        return res.status(400).json("User already exists");
    }

    // encrypting the password
    const newPatient = new patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        nic: req.body.nic,
        address: req.body.address,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        username: req.body.username,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET,
        ).toString(),
    });

    try {
        // checking the data in the console
        console.log(newPatient);
        console.log("Patient Saved Successfully");
        const savedPatient = newPatient.save();
        res.send(savedPatient);
    } catch(err) {
        res.status(400).json("Error");
    }
};

module.exports = {
    registerPatient,
};