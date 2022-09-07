const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const patientRoute = require("./api/routes/patientRoutes");
const appointmentRoute = require("./api/routes/appointmentRoutes");
const reportRoute = require("./api/routes/reportRoutes");
const inventoryRoute = require("./api/routes/inventoryRoutes");
const authRoute = require("./api/routes/authRoutes");
const labAssRoute = require("./api/routes/labAssRoutes");

const app = express();
dotenv.config();

app.use(cors());

// Creating the connection with the database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
        console.log("Successfully Connected to the MongoDB Database...!"),
    )
    .catch((err) => {
        console.log(err);
    });

// Middleware
app.use(express.json());

app.use("/api/patient", patientRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/report", reportRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/login", authRoute);
app.use("/api/labAssi", labAssRoute);

// Creating the port connection of the Backend Server
app.listen(process.env.PORT || 5000, () => {
    console.log("Listening on port " + process.env.PORT || 5000, "\b...!");
});