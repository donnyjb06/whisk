import express, { json, type Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const { PORT = 3001, DATABASE_CONNECTION_URI = "" } = process.env;

app.use(cors());
app.use(json());

(async () => mongoose.connect(DATABASE_CONNECTION_URI))();

app.listen(PORT, () => {
	console.log("Listening to the server");
});
