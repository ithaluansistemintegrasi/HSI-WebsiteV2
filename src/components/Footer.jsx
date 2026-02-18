import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoHSI from "../assets/hsi-logo.png";
import { NAV_LINKS } from "../data/navLinks";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    const scrollWithOffset = () => {
      const el = document.getElementById(id);
      if (!el) return;

      const footerOffset = 0; // footer biasanya ga perlu offset
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - footerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (location.pathname === "/") {
      requestAnimationFrame(scrollWithOffset);
      return;
    }

    navigate(`/#${id}`);
    setTimeout(scrollWithOffset, 150);
  };

  const goToPage = (to) => navigate(to);

  const onNavClick = (l) => {
    if (l.type === "page") return goToPage(l.to);
    return goToSection(l.id);
  };

  return (
    <footer className="bg-[#5D9FC7] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img
              src={logoHSI}
              alt="HSI Logo"
              className="h-12 w-auto object-contain"
            />

            <div className="mt-4 text-sm leading-relaxed text-white/90 max-w-xs">
              <div className="font-semibold text-white text-lg">
                {t("footer.companyName")}
              </div>
              <div>{t("footer.address")}</div>
            </div>
          </div>

          <div className="md:justify-self-center">
            <div className="font-semibold text-sm mb-3">
              {t("footer.navTitle")}
            </div>

            <ul className="space-y-2 text-sm text-white/90">
              {NAV_LINKS.map((l) => (
                <li key={l.key}>
                  <button
                    type="button"
                    onClick={() => onNavClick(l)}
                    className="hover:opacity-80 transition"
                  >
                    {t(`nav.${l.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end w-full max-w-sm">
            <div className="rounded-md bg-white/15 p-5">
              <div className="font-semibold text-sm">
                {t("footer.contactTitle")}
              </div>

              <div className="mt-3 text-sm text-white/90 space-y-2">
                <div>
                  <span className="font-medium text-white">
                    {t("footer.whatsappLabel")}
                  </span>{" "}
                  {t("footer.whatsappValue")}
                </div>

                <div>
                  <span className="font-medium text-white">
                    {t("footer.emailLabel")}
                  </span>{" "}
                  {t("footer.emailValue")}
                </div>

                <div>
                  <span className="font-medium text-white">
                    {t("footer.hoursLabel")}
                  </span>{" "}
                  {t("footer.hoursValue")}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onNavClick({ type: "section", id: "contact", key: "contact" })
                }
                className="mt-5 inline-flex items-center justify-center w-full h-10 rounded-full bg-white text-[#5D9FC7] text-sm font-semibold hover:opacity-90 transition"
              >
                {t("footer.cta")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-white/90">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
