import cloudinary from "../configs/cloudinary.js";

export const uploadBase64ToCloudinary = async (
  base64: string,
  folder = "thumblify"
) => {
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${base64}`,
    {
      folder,
      resource_type: "image",
    }
  );
  console.log(result.secure_url)

  return {

    url: result.secure_url,
    public_id: result.public_id,
  };
};
