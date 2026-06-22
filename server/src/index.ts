import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authRoutes from "./routes/auth.route.ts";
import { connectMongoDB } from "./db/db.ts";
import { authMiddleware } from "./middlewares/auth.middleware.ts";
import UserModel from "./models/User.model.ts";


const app = express();

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

connectMongoDB(process.env.MONGO_DB_URL as string)
	.then(() => {
		console.log("Mongo DB connected");
	})
	.catch((err) => {
		console.log("MongoDB connection failed", err);
	});


app.get("/", (req, res) => {
	return res.json({ status: "success" });
});

app.use("/auth", authRoutes);

app.get("/user", authMiddleware, async (req:any, res:any) => {
	const user = await UserModel.findById(req.user.id)
	console.log(req.user)
	return res.json({status: "success", message: "user Logged in", user})
})

app.listen(PORT, () => console.log(`Server is listening on PORT:${PORT}`));
