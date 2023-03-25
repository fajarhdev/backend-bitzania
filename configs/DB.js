const { Sequelize } = require("sequelize");
require("dotenv").config();

// const Conn = new Sequelize("backend", "root", "", {
// 	host: "localhost",
// 	port: "3306",
// 	dialect: "mysql",
// });

const Conn = new Sequelize(process.env.DB_URL, {
	dialect: "mysql",
});
module.exports = Conn;
