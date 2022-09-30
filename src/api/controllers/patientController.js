const CryptoJS = require("crypto-js");

const patient = require("../models/patientModel");
const {
    RegistrationValidation,
} = require("../validations/patientValidation");

const registerPatient = async(req, res) => {
    // validating user input fields
    const { err } = RegistrationValidation(req.body);
    try {
        if(err) {
            res.send({ message: err["details"][0]["message"] });
        }

        // checking whether the user has already registered
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
            return res.status(400).json("User already exists !");
        }

        // creating a new patient object
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
                process.env.PASS_SECRET, // encrypting the password
            ).toString(),
        });

        try {
            // checking the data in the console
            const savedPatient = newPatient.save(); // saving data
            res.status(200).json(savedPatient);
            console.log(newPatient);
            console.log("Patient Saved Successfully !");
        } catch(err) {
            res.status(400).json("Error"); // error handling
        }
    } catch(err) {
        console.log(err);
    }
};

const getPatients = async(req, res) => {
    try {
        // taking all the patient data
        const allPatients = await patient.find();
        res.send(allPatients); // sending the taken data
    } catch(err) {
        res.status(400).json(err.message); // error handling
    }
};

const getOnePatient = async(req, res) => {
    try {
        // taking the relavent patient
        const takenPatient = await patient.findOne({ _id: req.params.id });

        // checking whether is there that patient in the DB
        if(!takenPatient) {
            res.status(404).json("Patient not found !"); // if not found patient
        } else {
            res.status(200).json(takenPatient); // if found sending display patient
        }
    } catch(err) {
        res.status(400).json(err.message); // error handling
    }
};

const deletePatient = async(req, res) => {
    const patientID = req.params.id;
    try {
        // taking patient's id to a variable
        const Patient = await patient.findById(patientID);

        // checking whether is there that patient in the DB
        if(!Patient) {
            res.status(404).json("Patient not found !"); // if not found patient
        } else {
            const deletedPatient = await patient.findByIdAndDelete(
                patientID,
            ); // if found delete patient
            res.status(200).json(deletedPatient);
            console.log("Patient Deleted Successfully !");
        }
    } catch(err) {
        console.log(err);
        res.status(400).json(err.message); // error handling
    }
};

const updatePatient = async(req, res) => {
    // taking the newly user entered password and encrypt it (if new password entered)
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET,
        ).toString();
    }

    try {
        // setting the updated details of the specific user and update database
        const updatedPatient = await patient.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true },
        );

        // checking whether is there any updated Patient
        if(!updatedPatient) {
            res.status(500).json("Patient Not Found !");
            console.log("Patient Not Found !");
        } else {
            // sending the updated user when it is successfull
            res.status(200).json(updatedPatient);
            console.log("Patient Updated Successfully !");
        }
    } catch(err) {
        // if there is any error in updating this will catch it and send
        res.status(400).json(err);
        console.log("Patient Update Error !");
    }
};

module.exports = {
    registerPatient,
    getPatients,
    getOnePatient,
    deletePatient,
    updatePatient,
};