import { type Request, type Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import User from "../models/User.model.ts";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

export const googleLogin = async (
	req: Request,

	res: Response,
) => {
	try {
		const { token } = req.body;

		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: GOOGLE_CLIENT_ID,
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
				googleId: sub ?? null,
				email,
				name: name ?? null,
				avatar: picture ?? null,
			});
		}

		const accessToken = jwt.sign(
			{
				id: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET!,
			{
				expiresIn: "30d",
			},
		);

		res.json({
			accessToken,
			user,
		});
	} catch (error) {
		res.status(500).json({
			message: "Login failed",
		});
	}
};
