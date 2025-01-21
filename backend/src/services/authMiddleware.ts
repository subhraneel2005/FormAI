import { JWT_PASSWORD } from "./auth/auth";
import jwt from "jsonwebtoken";

export const authMiddleware = (req:any, res:any, next:any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    try {
      const decoded = jwt.verify(token, JWT_PASSWORD);
      req.userId = (decoded as jwt.JwtPayload).userId;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };