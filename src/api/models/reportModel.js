const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        date: { type: String, required: true },
        age: { type: Number, required: true},
        nic: { type: String, required: true, unique: true },
        Gender: {type: String, required: true},
        phoneNumber: { type: String, required: true },
        testName: { type: String, required: true},
        testData: [[{test:String, result:String, normalValues:String}]]
    },

    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);