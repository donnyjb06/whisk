import express from "express";

const app = express();
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
	console.log("Listening to the server");
});
