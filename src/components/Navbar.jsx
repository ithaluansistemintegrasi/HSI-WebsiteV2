import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logoHSI from "../assets/hsi-logo.png";
import flagID from "../assets/id-flag.png";
import flagEN from "../assets/en-flag.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // mobile drawer
  const [menuOpen, setMenuOpen] = useState(false);

  // language dropdown (desktop & mobile)
  const [langOpen, setLangOpen] = useState(false);
  const langWrapRef = useRef(null);

  // normalize language: "id", "en"
  const lang = i18n.language?.startsWith("id") ? "id" : "en";
  const currentFlag = lang === "id" ? flagID : flagEN;

  const links = [
    { key: "home", id: "home" },
    { key: "about", id: "about" },
    { key: "products", id: "products" },
    { key: "services", id: "services" },
    { key: "preowned", id: "preowned" },
    { key: "contact", id: "contact" },
    { key: "news", to: "/news" },
    { key: "upevent", to: "/upevent" },
  ];

  // close lang dropdown when click outside
  useEffect(() => {
    const onDown = (e) => {
      if (!langWrapRef.current) return;
      if (!langWrapRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const choose = (nextLang) => {
    localStorage.setItem("lang", nextLang);
    i18n.changeLanguage(nextLang);
    setLangOpen(false);
  };

  const goToSection = (id) => {
    setMenuOpen(false);

    const scrollWithOffset = () => {
      const el = document.getElementById(id);
      if (!el) return;

      const headerOffset = window.innerWidth < 768 ? 64 : 80; // h-16 / h-20
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (location.pathname === "/") {
      // tunggu 1 frame biar layout stabil (terutama setelah close drawer)
      requestAnimationFrame(scrollWithOffset);
      return;
    }

    navigate(`/#${id}`);
    // tunggu route pindah + Home render
    setTimeout(scrollWithOffset, 150);
  };

  // ✅ Pergi ke page (News)
  const goToPage = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-[#5D9FC7]">
        <nav className="w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
            {/* LEFT: Logo */}
            <button
              className="h-16 md:h-20 flex items-center"
              type="button"
              onClick={() => goToSection("home")}
              aria-label={t("nav.aria.home")}
            >
              <img
                src={logoHSI}
                alt="HSI Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </button>

            {/* RIGHT: Desktop Menu + Flag */}
            <div className="hidden md:flex items-center gap-8 text-white text-sm font-sans">
              {links.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => (l.to ? goToPage(l.to) : goToSection(l.id))}
                  className="hover:opacity-80 transition-opacity"
                >
                  {t(`nav.${l.key}`)}
                </button>
              ))}

              {/* Flag dropdown (desktop) */}
              <div className="relative z-[60]" ref={langWrapRef}>
                <button
                  type="button"
                  onClick={() => setLangOpen((v) => !v)}
                  className="h-10 w-10 rounded-full overflow-hidden border border-white/40 shadow-sm hover:opacity-90 transition"
                  aria-haspopup="menu"
                  aria-expanded={langOpen}
                  aria-label={t("nav.aria.lang")}
                >
                  <img
                    src={currentFlag}
                    alt={lang === "id" ? "Indonesia" : "English"}
                    className="h-full w-full object-cover"
                  />
                </button>

                {langOpen && (
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
                      <span>{t("nav.lang.id")}</span>
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
                      <span>{t("nav.lang.en")}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: Hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/10 transition"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[80] md:hidden">
          {/* backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu backdrop"
            onClick={() => setMenuOpen(false)}
          />

          {/* drawer panel */}
          <aside className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl">
            <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img src={logoHSI} alt="HSI" className="h-10 w-auto" />
                <span className="font-semibold text-slate-900">Menu</span>
              </div>

              <button
                type="button"
                className="h-10 w-10 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 transition"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              {/* links */}
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <button
                    key={l.key}
                    type="button"
                    onClick={() => (l.to ? goToPage(l.to) : goToSection(l.id))}
                    className="text-left px-3 py-3 rounded-lg font-medium text-slate-800 hover:bg-slate-100 transition"
                  >
                    {t(`nav.${l.key}`)}
                  </button>
                ))}
              </div>

              {/* language switch inside drawer */}
              <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 bg-slate-50">
                  {t("nav.aria.lang")}
                </div>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-3 text-sm text-slate-800 hover:bg-slate-50"
                  onClick={() => choose("id")}
                >
                  <img
                    src={flagID}
                    alt="ID"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  <span>{t("nav.lang.id")}</span>
                  {lang === "id" && (
                    <span className="ml-auto text-xs font-semibold text-[#2E86C1]">
                      Active
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-3 text-sm text-slate-800 hover:bg-slate-50"
                  onClick={() => choose("en")}
                >
                  <img
                    src={flagEN}
                    alt="EN"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  <span>{t("nav.lang.en")}</span>
                  {lang === "en" && (
                    <span className="ml-auto text-xs font-semibold text-[#2E86C1]">
                      Active
                    </span>
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
