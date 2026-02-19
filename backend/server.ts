import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import connectDB from "./configs/db.js";
import authRouter from "./routes/AuthRoutes.js";
import { thumbnailRouter } from "./routes/ThumnailRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";
await connectDB();

const app = express();
const port = process.env.PORT || 3000;
app.set("trust proxy", 1);

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4001",
      "https://thumblify-dun.vercel.app/",
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/thumbnail", thumbnailRouter);
app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live");
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
