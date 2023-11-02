import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const create_Token = (data: { id: string; role: string }) =>
  jwt.sign(data, process.env.token_key || "", {
    expiresIn: "100y",
  });
export const verify_token = (token: string): jwt.JwtPayload | any =>
  jwt.verify(token, process.env.token_key || "");
