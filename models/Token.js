const { DataTypes } = require("sequelize");
const Conn = require("../configs/DB");
const User = require("./User");

const Token = Conn.define(
	"Token",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		users_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		Token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "tokens",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Token;
