const express = require("express");
const Jwt = require("jsonwebtoken");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const PORT = 5000;
const jwtKey = "e-dashboard";
const app = express();

app.use(express.json());
app.use(cors());
// app.use("/baisc route",main route file)
app.post("/signup", async (req, res) => {
	let user = new User(req.body);
	let result = await user.save();
	result = result.toObject();
	delete result.password;
	Jwt.sign({ user }, jwtKey, { expiresIn: "24h" }, (err, token) => {
		if (err) {
			res.send("Something went wrong while generating token");
		} else {
			res.send({ result, auth: token });
		}
	});
});

app.post("/login", async (req, res) => {
	if (req.body.password && req.body.email) {
		let user = await User.findOne(req.body).select("-password");
		if (user) {
			Jwt.sign({ user }, jwtKey, { expiresIn: "24h" }, (err, token) => {
				if (err) {
					res.send("Something went wrong while generating token");
				} else {
					res.send({ user, auth: token });
				}
			});
		} else {
			res.status(400).send("No Such user found");
		}
	} else {
		res.send("please enter email and password both");
	}
});

app.post("/add-product", verifyToken, async (req, res) => {
	let product = new Product(req.body);
	let result = await product.save();
	res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
	let products = await Product.find();

	if (products.length > 0) {
		res.send(products);
	} else {
		res.send({ result: "No product found" });
	}
});

app.delete("/product/:id", verifyToken, async (req, res) => {
	let result = await Product.deleteOne({ _id: req.params.id });
	res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
	let result = await Product.findOne({ _id: req.params.id });
	if (result) {
		res.send(result);
	} else {
		res.send("No such user found");
	}
});

app.put("/product/:id", verifyToken, async (req, res) => {
	let result = await Product.updateOne(
		{ _id: req.params.id },
		{
			$set: req.body,
		}
	);
	res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
	const queryObject = {
		$or: [
			{ name: { $regex: req.params.key } },
			{ category: { $regex: req.params.key } },
			{ brand: { $regex: req.params.key } },
		],
	};
	let result = await Product.find(queryObject);
	res.send(result);
});

function verifyToken(req, res, next) {
	let token = req.headers["authorization"];
	if (token) {
		token = token.split(" ")[1];
		Jwt.verify(token, jwtKey, (err, valid) => {
			if (err) {
				res.status(401).send({ result: "Please provide a valid token" });
			} else {
				next();
			}
		});
		// console.log("middleware called", token);
	} else {
		res.status(403).send({ result: "Please provide a token with header" });
	}
}

app.listen(PORT, () => {
	console.log("server is running on port", PORT);
});
