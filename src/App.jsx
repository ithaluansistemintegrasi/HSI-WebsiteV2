import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Footer from "./components/Footer";
import MesinProses from "./sections/MesinProses";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(t);
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollToHash />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mesin-proses" element={<MesinProses />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
