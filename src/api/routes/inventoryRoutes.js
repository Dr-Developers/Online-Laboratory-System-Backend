const router = require("express").Router();

const {
	addInventory,
	getInventory,
	getOneInventory,
	updateInventory,
	deleteInventory,
	getInventoryByFilter,
} = require("../controllers/inventoryController");
const { verifyTokenAndLabAss } = require("../verifyToken/verifyToken");

// defining routes
router.post("/add", addInventory);
router.get("/", verifyTokenAndLabAss, getInventory);
router.get("/:id", verifyTokenAndLabAss, getOneInventory);
router.put("/update/:id", verifyTokenAndLabAss, updateInventory);
router.delete("/delete/:id", verifyTokenAndLabAss, deleteInventory);
router.post("/filter", getInventoryByFilter);

module.exports = router;
