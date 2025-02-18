import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from "@/constant/JWT_Constant";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

interface UserPayload {
  id: string;
  isAdmin: boolean;
}

const generateAccessToken = async (payload: UserPayload): Promise<string> => {
  return jwt.sign({ ...payload }, process.env.ACCESS_TOKEN!, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
};

const generateRefreshToken = async (payload: UserPayload): Promise<string> => {
  return jwt.sign({ ...payload }, process.env.REFRESH_TOKEN!, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
};

export { generateAccessToken, generateRefreshToken };
