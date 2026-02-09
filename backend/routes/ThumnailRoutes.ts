import express from "express"
import { generateThumbnail } from "../controllers/ThumbnailController.js";

 export const thumbnailRouter = express.Router();

 thumbnailRouter.get("/generateThumbnail",generateThumbnail)