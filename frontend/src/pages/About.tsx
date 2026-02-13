import SoftBackdrop from "../components/SoftBackdrop";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <SoftBackdrop />
      <div className="pt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold text-zinc-100">
            About AI Thumbnail Generator
          </h1>

          <p className="text-zinc-400 text-lg">
            Create stunning, high-quality thumbnails using AI in seconds. Choose
            styles, colors, and aspect ratios tailored for YouTube, Shorts, and
            social media.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            <div className="p-4 rounded-xl bg-white/8 border border-white/10">
              🎨 Multiple Styles
            </div>
            <div className="p-4 rounded-xl bg-white/8 border border-white/10">
              📐 Perfect Aspect Ratios
            </div>
            <div className="p-4 rounded-xl bg-white/8 border border-white/10">
              ⚡ Fast AI Generation
            </div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="mt-10 px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
