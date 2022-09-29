const Report = require("../models/reportModel");
const { reportValidation } = require("../validations/reportValidation");

//add report function
const addReport = async(req, res) => {
    //validate the report input fields
console.log("dd");
    // const { error } = reportValidation(req.body.data);
    // if(error) {
    //     return res.send({ message: error["details"][0]["message"] });
    // }
console.log("ee");
   // checking the data in the console
    console.log(req.body);

    //to check report already exist
    const reportExist = await Report.findOne({
        nic: req.body.data.nic,
        date: req.body.data.date,
        testName: req.body.data.testName,
    });

    if(reportExist) {
        // console.log(nicExist);
        return res.status(400).send({ message: "Report already exist" });
    }

	try {
		console.log("ok");
    //assign data to the model
    const report = await new Report({
        firstName: req.body.data.firstName,
        lastName: req.body.data.lastName,
        Gender: req.body.data.Gender,
        date: req.body.data.date,
        age: req.body.data.age,
        nic: req.body.data.nic,
        phoneNumber: req.body.data.phoneNumber,
        testName: req.body.data.testName,
        testData: req.body.data.testData,
    }).save()

    console.log("ss",report);
        //save the data in the database
        //console.log("Report Saved Successfully");
        //const savedReport = await report.save();
        return res.status(200).json(report);
        console.log("Report Saved Successfully",savedReport);
    } catch(error) {
        //error handling
        return res.status(400).send({ message: error });
    }
};

const getreports = async (req, res) => {
	try {
		// taking all the report data
		const allReports = await Report.find();
		res.send(allReports); // sending the taken data
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const getOneReport = async (req, res) => {
	try {
		// taking the relavent report
		const takenReport = await Report.findOne({ _id: req.params.id });

		// checking whether is there that report in the DB
		if (!takenReport) {
			res.status(404).json("Report not found !"); // if not found report
		} else {
			res.status(200).json(takenReport); // if found sending display report
		}
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const deleteReport = async (req, res) => {
	const reportID = req.params.id;
	try {
		// taking report id to a variable
		const report = await Report.findById(reportID);

		// checking whether is there that report in the DB
		if (!report) {
			res.status(404).json("Report not found !"); // if not found report
		} else {
			const deletedReport = await Report.findByIdAndDelete(
				reportID,
			); // if found delete report
			res.status(200).json(deletedReport);
			console.log("Report Deleted Successfully !");
		}
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const updateReport = async (req, res) => {
	
	try {
		// setting the updated details of the specific user and update database
		const updatedReport = await Report.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true },
		);

		// checking whether is there any updated report
		if (!updatedReport) {
			res.status(500).json("Report Not Found !");
			console.log("Report Not Found !");
		} else {
			// sending the updated user when it is successfull
			res.status(200).json(updatedReport);
			console.log("Report Updated Successfully !");
		}
	} catch (err) {
		// if there is any error in updating this will catch it and send
		res.status(400).json(err);
		console.log("Report Update Error !");
	}
};

module.exports = {
    addReport,
    getreports,
	getOneReport,
	deleteReport,
	updateReport,
}; //export functions