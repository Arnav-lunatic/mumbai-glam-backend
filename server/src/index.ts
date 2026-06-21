import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.ts";
import { connectMongoDB } from "./db/index.ts";

const app = express();

const PORT = process.env.PORT;

connectMongoDB(process.env.MONGO_DB_URL as string)
	.then(() => {
		console.log("Mongo DB connected");
	})
	.catch((err) => {
		console.log("MongoDB connection failed", err);
	});

app.use(express.json());

app.get("/", (req, res) => {
	return res.json({ status: "success" });
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is listening on PORT:${PORT}`));
