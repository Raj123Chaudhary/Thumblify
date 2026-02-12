import express from "express";
import { getUserThumbnail } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/thumnails/:id", getUserThumbnail);

export default userRouter;
