import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import connectDB from "./configs/db.js";
import session from "express-session";
import authRouter from "./routes/AuthRoutes.js";
import { thumbnailRouter } from "./routes/ThumnailRoutes.js";
import userRouter from "./routes/UserRoutes.js";
await connectDB();
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: string;
  }
}
app.use(
  cors({
    origin: ["http://localhost:5173", "https://thumblify-bay.vercel.app"],
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 24 * 7 }, //7 days
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL as string,
      collectionName: "session",
    }),
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
