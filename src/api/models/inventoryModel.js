const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
        itemID: { type: String, required: true },    
        itemName: { type: String, required: true },
        supplierName: { type: String, required: true },
        supplierMobile: { type: String, required: true },
        unitPrice: { type: String, required: true, unique: true },
        quantity: { type: String, required: true },
        totalPrice: { type: String, required: true },
        purchaseDate: { type: Date, required: true },
        isInventory : { type: Boolean, default: true },
    },

    { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);