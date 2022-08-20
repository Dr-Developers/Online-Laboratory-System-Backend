const Joi = require("joi");

const InventoryValidation = (data) => {
    const schemaValidation = Joi.object({
        itemID: Joi.string().required(),
        itemName: Joi.string().required(),
        supplierName: Joi.string().required(),
        supplierMobile: Joi.string().required(),
        unitPrice: Joi.string().required(),
        quantity: Joi.string().required(),
        totalPrice: Joi.string().required(),
        purchaseDate: Joi.string().required(),      
    });

    return schemaValidation.validate(data);
};

module.exports.InventoryValidation = InventoryValidation;