import { Request, Response, NextFunction } from "express";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("you are in protect routed");
  const { isLoggedIn, userId } = req.session;
  if (!isLoggedIn || !userId) {
    console.log("you are not logged in");
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  next();
};
