const Appointment = require("../models/appointmentModel");
const {
	appointmentValidation,
} = require("../validations/appointmentValidation");

//add appointment function
const addAppointment = async (req, res) => {
	//validate the appointment input fields
	const { error } = appointmentValidation(req.body.data);
	if (error) {
		res.send({ message: error["details"][0]["message"] });
	}

	// checking the data in the console
	console.log(req.body.data);

	//to check appointment already exist
	const appointmentExist = await Appointment.findOne({
		nic: req.body.data.nic,
		date: req.body.data.date,
	});

	if (appointmentExist) {
		return res
			.status(400)
			.send({ message: "Appointment already exist" });
	}

	//assign data to the model
	const appointment = new Appointment({
		date: req.body.data.date,
		time: req.body.data.time,
		firstName: req.body.data.firstName,
		lastName: req.body.data.lastName,
		nic: req.body.data.nic,
		phoneNumber: req.body.data.phoneNumber,
		email: req.body.data.email,
		gender: req.body.data.gender,
		age: req.body.data.age,
		testName: req.body.data.testName,
	});

	try {
		//save the data in the database

		const savedAppointment = await appointment.save();
		console.log("Appointment Saved Successfully");
		// res.send(savedAppointment);
		res.status(200).json(savedAppointment);
	} catch (error) {
		//error handling
		res.status(400).send({ message: error });
	}
};

//get all function
const getAppointments = async (req, res) => {
	try {
		// taking all the Appointments data
		const allAppointments = await Appointment.find();
		res.send(allAppointments); // sending the taken data
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const getOneAppointment = async (req, res) => {
	try {
		// taking the relavent Appointment
		const takenAppointment = await Appointment.findOne({
			_id: req.params.id,
		});

		// checking whether is there that Appointment in the DB
		if (!takenAppointment) {
			res.status(404).json("Appointment not found !"); // if not found Appointment
		} else {
			res.status(200).json(takenAppointment); // if found sending display Appointment
		}
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const getDateAndTime = async (req, res) => {
	try {
		// taking the relavent Appointment
		// let userDate = req.params.date;
		// let userTime = req.params.time;
		const data = await Appointment.find(
			{ date: req.body.data.date },
			{ time: req.body.data.time },
		);
		console.log(data);
		// checking whether is there that Appointment in the DB
		if (data) {
			return res.status(200).json(true); // if not found Appointment
		} else {
			return res.status(200).json(false); // if found sending display Appointment
		}
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const updateAppointment = async (req, res) => {
	try {
		// setting the updated details of the specific Appointment and update database
		const updateAppointment = await Appointment.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true },
		);

		// checking whether is there any updated Appointment
		if (!updateAppointment) {
			res.status(500).json("Appointment Not Found !");
			console.log("Appointment Not Found !");
		} else {
			// sending the updated Appointment when it is successfull
			res.status(200).json(updateAppointment);
			console.log("Appointment Updated Successfully !");
		}
	} catch (err) {
		// if there is any error in updating this will catch it and send
		res.status(400).json(err);
		console.log("Appointment Update Error !");
	}
};

const deleteAppointment = async (req, res) => {
	const appointmentID = req.params.id;
	try {
		// taking Appointment's id to a variable
		const appointment = await Appointment.findById(appointmentID);

		// checking whether is there that Appointment in the DB
		if (!appointment) {
			res.status(404).json("Appointment not found !"); // if not found Appointment
		} else {
			const deleteAppointment = await Appointment.findByIdAndDelete(
				appointmentID,
			); // if found delete Appointment
			res.status(200).json(deleteAppointment);
			console.log("Appointment Deleted Successfully !");
		}
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

module.exports = {
	addAppointment,
	getAppointments,
	getOneAppointment,
	getDateAndTime,
	updateAppointment,
	deleteAppointment,
}; //export functions
