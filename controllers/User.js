const Password = require("../models/Password");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Conn = require("../configs/DB");
const { QueryTypes } = require("sequelize");
var jwt = require("jsonwebtoken");
const Token = require("../models/Token");

const Login = async (req, res) => {
	const { nis, password } = req.body;
	// validation input
	if (
		(nis === null || nis === undefined || nis === "") &&
		(password === null || password === undefined || password === "")
	) {
		return res.status(400).json({ data: "Input salah" });
	}
	try {
		// check user
		const [getUser, _] = await Conn.query(
			"SELECT users.*, passwords.password FROM `users`JOIN passwords ON passwords.users_id = users.id where users.nis = " +
				nis,
			{
				type: QueryTypes.SELECT,
			}
		);
		// validate password
		const validPass = await bcrypt.compare(password, getUser.password);

		if ((getUser === null || getUser === undefined) && validPass === false) {
			return res.status(400).json({ data: "NIS tidak terdaftar atau password salah" });
		}

		const token = jwt.sign({ users_id: getUser.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
		const refreshToken = jwt.sign({ users_id: getUser.id }, process.env.REFRESH_SECRET_KEY, {
			expiresIn: "1d",
		});

		const insertToken = await Token.create({
			users_id: getUser.id,
			token: refreshToken,
		});

		return res.status(200).json({ data: token });
	} catch (error) {
		return res.status(500).json({ data: "Tidak dapat login", error });
	}
};

const Register = async (req, res) => {
	const { name, nis, classroom } = req.body;
	// validation input
	if (
		(nis === null || nis === undefined || nis === "") &&
		(name === null || name === undefined || name === "") &&
		(classroom === null || classroom === undefined || classroom === "")
	) {
		return res.status(400).json({ data: "Input salah" });
	}
	try {
		const createUser = await User.create({
			name: name,
			nis: nis,
			classroom: classroom,
		});

		return res.status(200).json({ data: "Register berhasil" });
	} catch (error) {
		return res.status(500).json({ data: "Gagal Register", error });
	}
};

module.exports = { Login, Register };
