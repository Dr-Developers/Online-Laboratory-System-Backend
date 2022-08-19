const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true, unique: true },
        date: { type: String, required: true, },
        age: { type: Number, required: true, unique: true },
        nic: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        testName: { type: String, required: true, unique: true },
        test: { type: String, required: true, unique: true },
        result: { type: String, required: true, unique: true },
        normalValues: { type: String, required: true, unique: true },
    },

    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);