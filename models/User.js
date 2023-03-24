const { DataTypes } = require("sequelize");
const Conn = require("../configs/DB");
const Status = require("./Status");

const User = Conn.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nis: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		classroom: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "users",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = User;
