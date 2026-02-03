import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Generate from "./pages/Generate";
import MyGeneration from "./pages/MyGeneration";
import YtPreview from "./pages/YtPreview";
import Login from "./components/login";

export default function App() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<Generate />}></Route>
                <Route path="/preview" element={<YtPreview />}></Route>
                <Route path="/my-generation" element={<MyGeneration />}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
            <Footer />
        </>
    );
}