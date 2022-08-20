const router = require("express").Router();

const { login, logout } = require("../controllers/loginController");
const { verifyToken } = require("../verifyToken/verifyToken");

router.post("/", login);
router.post("/logout", verifyToken, logout);

module.exports = router;