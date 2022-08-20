const Joi = require("joi");

const LabAssValidation = (data) => {
    const SchemaValidation = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        nic: Joi.string().required(),
        address: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        gender: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    return SchemaValidation.validate(data);
};

module.exports.LabAssValidation = LabAssValidation;