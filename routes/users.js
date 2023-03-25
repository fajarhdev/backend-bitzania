var express = require("express");
const {
	AddClockin,
	UpdateClockin,
	DeleteClockin,
	AddClockout,
	UpdateClockout,
	DeleteClockout,
} = require("../controllers/Attendence");
const { Login, Register } = require("../controllers/User");
const VerifyToken = require("../middlewares/VerifyToken");
var router = express.Router();

/* GET users listing. */
router.post("/login", Login);
router.post("/clockin", VerifyToken, AddClockin);
router.put("/updateclockin", VerifyToken, UpdateClockin);
router.delete("/deleteclockin", VerifyToken, DeleteClockin);
router.post("/clockout", VerifyToken, AddClockout);
router.put("/updateclockout", VerifyToken, UpdateClockout);
router.delete("/deleteclockout", VerifyToken, DeleteClockout);

module.exports = router;
