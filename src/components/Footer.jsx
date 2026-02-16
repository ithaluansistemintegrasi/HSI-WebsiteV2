import { useTranslation } from "react-i18next";
import logoHSI from "../assets/hsi-logo.png";

const navLinks = [
  { key: "home", id: "home" },
  { key: "about", id: "about" },
  { key: "products", id: "products" },
  { key: "services", id: "services" },
  { key: "preowned", id: "preowned" },
  { key: "contact", id: "contact" },
];

export default function Footer() {
  const { t } = useTranslation();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#5D9FC7] text-white">
      {/* TOP */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT: logo + address */}
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

          {/* MIDDLE: navigation */}
          <div className="md:justify-self-center">
            <div className="font-semibold text-sm mb-3">
              {t("footer.navTitle")}
            </div>

            <ul className="space-y-2 text-sm text-white/90">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(l.id)}
                    className="hover:opacity-80 transition"
                  >
                    {t(`nav.${l.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: contact card */}
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
                onClick={() => scrollTo("contact")}
                className="mt-5 inline-flex items-center justify-center w-full h-10 rounded-full bg-white text-[#5D9FC7] text-sm font-semibold hover:opacity-90 transition"
              >
                {t("footer.cta")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-white/90">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
