import mongoose from "mongoose";

export async function connectMongoDB(url:string) {
	return mongoose.connect(url);
}
