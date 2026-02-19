import User from "../models/user.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// const isProduction = process.env.NODE_ENV === "production";

// Controller for User Sign up
const JWT_SECRET = process.env.JWT_SECRET as string;
export const registerUser = async (req: Request, res: Response) => {
  console.log("Enter in registerUser controller");
  try {
    const { name, email, password } = req.body;
    // all field are available or not
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fieds are required",
      });
    }

    //Check email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }
    //check passord format
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }
    //  find user by email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      {
        _id: newUser?._id,
        name: newUser?.name,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );
    console.log("token:", token);

    const cookiesOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV ? ("none" as const) : ("lax" as const),

      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };

    //setting user data in session

    return res
      .cookie("token", token, cookiesOptions as any)
      .status(201)
      .json({
        message: "Account Successfully created",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
  } catch (error: any) {
    console.error("Error while creating account", error.message);
    res.status(500).json({
      message: "Something went wrong , Please try again",
    });
  }
};

// Controller for User Login

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //  1. All fields are available or not
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2.find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // 3. checking the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // setting user data in session

    const token = jwt.sign(
      {
        _id: user?._id,
        name: user?.name,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    const cookiesOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV ? ("none" as const) : ("lax" as const),
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    // return res
    return res
      .cookie("token", token, cookiesOptions as any)
      .status(200)
      .json({
        message: "Login Successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token,
        },
      });
  } catch (error: any) {
    console.error("Login Error", error.message);
    res.status(500).json({
      message: "Something went wrong , Please try again",
    });
  }
};

// Controller for User logout

// Controller for User logout
export const logoutUser = async (req: Request, res: Response) => {
  console.log("i am in logout controller");

  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        // sameSite: isProduction ? ("none" as const) : ("lax" as const),
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV ? ("none" as const) : ("lax" as const),
        path: "/",
        expires: new Date(0),
      })
      .status(200)
      .json({
        message: "Logout successful",
      });
  } catch (error) {
    console.error("Logout Error : ", error);
    return res.status(500).json({
      message: "Something went wrong, Please try again",
    });
  }
};

// Controller for User Verify

export const verifyUser = async (req: Request, res: Response) => {
  console.log("i am in verify user controller");
  try {
    // const { userId } = req.session;
    const userId = (req as any).user._id;
    const user = await User.findById(userId);
    console.log("user in verifyUser controller : ", user);
    if (!user) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }
    console.log("User : ", user);
    return res.status(200).json({ message: "Verify User", user: user });
  } catch (error) {
    console.error("User Verify Error: ", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
};
