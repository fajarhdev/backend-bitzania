const { DataTypes } = require("sequelize");
const Conn = require("../configs/DB");
const Status = require("./Status");
const User = require("./User");

const Clockin = Conn.define(
	"Clockin",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		statuses_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: false,
			references: {
				model: Status,
				key: "id",
			},
		},
		users_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: false,
			references: {
				model: User,
				key: "id",
			},
		},
	},
	{
		tableName: "clockin",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Clockin;
