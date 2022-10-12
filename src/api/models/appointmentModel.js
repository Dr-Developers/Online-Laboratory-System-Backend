const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
	{
		date: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		nic: {
			type: String,
			required: true,
			unique: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		gender: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
			unique: false,
		},
		testName: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["NEW", "APPROVE", "DECLINE"],
			default: "NEW",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
