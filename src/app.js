const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const patientRoute = require("./api/routes/patientRoutes");
const appointmentRoute = require("./api/routes/appointmentRoutes");

const app = express();
app.use(express.json());
dotenv.config();

// Creating the connection with the database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Successfully Connected to the MongoDB Database...!"))
    .catch((err) => {
        console.log(err);
    });

// Creating the port connection of the Backend Server
app.listen(process.env.PORT || 5000, () => {
    console.log("Listening on port " + process.env.PORT || 5000, "\b...!");
});

app.use("/api/patient", patientRoute);
app.use("/api/appointment", appointmentRoute);