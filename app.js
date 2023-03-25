var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var reportRouter = require("./routes/Report");
var usersRouter = require("./routes/users");
const Conn = require("./configs/DB");
require("dotenv").config;

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/report", reportRouter);
app.use("/users", usersRouter);

// try {
// 	Conn.authenticate();
// 	console.log("Connection has been established successfully.");
// } catch (error) {
// 	console.error("Unable to connect to the database:", error);
// }

module.exports = app;
