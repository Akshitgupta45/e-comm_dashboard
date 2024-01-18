import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const auth = localStorage.getItem("user");
		if (auth) {
			navigate("/");
		}
	}, []);

	const handleLogin = async () => {
		console.log(email, password);
		let result = await fetch("http://localhost:5000/login", {
			method: "post",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-type": "application/json",
			},
		});
		result = await result.json();
		console.log(result);
		if (result.auth) {
			localStorage.setItem("user", JSON.stringify(result.user));
			localStorage.setItem("token", JSON.stringify(result.auth));
			navigate("/");
		} else {
			alert("Please type the correct ceredentials");
			// alert is not working
		}
	};
	return (
		<div className="login">
			<h1 style={{ marginLeft: "50px" }}>Login page</h1>
			<input
				className="inputBox"
				type="text"
				placeholder="Enter you email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				className="inputBox"
				type="password"
				placeholder="Enter you password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button className="appButton" onClick={handleLogin}>
				Login
			</button>
		</div>
	);
};
export default Login;
