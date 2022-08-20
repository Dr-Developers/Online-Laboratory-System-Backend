const CryptoJS = require("crypto-js");

const labAss = require("../models/labAssiModel");
const { LabAssValidation } = require("../validations/labAssValidation");

const registerLabAss = async(req, res) => {
    // validating user input fields
    const { err } = LabAssValidation(req.body);
    if(err) {
        res.send({ message: err["details"][0]["message"] });
    }

    // checking whther the user has already registered
    const emailExists = await labAss.findOne({
        email: req.body.email,
    });

    const usernameExists = await labAss.findOne({
        username: req.body.username,
    });

    const nicExists = await labAss.findOne({
        nic: req.body.nic,
    });

    if(emailExists || nicExists || usernameExists) {
        return res.status(400).json("User already exists !");
    }

    // creating a new patient object
    const newLabAss = new labAss({
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
        console.log(newLabAss);
        console.log("Lab Assitant Saved Successfully !");
        const savedLabAss = newLabAss.save(); // saving data
        res.status(200).json(savedLabAss);
    } catch(err) {
        res.status(400).json("Error"); // error handling
    }
};

const getLabAss = async(req, res) => {
    try {
        // taking all the patient data
        const allLabAss = await labAss.find();
        res.send(allLabAss); // sending the taken data
    } catch(err) {
        res.status(400).json(err.message); // error handling
    }
};

const getOneLabAss = async(req, res) => {
    try {
        // taking the relavent patient
        const takenLabAss = await labAss.findOne({ _id: req.params.id });

        // checking whether is there that patient in the DB
        if(!takenLabAss) {
            res.status(404).json("Lab Assitant not found !"); // if not found patient
        } else {
            res.status(200).json(takenLabAss); // if found sending display patient
        }
    } catch(err) {
        res.status(400).json(err.message); // error handling
    }
};

const deleteLabAss = async(req, res) => {
    const labAssID = req.params.id;
    try {
        // taking patient's id to a variable
        const LabAss = await labAss.findById(labAssID);

        // checking whether is there that patient in the DB
        if(!LabAss) {
            res.status(404).json("Lab Assitant not found !"); // if not found patient
        } else {
            const deletedLabAss = await labAss.findByIdAndDelete(labAssID); // if found delete patient
            res.status(200).json(deletedLabAss);
            console.log("Lab Assitant Deleted Successfully !");
        }
    } catch(err) {
        console.log(err);
        res.status(400).json(err.message); // error handling
    }
};

const updateLabAss = async(req, res) => {
    // taking the newly user entered password and encrypt it (if new password entered)
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET,
        ).toString();
    }

    try {
        // setting the updated details of the specific user and update database
        const updatedLabAss = await labAss.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true },
        );

        // checking whether is there any updated Patient
        if(!updatedLabAss) {
            res.status(500).json("Lab Assitant Not Found !");
            console.log("Lab Assitant Not Found !");
        } else {
            // sending the updated user when it is successfull
            res.status(200).json(updatedLabAss);
            console.log("Lab Assitant Updated Successfully !");
        }
    } catch(err) {
        // if there is any error in updating this will catch it and send
        res.status(400).json(err);
        console.log("Lab Assitant Update Error !");
    }
};

module.exports = {
    registerLabAss,
    getLabAss,
    getOneLabAss,
    deleteLabAss,
    updateLabAss,
};