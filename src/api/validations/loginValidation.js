const Joi = require("joi");

const LoginValidation = (data) => {
    const SchemaValidation = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    return SchemaValidation.validate(data);
};

module.exports.LoginValidation = LoginValidation;