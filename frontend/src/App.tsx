import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";

import YtPreview from "./pages/YtPreview";
import Login from "./components/login";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));
const Generate = lazy(() => import("./pages/Generate"));
const MyGeneration = lazy(() => import("./pages/MyGeneration"));
import About from "./pages/About";
import ContactUs from "./pages/Contact";

export default function App() {
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-zinc-400">
          Loading page...
        </div>
      }
    >
      <>
        <Toaster />
        <LenisScroll />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/generate/:id" element={<Generate />} />

          <Route path="/preview" element={<YtPreview />}></Route>
          <Route path="/my-generation" element={<MyGeneration />}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
        </Routes>
        <Footer />
      </>
    </Suspense>
  );
}
