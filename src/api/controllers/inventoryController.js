const Inventory = require("../models/inventoryModel");
const {
    InventoryValidation,
} = require("../validations/inventoryValidation");

//add inventory function
const addInventory = async(req, res) => {
    //validate the inventory input fields
    const { error } = InventoryValidation(req.body);
    if(error) {
        res.send({ message: error["details"][0]["message"] });
    }

    // checking the data in the console
    console.log(req.body);

    //to check inventory already exist
    const inventoryExist = await Inventory.findOne({
        itemID: req.body.itemID,
        itemName: req.body.itemName,
    });

    if(inventoryExist) {
        return res.status(400).json("Inventory already exists !");
    }

    //assign inventory details to the model
    const inventory = new Inventory({
        itemID: req.body.itemID,     
        itemName: req.body.itemName,
        supplierName: req.body.supplierName,
        supplierMobile: req.body.supplierMobile,
        unitPrice: req.body.unitPrice,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        purchaseDate: req.body.purchaseDate,
    });

    try {
        //save the data in the database
        console.log("Invenory Details Saved Successfully");
        const savedInventory = await inventory.save();
        res.send(savedInventory);
    } catch(err) {
        res.status(400).send({ message: error });//error handling
    }
};

//get all function
const getInventory = async (req, res) => {
	try {
		// taking all the inventory details
		const allInventory = await Inventory.find();
		res.send(allInventory); // sending the taken data
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const getOneInventory = async (req, res) => {
	try {
		// taking the relavent inventory
		const takenInventory = await Inventory.findOne({ _id: req.params.id });

		// checking whether is there that inventory in the DB
		if (!takenInventory) {
			res.status(404).json("Inventory not found !"); // if not found inventory
		} else {
			res.status(200).json(takenInventory); // if found sending display inventory
		}
	} catch (err) {
		res.status(400).json(err.message); // error handling
	}
};

const updateInventory = async (req, res) => {

	try {
		// setting the updated details of the specific inventory and update database
		const updateInventory = await Inventory.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true },
		);

		// checking whether is there any updated inventory
		if (!updateInventory) {
			res.status(500).json("Inventory Not Found !");
			console.log("Inventory Not Found !");
		} else {
			// sending the updated inventory when it is successfull
			res.status(200).json(updateInventory);
			console.log("Inventory Details Updated Successfully !");
		}
	} catch (err) {
		// if there is any error in updating this will catch it and send
		res.status(400).json(err);
		console.log("Appointment Update Error !");
	}
};


const deleteInventory = async (req, res) => {
	const itemID = req.params.id;
	try {
		// taking inventory id to a variable
		const inventory = await Inventory.findById(itemID);

		// checking whether is there that inventory in the DB
		if (!inventory) {
			res.status(404).json("Inventory not found !"); // if not found inventory
		} else {
			const deleteInventory = await Inventory.findByIdAndDelete(
				itemID,
			); // if found delete inventory
			res.status(200).json(deleteInventory);
			console.log("Inventory Deleted Successfully !");
		}
	} catch (err) {
		console.log(err);
		res.status(400).json(err.message); // error handling
	}
};

module.exports = {
    addInventory,
    getInventory,
    getOneInventory,
    updateInventory,
    deleteInventory,
}; //export functions