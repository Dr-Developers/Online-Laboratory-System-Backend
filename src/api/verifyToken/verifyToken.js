const JWT = require("jsonwebtoken");

const LocalStorage = require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage("./scratch");

const verifyToken = (req, res, next) => {
    // taking the token in to a variable
    const authHeader = req.header("authentication");

    // checking whether the token is available
    if(authHeader) {
        // verifying the token
        JWT.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            // if the token is not valid
            if(err) {
                res.status(403).json("Token is not valid !");
            } else {
                // if the token is valid taking it as a valid user
                req.user = user;
                next();
            }
        });
        // if authHeader is not availabe
    } else {
        // returning user is not authenticated
        return res.status(401).json("You are not Authenticated");
    }
};

// these type of fuctions can do for lab Assistant and well as the patient
const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const isPatient = localStorage.getItem("isPatient");
        const isLabAss = localStorage.getItem("isLabAss");
        if(isPatient || isLabAss) {
            next();
        } else {
            res.status(403).json("You are not allowed to access this !");
        }
    });
};

const verifyTokenAndLabAss = (req, res, next) => {
    verifyToken(req, res, () => {
        const isLabAss = localStorage.getItem("isLabAss");
        if(isLabAss) {
            next();
        } else {
            res.status(403).json("You are not allowed to access this !");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAuthorization,
    verifyTokenAndLabAss,
};