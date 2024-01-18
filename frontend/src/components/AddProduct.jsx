import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [brand, setBrand] = useState("");
	const [error, setError] = useState(false);

	const navigate = useNavigate();
	const handleAddProduct = async () => {
		if (!name || !price || !category || !brand) {
			setError(true);
			return false;
		}

		// console.log(name, category, price, brand);

		const userId = JSON.parse(localStorage.getItem("user"))._id;
		let result = await fetch("http://localhost:5000/add-product", {
			method: "post",
			body: JSON.stringify({ name, price, userId, category, brand }),
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
			},
		});
		result = await result.json();
		console.log(result);
		navigate("/");
	};
	return (
		<div className="addProduct">
			<h1 style={{ marginLeft: "50px" }}>Add Product here</h1>
			<input
				type="text"
				placeholder="Enter product name"
				className="inputBox"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			{error && !name && (
				<span className="invalid-input">Enter valid name</span>
			)}
			<input
				type="text"
				placeholder="Enter product price"
				className="inputBox"
				value={price}
				onChange={(e) => {
					setPrice(e.target.value);
				}}
			/>
			{error && !price && (
				<span className="invalid-input">Enter valid price</span>
			)}
			<input
				type="text"
				placeholder="Enter product category"
				className="inputBox"
				value={category}
				onChange={(e) => {
					setCategory(e.target.value);
				}}
			/>
			{error && !category && (
				<span className="invalid-input">Enter valid category</span>
			)}
			<input
				type="text"
				placeholder="Enter product company"
				className="inputBox"
				value={brand}
				onChange={(e) => {
					setBrand(e.target.value);
				}}
			/>
			{error && !brand && (
				<span className="invalid-input">Enter valid brand</span>
			)}
			<button type="button" className="appButton" onClick={handleAddProduct}>
				Add Product
			</button>
		</div>
	);
};
export default AddProduct;
