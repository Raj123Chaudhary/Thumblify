import { Request,Response } from "express";
import Thumbnail from "../models/thumbnail.js";
import { generateImageFromPrompt } from "../services/imageGeneration.js";

const stylePrompts = {
  "Bold & Graphic": "eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition",
  "Tech/Futuristic": "futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects",
  "Minimalist": "minimalist thumbnail, clean layout, simple shapes, limited color palette",
  "Photorealistic": "photorealistic thumbnail, ultra-realistic lighting, natural skin tones, DSLR-style photography",
  "Illustrated": "illustrated thumbnail, custom digital illustration, stylized characters, bold outlines"
} as const;

export const color_scheme_description = {
  vibrant:
    "vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette that grabs attention",

  sunset:
    "warm sunset tones with orange, pink, red, and golden hues, soft gradients, emotional and dramatic lighting",

  forest:
    "natural forest colors with deep greens, earthy browns, muted tones, calm and organic feeling",

  neon:
    "neon glowing colors with bright cyan, magenta, electric blue, and high contrast on dark backgrounds",

  purple:
    "rich purple shades mixed with violet and magenta, luxurious, creative, and modern color mood",

  monochrome:
    "black and white or single-color tones, minimal contrast, clean, elegant, and professional look",

  ocean:
    "cool ocean colors with blue, teal, aqua, and turquoise tones, fresh, calm, and modern atmosphere",

  pastel:
    "soft pastel colors with light pinks, blues, lavenders, and gentle tones, clean and friendly appearance",
};

export const generateThumbnail = async (req:Request,res:Response) =>{
     try {
          // console.log("i am in Thumnail Controller")
          const {userId} = req.session;
          if(!userId){
               return res.status(401).json({message:"UserId is not present"})
          }
          const {title,
               prompt:user_prompt,
               style,
               aspect_ratio,
               color_scheme,
               text_overlay
          }  =req.body;
          const thumbnail = await Thumbnail.create({
               userId,
               title,
               prompt_used:user_prompt,
               user_prompt,
               aspect_ratio,
               style,
               color_scheme,
               text_overlay,
               isGenerating:true

          })
          let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for ${title}`
         
          if(color_scheme){
               prompt += `Use a ${color_scheme_description[color_scheme as keyof typeof color_scheme_description]} color scheme`
          }
           
          if(user_prompt){
               prompt += `Additional Details :${user_prompt}`
          }
          prompt += `The thumbnail should be ${aspect_ratio} , visually stunning and designed to maximize click-throgh rate , make it bold , professional , and impossible to ignore `


         const image = await generateImageFromPrompt(prompt);
         thumbnail.isGenerating = false;
     //     console.log(image)
         thumbnail.image_url=image.url;
         await thumbnail.save()
         return res.status(200).json({
          messsge:"thumbnail successfully Created and saved",
          data:thumbnail
         })


          
     } catch (error) {
          console.error("Not generate thumbnail",error);
          return res.status(500).json({
               message:"Something went wrong. Please try again"
          })
          
     }
}