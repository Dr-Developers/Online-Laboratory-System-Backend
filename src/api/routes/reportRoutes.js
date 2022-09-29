const router = require("express").Router();
const {
    addReport,
    getreports,
    getOneReport,
    deleteReport,
    updateReport,
} = require("../controllers/reportController");

const {
    verifyTokenAuthorization,
    verifyTokenAndLabAss,
} = require("../verifyToken/verifyToken");

//define user routes
router.post("/add",verifyTokenAndLabAss, addReport);
router.get("/", verifyTokenAndLabAss, getreports);
router.get("/:id", verifyTokenAuthorization, getOneReport);
router.delete("/delete/:id", verifyTokenAndLabAss, deleteReport);
router.put("/update/:id", verifyTokenAndLabAss, updateReport);

module.exports = router;