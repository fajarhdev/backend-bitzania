var express = require("express");
const { Report, ReportFilter } = require("../controllers/Report");
const VerifyToken = require("../middlewares/VerifyToken");
var router = express.Router();

router.get("/data", VerifyToken, Report);
router.get("/filterdata", VerifyToken, ReportFilter);

module.exports = router;
