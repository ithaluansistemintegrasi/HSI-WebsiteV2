import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logoHSI from "../assets/hsi-logo.png";
import flagID from "../assets/id-flag.png";
import flagEN from "../assets/en-flag.png";

const linksID = [
  { label: "Beranda", id: "home" },
  { label: "Tentang Kami", id: "about" },
  { label: "Produk Kami", id: "products" },
  { label: "Layanan", id: "services" },
  { label: "Pre-Owned", id: "preowned" },
  { label: "Kontak", id: "contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // dropdown language
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("id");
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const currentFlag = selected === "id" ? flagID : flagEN;

  const choose = (lang) => {
    setSelected(lang);
    setOpen(false);
  };

  const goToSection = (id) => {
    setOpen(false);

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/#${id}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#5D9FC7]">
      <nav className="h-20 w-full">
        <div className="mx-auto h-full max-w-7xl px-6 flex items-center justify-between">
          {/* LEFT: Logo */}
          <button
            className="h-20 flex items-center"
            type="button"
            onClick={() => goToSection("home")}
            aria-label="Kembali ke Beranda"
          >
            <img
              src={logoHSI}
              alt="HSI Logo"
              className="h-16 w-auto object-contain"
            />
          </button>

          {/* RIGHT: Menu + Flag */}
          <div className="hidden md:flex items-center gap-8 text-white text-sm font-sans">
            {linksID.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => goToSection(l.id)}
                className="hover:opacity-80 transition-opacity"
              >
                {l.label}
              </button>
            ))}

            {/* Flag dropdown */}
            <div className="relative z-[60]" ref={wrapRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="h-10 w-10 rounded-full overflow-hidden border border-white/40 shadow-sm hover:opacity-90 transition"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Pilih bahasa"
              >
                <img
                  src={currentFlag}
                  alt="Language"
                  className="h-full w-full object-cover"
                />
              </button>

              {open && (
                <div
                  className="absolute right-0 mt-3 z-[70] w-44 rounded-xl bg-white shadow-lg border border-black/5 overflow-hidden"
                  role="menu"
                >
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                    onClick={() => choose("id")}
                    role="menuitem"
                  >
                    <img
                      src={flagID}
                      alt="ID"
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span>Indonesia</span>
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                    onClick={() => choose("en")}
                    role="menuitem"
                  >
                    <img
                      src={flagEN}
                      alt="EN"
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span>English</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile placeholder */}
          <div className="md:hidden text-white text-sm">Menu</div>
        </div>
      </nav>
    </header>
  );
}
