
import jwt from "jsonwebtoken";
import { ENV } from "@/config";

export const signJWT = (payload: any) => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.NODE_ENV == 'production' ? '1h' : '7d',
  });
}

export const decodeJWT = async (token: string) => {
  if (!token) {
    return undefined;
  }

  return jwt.decode(token);
}

export const verifyJWT = async (token: string) => {
  if(!token) return undefined;

  try {
    await jwt.verify(token, ENV.JWT_SECRET);
    return true;
  } catch (err) {
    return undefined;
  }
}
