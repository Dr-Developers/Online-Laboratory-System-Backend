const Joi = require("joi");

const appointmentValidation = (data) => {
    const schemaValidation = Joi.object({
        date: Joi.string().required(),
        time: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        nic: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        gender: Joi.string().required(),
        age: Joi.number().required(),
        testName: Joi.string().required(),
    });

    return schemaValidation.validate(data);
    
};

module.exports.appointmentValidation = appointmentValidation;//export functions