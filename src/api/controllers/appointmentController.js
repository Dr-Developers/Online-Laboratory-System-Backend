const Appointment = require("../models/appointmentModel");
const momentUTCTimeFormatter = require("moment");
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

	const appointmentDate = momentUTCTimeFormatter(
		req.body.data.date,
	).format("MM/DD/YYYY");

	const appointmentTime = momentUTCTimeFormatter(
		req.body.data.time,
	).format("hh:mm A");

	//assign data to the model
	const appointment = new Appointment({
		date: appointmentDate,
		time: appointmentTime,
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
		res.status(200).json(savedAppointment);
	} catch (error) {
		//error handling
		res.status(400).send({ message: error });
		console.log(error);
	}
};

const getAppointmentsByFilter = async (request, response) => {
	try {
		let { searchFilter } = request.body;

		let appointmentViewModel = [];

		if (searchFilter) {
			appointmentViewModel = await Appointment.find({
				firstName: { $regex: searchFilter, $options: "i" },
			});
		} else {
			appointmentViewModel = await Appointment.find();
		}

		let basicAppointmentViewModel = [];

		for (const item of appointmentViewModel) {
			basicAppointmentViewModel.push({
				_id: item._id,
				firstName: item.firstName,
				lastName: item.lastName,
				nic: item.nic,
				phoneNumber: item.phoneNumber,
				email: item.email,
				testName: item.testName,
				status: item.status,
				date: momentUTCTimeFormatter(new Date(item.date)).format(
					"MMMM Do YYYY",
				),
				time: item.time,
			});
		}

		response.json(basicAppointmentViewModel);
	} catch (error) {}
};

const getOneAppointment = async (req, res) => {
	try {
		// taking the relavent Appointment
		const nic = req.body.nic;
		console.log(nic);
		const takenAppointment = await Appointment.findOne({ nic: nic });
		console.log(takenAppointment);

		// checking whether is there that Appointment in the DB
		if (!takenAppointment) {
			res.status(400).json("Appointment not found !"); // if not found Appointment
		} else {
			res.status(200).json(takenAppointment); // if found sending display Appointment
		}
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const getDateAndTime = async (request, response) => {
	try {
		const appointmentDate = momentUTCTimeFormatter(
			request.body.data.date,
		).format("MM/DD/YYYY");

		const appointmentTime = momentUTCTimeFormatter(
			request.body.data.time,
		).format("hh:mm A");

		const data = await Appointment.find(
			{ date: appointmentDate } && { time: appointmentTime },
		);

		if (data.length === 0) {
			response.json({
				isExsists: false,
				message: "Time Slot is Available!",
			});
		} else {
			response.json({
				isExsists: true,
				message: "Time Slot is not Available!",
			});
		}
	} catch (err) {
		response.status(400).json(err.message); // error handling
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

const statusChange = async (request, response) => {
	try {
		const { status, id } = request.body;
		const appointment = await Appointment.findById(id);
		if (!appointment) {
			response.json({
				isSuceess: false,
				message: "Appointment Not Found",
			});
		}
		const appointmentObj = await Appointment.findByIdAndUpdate(id, {
			$set: {
				status: status,
			},
		});

		response.json({
			isSuceess: true,
			message: "Appointment Status Changed",
		});
	} catch (error) {
		response.json({
			isSuceess: false,
			message: "Error has been occured please try again.",
		});
	}
};

module.exports = {
	addAppointment,
	getOneAppointment,
	getDateAndTime,
	updateAppointment,
	deleteAppointment,
	getAppointmentsByFilter,
	statusChange,
}; //export functions
