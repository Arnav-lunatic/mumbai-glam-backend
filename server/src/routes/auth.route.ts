import { Router } from "express";
import { googleLogin } from "../controllers/googleAuth.controller.ts";

const router = Router();

router.post(
	"/google",
	googleLogin,
);

export default router;
