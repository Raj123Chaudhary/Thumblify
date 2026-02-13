import express from "express";
import {
  getUserAllThumbnail,
  getUserThumbnail,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/thumbnails/:id", getUserThumbnail);
userRouter.get("/allThumbnail", getUserAllThumbnail);
export default userRouter;
