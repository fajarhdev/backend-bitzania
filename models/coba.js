const Conn = require("../configs/DB");
const { DataTypes } = require("sequelize");

const Coba = Conn.define(
	"Coba",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		clockin: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		clockout: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		statuses_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "coba",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Coba;
