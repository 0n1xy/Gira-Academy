import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

interface UserPayload {
	id: string;
	isAdmin: boolean;
}

const generateAccessToken = async (payload: UserPayload): Promise<string> => {
	return jwt.sign({ ...payload }, process.env.ACCESS_TOKEN!, {
		expiresIn: "30s",
	});
};

const generateRefreshToken = async (payload: UserPayload): Promise<string> => {
	return jwt.sign({ ...payload }, process.env.REFRESH_TOKEN!, {
		expiresIn: "365d",
	});
};


export { generateAccessToken, generateRefreshToken };
