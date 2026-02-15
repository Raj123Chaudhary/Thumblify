import express from "express";
import { generateThumbnail } from "../controllers/ThumbnailController.js";
import { authMiddleware } from "../middlewares/authMiddlerware.js";

export const thumbnailRouter = express.Router();

thumbnailRouter.post("/generateThumbnail", authMiddleware, generateThumbnail);
