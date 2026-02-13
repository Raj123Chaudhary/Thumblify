import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import SoftBackdrop from "../components/SoftBackdrop";
import axios from "axios";

import AspectRatioSelector from "../components/AspectRatioSelector";
import {
  colorSchemes,
  dummyThumbnails,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { apiConnector } from "../configs/apiConnector";

const Generate = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(
    colorSchemes[0].id,
  );
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  const handleGenerate = async () => {
    if (!isLoggedIn) {
      return toast.error("Please login to generate thumbnail");
    }
    if (!title.trim()) return toast.error("title is required");
    setLoading(true);
    const api_payload = {
      title,
      user_prompt: additionalDetails,
      style,
      aspect_ratio: aspectRatio,
      color_scheme: colorSchemeId,
      text_overlay: true,
    };
    // console.log("1. i am in handle generate function ");
    // console.log(api_payload);
    try {
      const { data } = await apiConnector(
        "POST",
        "/api/thumbnail/generateThumbnail",
        api_payload,
      );
      // const { data } = await axios.post(
      //   "http://localhost:4001/api/thumbnail/generateThumbnail",
      //   api_payload,
      // );
      // console.log("data in generate:", data);
      if (data.thumbnail) {
        navigate("/generate/" + data.thumbnail.userId);
        toast.success(data.message);
      }
    } catch (error: any) {
      console.log("Error in generating thumbnail :", error.message);
    }
  };
  const fetchThumbnail = async () => {
    try {
      const { data } = await apiConnector("GET", `/api/user/thumbnails/${id}`);

      const thumb = data?.thumbnails; // ✅ correct key

      setThumbnail(thumb);
      setTitle(thumb?.title ?? "");
      setAdditionalDetails(thumb?.user_prompt ?? "");
      setColorSchemeId(thumb?.color_scheme);
      setAspectRatio(thumb?.aspect_ratio);
      setStyle(thumb?.style);

      // loading should depend ONLY on image_url
      setLoading(!thumb?.image_url);
    } catch (error: any) {
      console.log("Not fetch thumbnail:", error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumbnail();
    }
    if (id && loading && isLoggedIn) {
      const interval = setInterval(() => {
        fetchThumbnail();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [id, loading, isLoggedIn]);
  useEffect(() => {
    if (!id && thumbnail) setThumbnail(null);
  }, [pathname]);

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 py-8 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Left panel */}
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <h2 className="text-xl font-bold">Create Your Thumnail</h2>
                <p>Describe your vision and let AI bring it to life</p>
              </div>
              <div className="space-y-5">
                {/* title input */}
                <div className="space-y-2">
                  <label htmlFor="">Title</label>
                  <input
                    placeholder="eg. 100 character"
                    className="w-full px-4 py-3   rounded-lg  bg-black/40 text-zinc-100 placeholder:text-zinc-400 border border-white "
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    maxLength={100}
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-zinc-400">
                      {title.length}/100
                    </span>
                  </div>
                </div>
                {/* AspectRatioSelector */}
                <AspectRatioSelector
                  value={aspectRatio}
                  onChange={setAspectRatio}
                />
                {/* StyleSelector */}
                <StyleSelector
                  value={style}
                  onChange={setStyle}
                  isOpen={styleDropdownOpen}
                  setIsOpen={setStyleDropdownOpen}
                />
                {/* ColorSchemeSelector */}
                <ColorSchemeSelector
                  value={colorSchemeId}
                  onChange={setColorSchemeId}
                />
                {/* Details */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor="">
                    Additional Prompts{" "}
                    <span className="text-zinc-400 text-xs"> (optional)</span>
                  </label>
                  <textarea
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    rows={3}
                    placeholder="Add any specific elements , mood , or style preferences..."
                    className="w-full px-4 py-3 rounded-lg border border-white/10 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  />
                </div>
              </div>
              {/* button */}
              {!id && (
                <button
                  onClick={handleGenerate}
                  className="text-[15px] w-full py-3.5 roundedxl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:bg-pink-700 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Generating...;" : "Generate Thumnail"}
                </button>
              )}
            </div>
            {/* Right Panel */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h1 className="text-lg font-semibold text-zinc-100 mb-4">
                  Preview
                </h1>
                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default Generate;
