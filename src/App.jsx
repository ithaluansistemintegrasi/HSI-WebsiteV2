import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Footer from "./components/Footer";
import MesinProses from "./sections/MesinProses";
import MesinPengemas from "./sections/MesinPengemasan";
import News from "./sections/News";
import NewsDetail from "./sections/NewsDetail";
import TentangKami from "./sections/TentangKami";
import Upevent from "./sections/Upevent";
import Sparepart from "./sections/Sparepart";

function ScrollToSection() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // hanya handle scroll section kalau sedang di Home "/"
    if (pathname !== "/") return;

    const params = new URLSearchParams(search);
    const id = params.get("section");
    if (!id) return;

    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const headerOffset = window.innerWidth < 768 ? 64 : 80;
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: y, behavior: "smooth" });

      // OPTIONAL: rapihin URL setelah scroll, hilangkan ?section=...
      window.history.replaceState({}, "", "/");
    }, 120);

    return () => clearTimeout(t);
  }, [pathname, search]);

  return null;
}

function ScrollToTopOnRoute() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // kalau ada ?section=..., biarkan ScrollToSection yang handle
    const params = new URLSearchParams(search);
    if (params.get("section")) return;

    // pindah halaman normal -> scroll ke atas
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTopOnRoute />
      <ScrollToSection />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mesin-proses" element={<MesinProses />} />
          <Route path="/mesin-pengemas" element={<MesinPengemas />} />
          <Route path="/sparepart" element={<Sparepart />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/upevent" element={<Upevent />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
