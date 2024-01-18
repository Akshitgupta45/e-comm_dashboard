import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const auth = localStorage.getItem("user");
		if (auth) {
			navigate("/");
		}
	});

	const handleSubmit = async () => {
		console.log(name, email, password);
		let result = await fetch("http://localhost:5000/signup", {
			method: "post",
			body: JSON.stringify({ name, email, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		result = await result.json();
		console.log(result);
		if (result.auth) {
			localStorage.setItem("user", JSON.stringify(result.result));
			localStorage.setItem("token", JSON.stringify(result.auth));
			navigate("/");
		} else {
			alert("something went wrong");
		}
	};
	return (
		<div className="signup">
			<h1 style={{ margin: "50px" }}>Regsiter</h1>
			<input
				className="inputBox"
				type="text"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
				placeholder="Enter your name"
			/>
			<input
				className="inputBox"
				type="text"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				placeholder="Enter your email"
			/>
			<input
				className="inputBox"
				type="password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				placeholder="Enter your password"
			/>
			<button className="appButton" onClick={handleSubmit} type="button">
				Submit
			</button>
		</div>
	);
};
export default SignUp;
