import { Request, Response } from "express";
import Thumbnail from "../models/thumbnail.js";

export const getUserThumbnail = async (req: Request, res: Response) => {
  try {
    console.log("i am in get user thumbnail controller");
    const { id } = req.params;
    const thumbnails = await Thumbnail.findOne({ userId: id }).sort({
      createdAt: -1,
    }); //newest first
    return res.status(200).json({
      message: "Successfully fetch User thumbnails",
      thumbnails,
    });
  } catch (error: any) {
    console.log("Error in finding User thumbnail:", error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserAllThumbnail = async (req: Request, res: Response) => {
  try {
    console.log("i am in getUserAlll thumbnail ");
    const userId = (req as any).user._id;
    console.log("userId", userId);
    const thumbnails = await Thumbnail.find({ userId }).sort({
      createdAt: -1,
    }); //newest first
    return res.status(200).json({
      message: "Successfully fetch User thumbnails",
      thumbnails,
    });
  } catch (error: any) {
    console.log("Error in finding User All thumbnail:", error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
