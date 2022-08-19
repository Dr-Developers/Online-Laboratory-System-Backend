const Report = require("../models/reportModel");
const { reportValidation } = require("../validations/reportValidation");

//add report function
const addReport = async(req, res) => {
    //validate the report input fields
    const { error } = reportValidation(req.body);
    if(error) {
        res.send({ message: error["details"][0]["message"] });
    }

    // checking the data in the console
    // console.log(req.body);

    //to check report already exist
    const reportExist = await Report.findOne({
        nic: req.body.nic,
        date: req.body.date,
        testName: req.body.testName,
    });

    if(reportExist) {
        // console.log(nicExist);
        return res.status(400).send({ message: "Report already exist" });
    }

    //assign data to the model
    const report = new Report({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        date: req.body.date,
        age: req.body.age,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber,
        testName: req.body.testName,
        test: req.body.test,
        result: req.body.result,
        normalValues: req.body.normalValues,
    });

    try {
        //save the data in the database
        console.log("Report Saved Successfully");
        const savedReport = await report.save();
        res.send(savedReport);
        console.log(savedReport);
    } catch(error) {
        //error handling
        res.status(400).send({ message: error });
    }
};

module.exports = {
    addReport,
}; //export functions