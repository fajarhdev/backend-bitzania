const { DataTypes } = require("sequelize");
const Conn = require("../configs/DB");
const Clockin = require("./Clockin");
const Clockout = require("./Clockout");
const Status = require("./Status");
const User = require("./User");

const Attendence = Conn.define(
	"Attendence",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		users_id: {
			type: DataTypes.INTEGER,
			unique: false,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		clockin_id: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false,
			references: {
				model: Clockin,
				key: "id",
			},
		},
		clockout_id: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false,
			references: {
				model: Clockout,
				key: "id",
			},
		},
		statuses_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			unique: false,
			references: {
				model: Status,
				key: "id",
			},
		},
	},
	{
		tableName: "attendences",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Attendence;
