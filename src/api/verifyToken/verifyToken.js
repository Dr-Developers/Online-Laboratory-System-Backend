const { response } = require("express");
const JWT = require("jsonwebtoken");

const verifyToken = (req, re, next) => {
    // taking the token in to a variable
    const authHeader = req.headers("authentication");

    // checking whether the token is available
    if (authHeader) {
        // verifying the token
        JWT.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            // if the token is not valid
            if (err) {
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