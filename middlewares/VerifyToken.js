const jwt = require("jsonwebtoken");
const VerifyToken = async (req, res, next) => {
	const secret = process.env.SECRET_KEY;
	// const secretDecoded = jose.base64url.decode(secret);

	const authHeader = req.headers["authorization"];
	const accessToken = authHeader && authHeader.split(" ")[1];

	if (accessToken === null) {
		return res.status(404);
	}

	try {
		var decoded = jwt.verify(accessToken, secret);
		if (decoded.users_id === undefined || decoded.users_id === null) {
			return res.status(404).json({ data: "Tidak ada akses ke page ini" });
		}

		req.users_id = decoded.users_id;
		next();
	} catch (error) {
		res.status(500).json({ data: "Tidak bisa di akses", error });
	}
};

module.exports = VerifyToken;
