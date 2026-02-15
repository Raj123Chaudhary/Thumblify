import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddlerware.js";
const authRouter = express.Router();

authRouter.post("/registor", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/verify", authMiddleware, verifyUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
