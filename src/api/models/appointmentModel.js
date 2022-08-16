const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
        firstName: { 
            type: String, 
            required: true },
        lastName: { 
            type: String, 
            required: true },
        nic: { 
            type: String, 
            required: true, unique: true },
        phoneNumber: { 
            type: String, 
            required: true },
        email: { 
            type: String, 
            required: true, unique: true },
        gender: { 
            type: String, 
            required: true },
        age: { 
            type: Number, 
            required: true, unique: true },
        testName: { 
            type: String, 
            required: true },

    },

    { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);