const router = require("express").Router();
const {
    addReport,
    
} = require("../controllers/reportController");

//define user routes
router.post("/add", addReport);
module.exports = router;
