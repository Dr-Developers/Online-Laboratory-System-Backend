const router = require("express").Router();

const {
	addInventory,
	getInventory,
	getOneInventory,
	updateInventory,
	deleteInventory,
} = require("../controllers/inventoryController");
const { verifyTokenAndLabAss } = require("../verifyToken/verifyToken");

// defining routes
router.post("/add", verifyTokenAndLabAss, addInventory);
router.get("/", verifyTokenAndLabAss, getInventory);
router.get("/:id", verifyTokenAndLabAss, getOneInventory);
router.put("/update/:id", verifyTokenAndLabAss, updateInventory);
router.delete("/delete/:id", verifyTokenAndLabAss, deleteInventory);

module.exports = router;
