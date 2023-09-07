import { User } from "../src/user/entity";
import * as jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    expiresIn: "1h",
  });

  return accessToken;
};

export const verifyToken = (accessToken: string) => {
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  });

  return decoded;
};
