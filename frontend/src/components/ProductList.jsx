import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
	const [products, setProducts] = useState([]);

	const navigate = useNavigate();
	useEffect(() => {
		getProductList();
	}, []);

	const getProductList = async () => {
		let result = await fetch("http://localhost:5000/products", {
			headers: {
				authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
			},
		});
		result = await result.json();
		setProducts(result);
	};
	// console.log(products);
	const deleteProduct = async (id) => {
		// console.log(id);
		let result = await fetch(`http://localhost:5000/product/${id}`, {
			method: "delete",
			headers: {
				authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
			},
		});
		result = await result.json();
		// console.log(result);
		if (result) {
			getProductList();
		}
	};
	const upadteProduct = (id) => {
		// console.log(id);
		navigate(`/update-product/${id}`);
	};
	const handleSearch = async (e) => {
		// console.log(e.target.value);
		const key = e.target.value;
		if (key) {
			let result = await fetch(`http://localhost:5000/search/${key}`, {
				headers: {
					authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
				},
			});
			result = await result.json();

			// console.log(result);
			setProducts(result);
		} else {
			getProductList();
		}
	};
	return (
		<div className="productList">
			<h1 style={{ marginLeft: "250px" }}>Product List</h1>
			<input
				type="text"
				placeholder="Enter the product name"
				className="search-box"
				onChange={handleSearch}
			/>
			<ul className="productList-ul">
				<li>S.No</li>
				<li>Name</li>
				<li>Price</li>
				<li>Category</li>
				<li>Brand</li>
				<li>Operations</li>
			</ul>
			{products.length > 0 ? (
				products.map((item, index) => {
					const { name, price, category, brand, _id } = item;
					return (
						<ul className="productList-ul" key={_id}>
							<li>{index + 1}</li>
							<li>{name}</li>
							<li>$ {price}</li>
							<li>{category}</li>
							<li>{brand}</li>
							<li>
								<button
									onClick={() => {
										deleteProduct(_id);
									}}
								>
									Delete
								</button>
								&nbsp;
								<button
									onClick={() => {
										upadteProduct(_id);
									}}
								>
									Update
								</button>
							</li>
						</ul>
					);
				})
			) : (
				<h1 style={{ textAlign: "center" }}>No Result Found</h1>
			)}
		</div>
	);
};
export default ProductList;
