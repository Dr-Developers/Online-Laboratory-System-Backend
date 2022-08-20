const router = require("express").Router();

const { addInventory,
        getInventory,
        getOneInventory,
        updateInventory,
        deleteInventory,
        
    } = require("../controllers/inventoryController");

// defining routes
router.post("/add", addInventory);
router.get("/", getInventory);
router.get("/:id", getOneInventory);
router.put("/update/:id", updateInventory);
router.delete("/delete/:id", deleteInventory);

module.exports = router;