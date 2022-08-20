const router = require("express").Router();

const {
    registerLabAss,
    getLabAss,
    getOneLabAss,
    deleteLabAss,
    updateLabAss,
} = require("../controllers/labAssController");

const { verifyTokenAndLabAss } = require("../verifyToken/verifyToken");

// defining routes
router.post("/register", verifyTokenAndLabAss, registerLabAss);
router.get("/", verifyTokenAndLabAss, getLabAss);
router.get("/:id", verifyTokenAndLabAss, getOneLabAss);
router.delete("/delete/:id", verifyTokenAndLabAss, deleteLabAss);
router.put("/update/:id", verifyTokenAndLabAss, updateLabAss);

module.exports = router;