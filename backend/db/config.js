const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/e-dashboard");

const connectDb = async () => {
	await mongoose.connect(
		"mongodb+srv://Akshitgupta45:u2SsJR2BkJYfq1TB@cluster1.uefrzzr.mongodb.net/e-comm-dasboard"
	);
};
connectDb()
	.then(() => {
		console.log("MongoDb connected Successfuly");
	})
	.catch(() => {
		console.log("Error while connecting to MongoDb");
	});
