import express from "express";
import {
  getUserAllThumbnail,
  getUserThumbnail,
} from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddlerware.js";

const userRouter = express.Router();

userRouter.get("/thumbnails/:id", authMiddleware, getUserThumbnail);
userRouter.get("/allThumbnail", authMiddleware, getUserAllThumbnail);
export default userRouter;
