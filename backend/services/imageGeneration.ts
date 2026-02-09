import { stabilityClient } from "../configs/stability.js";
import fs from 'fs'
import cloudinary from "../configs/cloudinary.js";
import { uploadBase64ToCloudinary } from "./cloudinaryImageUpload.js";

export const generateImageFromPrompt = async (prompt: string) => {
  try {
    const response = await stabilityClient.post(
      "/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        text_prompts: [
          {
            text: prompt,
            weight: 1,
          },
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      }
    );

    const image = response.data.artifacts[0];
 if (!image?.base64) {
    throw new Error("Image generation failed");
  }

  // Upload to Cloudinary
  const uploaded = await uploadBase64ToCloudinary(image.base64);

  return uploaded; // { url, public_id }
  
  } catch (error: any) {
    console.error(
      "Stability AI error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
