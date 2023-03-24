const { DataTypes } = require("sequelize");
const Conn = require("../configs/DB");
const User = require("./User");

const Password = Conn.define(
	"Password",
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
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "passwords",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Password;
