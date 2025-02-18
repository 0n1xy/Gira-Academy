import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

import { NextFunction, Request, Response } from "express";

const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
	console.log("checkToken", req.headers.authorization);
	const token = req.headers.authorization?.split(" ")[1];
	console.log("token", token);

	if (!token) {
		return res.status(401).json({
			message: "Unauthorized: Token not provided",
			status: "ERROR",
		});
	}

	jwt.verify(token, process.env.ACCESS_TOKEN!, function (err, user: any) {
		if (err) {
			return res.status(401).json({
				message: "The authentication failed",
				status: "ERROR",
			});
		}

		if (user.isAdmin === true) {
			next();
		} else {
			return res.status(403).json({
				message: "Access denied",
				status: "ERROR",
			});
		}
	});
};

export { authMiddleWare };
