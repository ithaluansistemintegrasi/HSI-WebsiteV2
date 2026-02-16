import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Footer from "./components/Footer";
import MesinProses from "./sections/MesinProses";
import MesinPengemas from "./sections/MesinPengemasan";
import MesinSparePart from "./sections/MesinSparePart";

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

function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Kalau ada hash, biarkan ScrollToHash yang handle
    if (hash) return;

    // Pindah halaman normal (tanpa hash) -> balik ke atas
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTopOnRoute />
      <ScrollToHash />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mesin-proses" element={<MesinProses />} />
          <Route path="/mesin-pengemas" element={<MesinPengemas />} />
          <Route path="/mesin-sparepart" element={<MesinSparePart />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
