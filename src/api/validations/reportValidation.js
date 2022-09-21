const Joi = require("joi");

const reportValidation = (data) => {
    const schemaValidation = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        Gender: Joi.string().required(),
        date: Joi.string().required(),
        age: Joi.number().required(),
        nic: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        testName: Joi.string().required(),
        
    });

    return schemaValidation.validate(data);
};

module.exports.reportValidation = reportValidation; //export functions