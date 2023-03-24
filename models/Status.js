const { DataTypes } = require("sequelize");
const Conn = require("../configs/DB");

const Status = Conn.define(
	"Status",
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
	},
	{
		tableName: "statuses",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Status;
