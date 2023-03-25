const Attendence = require("../models/Attendence");
const Clockin = require("../models/Clockin");
const Clockout = require("../models/Clockout");
const Status = require("../models/Status");
const User = require("../models/User");
const Conn = require("../configs/DB");
const Password = require("../models/Password");
const Token = require("../models/Token");

const Sync = () => {
	User.sync();
	Status.sync();
	Clockin.sync();
	Clockout.sync();
	Attendence.sync();
	Password.sync();
	Token.sync();
};

const Assoc = () => {
	// user
	User.hasMany(Clockin, {
		foreignKey: "users_id",
	});
	Clockin.belongsTo(User, {
		foreignKey: "users_id",
	});
	User.hasMany(Clockout, {
		foreignKey: "users_id",
	});
	Clockout.belongsTo(User, {
		foreignKey: "users_id",
	});

	User.hasMany(Password, {
		foreignKey: "users_id",
	});
	Password.belongsTo(User, {
		foreignKey: "users_id",
	});
	User.hasMany(Token, {
		foreignKey: "users_id",
	});
	Token.belongsTo(User, {
		foreignKey: "users_id",
	});

	// status
	Status.hasMany(Clockin, {
		foreignKey: "statuses_id",
	});
	Clockin.belongsTo(Status, {
		foreignKey: "statuses_id",
	});
	Status.hasMany(Clockout, {
		foreignKey: "statuses_id",
	});
	Clockout.belongsTo(User, {
		foreignKey: "statuses_id",
	});
};

try {
	Conn.authenticate();
	console.log("Connection has been established successfully.");
	Sync();
	Assoc();
} catch (error) {
	console.error("Unable to connect to the database:", error);
}
