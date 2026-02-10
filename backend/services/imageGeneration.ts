import { stabilityClient } from "../configs/stability.js";
import fs from 'fs'
import { uploadBase64ToCloudinary } from "./cloudinaryImageUpload.js";


export const generateImageFromPrompt = async (prompt: string) => {
  try {
   const response = await stabilityClient.post(
  "/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
  {
    text_prompts: [
      { text: prompt, weight: 10 },
      {
        text: "text, letters, words, logo, watermark, blurry, low quality, distorted face",
        weight: -1,
      },
    ],
    cfg_scale: 8,
    height: 1024,
    width: 1024,
    samples: 1,
    steps: 35,
  }
);

    const image = response.data.artifacts[0];
 if (!image?.base64) {
    throw new Error("Image generation failed");
  }
  //saving in local
  // const buffer = Buffer.from(image.base64, "base64");
  //   fs.writeFileSync("test.png", buffer);


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
