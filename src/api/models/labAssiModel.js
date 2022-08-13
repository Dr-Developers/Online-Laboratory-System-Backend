const mongoose = require("mongoose");

const labAssistantSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        nic: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isLabAss: { type: Boolean, default: true },
    },

    { timestamps: true }
);

module.exports = mongoose.model("LabAssistant", labAssistantSchema);