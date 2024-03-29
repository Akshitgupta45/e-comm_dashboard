const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: String,
	price: String,
	userId: String,
	category: String,
	brand: String,
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
