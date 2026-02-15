import jwt, { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

/* ---------- Extend Express Request ---------- */
interface AuthRequest extends Request {
  user?: string | JwtPayload;
}
const JWT_SECRET = process.env.JWT_SECRET as string;
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token as string | undefined;
    if (!token) {
      return res.status(401).json({
        message: "Token is not provided",
        success: false,
      });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = decoded;
      next();
    } catch (error) {
      console.error("Error in validating the token:", error);
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
