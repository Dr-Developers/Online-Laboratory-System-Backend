const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const patient = require("../models/patientModel");
const labAss = require("../models/labAssiModel");
const { LoginValidation } = require("../validations/loginValidation");
const LocalStorage = require("node-localstorage").LocalStorage;

var localStorage = new LocalStorage("./scratch");

const login = async(req, res) => {
    try {
        //validate the inventory input fields
        const { error } = LoginValidation(req.body);
        if(error) {
            res.send({ message: error["details"][0]["message"] });
        }

        // taking data from the database for relavent username
        const patientData = await patient.findOne({
            username: req.body.username,
        }); // if it is a patient
        const labAssData = await labAss.findOne({
            username: req.body.username,
        }); // if it is a LabAss

        if(patientData) {
            // code fot testing purposes

            localStorage.setItem("isPatient", patientData.isPatient);
            console.log("===================");
            console.log("Logged as a Patient");
            console.log("===================");

            // decypting the patient password
            const decryptedPassword = CryptoJS.AES.decrypt(
                patientData.password,
                process.env.PASS_SECRET,
            ).toString(CryptoJS.enc.Utf8);

            try {
                // checking whether the password we entered is correct or not
                if(decryptedPassword !== req.body.password) {
                    res.status(401).json("Wrong Password !");
                    console.log("Wrong Password!");
                } else {
                    console.log(patientData);
                    console.log("Login Successfull !");
                    // generating the web token to the specified user
                    const accessToken = JWT.sign({
                            _id: patientData.id,
                        },
                        process.env.JWT_SECRET, { expiresIn: "3d" },
                    );

                    res.header("authentication", accessToken).send({
                        authentication: accessToken,
                        role: "patient",
                        roleData: patientData,
                    });

                    // if the user exist : show data in the user variable
                    res.status(200).json({ accessToken });
                }
            } catch(err) {
                res.status(400).json(err.message); // error handling
            }
        } else if(labAssData) {
            localStorage.setItem("isLabAss", labAssData.isLabAss);
            console.log("=========================");
            console.log("Logged as a Lab Assistant");
            console.log("=========================");

            // decypting the patient password
            const decryptedPassword = CryptoJS.AES.decrypt(
                labAssData.password,
                process.env.PASS_SECRET,
            ).toString(CryptoJS.enc.Utf8);

            try {
                // checking whether the password we entered is correct or not
                if(decryptedPassword !== req.body.password) {
                    return res.status(401).json("Wrong Password !");
                } else {
                    // Testing Purpose
                    console.log(labAssData);
                    console.log("Login Successfull !");

                    // generating the web token to the specified user
                    const accessToken = JWT.sign({
                            _id: labAssData.id,
                        },
                        process.env.JWT_SECRET, { expiresIn: "3d" },
                    );

                    res.header("authentication", accessToken).send({
                        authentication: accessToken,
                        role: "labAss",
                        roleData: labAssData,
                    });

                    // if the user exist : show data in the user variable
                    res.status(200).json({ accessToken });
                }
            } catch(err) {
                res.status(400).json(err.message); // error handling
            }
        } else {
            res.status(500).json("Wrong credentials !");
        }
    } catch(err) {}
};

let refreshTokens = [];

const logout = async(req, res) => {
    const TokenRefresh = req.params.authentication;

    localStorage.clear();

    try {
        refreshTokens = refreshTokens.filter(
            (accessToken) => accessToken !== TokenRefresh,
        );
        res.status(200).json("You are logged out successfully");
        console.log("You are logged out successfully !");
    } catch(err) {
        return res.status(400).send({ message: err });
    }
};

module.exports = { login, logout };