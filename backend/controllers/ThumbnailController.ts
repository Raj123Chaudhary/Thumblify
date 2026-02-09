import { Request,Response } from "express";
import Thumbnail from "../models/thumbnail.js";
import { generateImageFromPrompt } from "../services/imageGeneration.js";

export const generateThumbnail = async (req:Request,res:Response) =>{
     try {
          // console.log("i am in Thumnail Controller")
          // const {userId} = req.session;
          // const {title,
          //      propt:user_prompt,
          //      style,
          //      aspect_ratio,
          //      color_scheme,
          //      text_overlay
          // }  =req.body;
          // const thumbnail = await Thumbnail.create({
          //      userId,
          //      title,
          //      prompt_used:user_prompt,
          //      user_prompt,
          //      aspect_ratio,
          //      style,
          //      color_scheme,
          //      text_overlay,
          //      isGenerating:true

          // })
          generateImageFromPrompt("Create a image aspect_ratio 16:9 for yourtube channel and title is Earn money 1000 daily graphics is bold ")
          
     } catch (error) {
          console.error("Not generate thumbnail",error);
          return res.status(500).json({
               message:"Something went wrong. Please try again"
          })
          
     }
}