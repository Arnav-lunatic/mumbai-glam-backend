import { type Request, type Response } from "express";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User.model.ts";
import { generateToken } from "../utils/jwt.ts";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response) => {
	try {
		const { token } = req.body;

		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID as string,
		});

		const payload = ticket.getPayload();

		if (!payload) {
			return res.status(400).json({
				message: "Invalid token",
			});
		}

		const { sub, email, name, picture } = payload;

		if (!email) {
			return res
				.status(400)
				.json({ message: "Email not available in token payload" });
		}

		let user = await User.findOne({ email });

		if (!user) {
			user = await User.create({
				googleId: sub,
				email,
				name: name,
				avatar: picture ?? null,
			});
		}

		const accessToken = generateToken({
			id: user._id.toString(),
			email: user.email!,
		});

		res.status(200)
			.cookie("token", accessToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			.json({ success: true });
	} catch (error) {
		res.status(500).json({
			message: "Login failed",
		});
	}
};
