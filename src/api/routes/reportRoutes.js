const router = require("express").Router();
const {
    addReport,
    getreports,
	getOneReport,
	deleteReport,
	updateReport,

    
} = require("../controllers/reportController");

//define user routes
router.post("/add", addReport);
router.get("/", getreports);
router.get("/:id", getOneReport);
router.delete("/delete/:id", deleteReport);
router.put("/update/:id", updateReport);

module.exports = router;
