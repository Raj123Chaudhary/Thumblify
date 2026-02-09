import express from 'express'
import { loginUser, logoutUser, registerUser, verifyUser } from '../controllers/AuthController.js';
import { protect } from '../middlewares/auth.js';
const authRouter = express.Router();

authRouter.post("/registor",registerUser);
authRouter.post("/login",loginUser);
authRouter.get("/verify",protect,verifyUser);
authRouter.post("/logout",logoutUser);

export default authRouter;