import { useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);
      // 🔗 later connect backend API here
      toast.success("Message sent successfully! We’ll contact you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SoftBackdrop />
      <div className="pt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* LEFT INFO */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-zinc-100">Contact Us</h1>
            <p className="text-zinc-400">
              Have questions about{" "}
              <span className="text-pink-500">Thumblify</span>? Need support or
              want to give feedback? We’d love to hear from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/8 border border-white/10">
                <MailIcon className="text-pink-500" />
                <span className="text-zinc-300">support@thumblify.ai</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/8 border border-white/10">
                <PhoneIcon className="text-pink-500" />
                <span className="text-zinc-300">+91 9XXXXXXXXX</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/8 border border-white/10">
                <MapPinIcon className="text-pink-500" />
                <span className="text-zinc-300">India</span>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 border border-white/10">
              <h3 className="font-semibold text-zinc-100">Why contact us?</h3>
              <ul className="mt-2 text-sm text-zinc-400 space-y-1">
                <li>• Thumbnail generation issues</li>
                <li>• Feature requests</li>
                <li>• Account & billing support</li>
                <li>• Feedback & suggestions</li>
              </ul>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-white/8 border border-white/10 shadow-xl space-y-5"
          >
            <div>
              <label className="text-sm text-zinc-300">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-zinc-100"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-zinc-100"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-zinc-100"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">Message *</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-zinc-100 resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-medium disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
