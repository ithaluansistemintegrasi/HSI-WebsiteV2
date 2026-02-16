import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import heroBg from "../assets/hero-section/hero-image1.jpg";
import aboutImg from "../assets/about-section/about-image1.jpg";
import product1 from "../assets/product-section/produk-1.jpg";
import product2 from "../assets/product-section/produk-2.jpg";
import product3 from "../assets/product-section/produk-3.jpg";
import servicesImg from "../assets/services-section/services.jpg";
import preownedImg from "../assets/preowned-section/preowned.jpg";

const P_TEXT = "text-sm md:text-base leading-relaxed";

const INITIAL_FORM = { name: "", email: "", phone: "", message: "" };
const INITIAL_TOUCHED = {
  name: false,
  email: false,
  phone: false,
  message: false,
};

function useInView({ threshold = 0.2, root = null, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, root, rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, root, rootMargin]);

  return [ref, isInView];
}

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function revealClass(isInView, from = "up") {
  const base = "transition-all duration-700 ease-out will-change-transform";
  const hidden =
    from === "up"
      ? "opacity-0 translate-y-8"
      : from === "down"
        ? "opacity-0 -translate-y-8"
        : from === "left"
          ? "opacity-0 -translate-x-10"
          : "opacity-0 translate-x-10"; // right

  const shown = "opacity-100 translate-x-0 translate-y-0";
  return `${base} ${isInView ? shown : hidden}`;
}

function delayStyle(ms = 0) {
  return ms ? { transitionDelay: `${ms}ms` } : undefined;
}

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

function getFormErrors(form) {
  const name = form.name.trim().length > 0;
  const email = EMAIL_RE.test(form.email.trim());
  const phone = form.phone.trim().length >= 8;
  const message = form.message.trim().length > 0;

  return {
    name: !name,
    email: !email,
    phone: !phone,
    message: !message,
  };
}

export default function Home() {
  const { t } = useTranslation();

  const [aboutRef, aboutInView] = useInView({ threshold: 0.25 });
  const [productsRef, productsInView] = useInView({ threshold: 0.2 });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.2 });
  const [preownedRef, preownedInView] = useInView({ threshold: 0.2 });
  const [contactRef, contactInView] = useInView({ threshold: 0.2 });
  const [mapRef, mapInView] = useInView({ threshold: 0.2 });

  const PRODUCTS = [
    {
      image: product1,
      title: t("home.products.items.process"),
      to: "/mesin-proses",
    },
    {
      image: product2,
      title: t("home.products.items.packaging"),
      to: "/mesin-pengemas",
    },
    {
      image: product3,
      title: t("home.products.items.sparepart"),
      to: "/mesin-sparepart",
    },
  ];

  const FORM_FIELDS = [
    {
      key: "name",
      label: t("home.contact.form.name.label"),
      type: "text",
      placeholder: t("home.contact.form.name.placeholder"),
      error: t("home.contact.form.name.error"),
    },
    {
      key: "email",
      label: t("home.contact.form.email.label"),
      type: "email",
      placeholder: t("home.contact.form.email.placeholder"),
      error: t("home.contact.form.email.error"),
    },
    {
      key: "phone",
      label: t("home.contact.form.phone.label"),
      type: "tel",
      inputMode: "numeric",
      placeholder: t("home.contact.form.phone.placeholder"),
      error: t("home.contact.form.phone.error"),
    },
    {
      key: "message",
      label: t("home.contact.form.message.label"),
      type: "textarea",
      rows: 6,
      placeholder: t("home.contact.form.message.placeholder"),
      error: t("home.contact.form.message.error"),
    },
  ];

  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);

  const errors = getFormErrors(form);
  const isValid = Object.values(errors).every((v) => !v);

  const setField = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? onlyDigits(value) : value,
    }));
  };

  const markTouched = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const markAllTouched = () => {
    setTouched((prev) =>
      Object.fromEntries(Object.keys(prev).map((k) => [k, true])),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    markAllTouched();
    if (!isValid) return;

    alert(t("home.contact.alertValidated"));
    setForm(INITIAL_FORM);
    setTouched(INITIAL_TOUCHED);
  };

  return (
    <div className="w-full">
      {/* HERO */}
      <div
        id="home"
        className="relative w-full h-[520px] md:h-[560px] overflow-hidden"
      >
        <img
          src={heroBg}
          alt={t("home.hero.imageAlt")}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#5D9FC7]/55" />

        <div className="relative h-full mx-auto max-w-7xl px-6">
          <div className="h-full flex items-center justify-end">
            <div className="text-right max-w-xl">
              <h1 className="text-white font-sans font-bold leading-tight text-4xl md:text-5xl animate-slide-in-right">
                {t("home.hero.title")}
              </h1>
              <h2 className="mt-4 text-white/90 text-sm md:text-base animate-slide-in-right animate-delay-150">
                {t("home.hero.subtitle")}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="bg-white" ref={aboutRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-[59.5px] lg:pr-12">
              <h2
                className={`text-4xl font-medium text-gray-900 ${revealClass(
                  aboutInView,
                  "left",
                )}`}
                style={delayStyle(0)}
              >
                {t("home.about.title")}
              </h2>

              <p
                className={`mt-8 text-gray-700 ${P_TEXT} max-w-xl ${revealClass(
                  aboutInView,
                  "left",
                )}`}
                style={delayStyle(150)}
              >
                {t("home.about.desc")}
              </p>

              <br />

              <div
                className={`${revealClass(aboutInView, "left")} text-right`}
                style={delayStyle(300)}
              >
                <Link
                  to="/tentang-kami"
                  className="inline-flex items-center gap-2 text-[#4D6CFF] hover:opacity-70 transition"
                >
                  {t("home.about.more")} <span aria-hidden>›</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px]">
            <img
              src={aboutImg}
              alt={t("home.about.imageAlt")}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="bg-[#8FC3DC]" ref={productsRef}>
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-20">
          <h2
            className={`text-center text-white text-2xl md:text-3xl font-medium ${revealClass(
              productsInView,
              "up",
            )}`}
            style={delayStyle(0)}
          >
            {t("home.products.title")}
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
            {PRODUCTS.map((p, idx) => (
              <div
                key={p.title}
                className={revealClass(productsInView, "up")}
                style={delayStyle(150 + idx * 120)}
              >
                <ProductCard image={p.image} title={p.title} to={p.to} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white" ref={servicesRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-[59.5px] lg:pr-12">
              <h2
                className={`text-3xl md:text-4xl font-medium text-gray-900 ${revealClass(
                  servicesInView,
                  "left",
                )}`}
                style={delayStyle(0)}
              >
                {t("home.services.title")}
              </h2>

              <div className="mt-10 space-y-8">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={revealClass(servicesInView, "left")}
                    style={delayStyle(150 + i * 120)}
                  >
                    <ServiceItem
                      text={
                        i === 0
                          ? t("home.services.items.0")
                          : t(`home.services.items.${i}`)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px] bg-white">
            <img
              src={servicesImg}
              alt={t("home.services.imageAlt")}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* PRE-OWNED */}
      <section id="preowned" className="w-full" ref={preownedRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px] bg-[#F7F1C8]">
            <img
              src={preownedImg}
              alt={t("home.preowned.imageAlt")}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="bg-[#8FC3DC] text-white">
            <div className="h-full flex items-center">
              <div className="w-full px-6 py-16 md:py-24 lg:px-14">
                <h2
                  className={`text-2xl md:text-3xl font-medium text-right ${revealClass(
                    preownedInView,
                    "right",
                  )}`}
                  style={delayStyle(0)}
                >
                  {t("home.preowned.title")}
                </h2>

                <p
                  className={`mt-6 text-white/90 ${P_TEXT} max-w-md ml-auto text-right whitespace-pre-line ${revealClass(
                    preownedInView,
                    "right",
                  )}`}
                  style={delayStyle(150)}
                >
                  {t("home.preowned.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white" ref={contactRef}>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <h2
            className={`text-3xl md:text-4xl font-medium text-gray-900 ${revealClass(
              contactInView,
              "left",
            )}`}
            style={delayStyle(0)}
          >
            {t("home.contact.title")}
          </h2>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT: Form */}
            <div
              className={revealClass(contactInView, "left")}
              style={delayStyle(150)}
            >
              <form className="max-w-md" onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-[80px_1fr] gap-x-6 gap-y-4 items-start">
                  {FORM_FIELDS.map((field) => (
                    <FormRow
                      key={field.key}
                      field={field}
                      value={form[field.key]}
                      touched={touched[field.key]}
                      hasError={errors[field.key]}
                      onChange={setField}
                      onBlur={markTouched}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`mt-8 w-full h-10 rounded-full text-white text-sm md:text-base font-medium transition ${
                    isValid
                      ? "bg-[#7AD35A] hover:opacity-90"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {t("home.contact.submit")}
                </button>
              </form>
            </div>

            {/* RIGHT: Map */}
            <div
              className={revealClass(mapInView, "up")}
              style={delayStyle(150)}
              ref={mapRef}
            >
              <div className="w-full overflow-hidden rounded">
                <div className="w-full h-[220px] md:h-[250px]">
                  <iframe
                    title={t("home.contact.mapTitle")}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.7724335336384!2d106.68124135316758!3d-6.319180118869774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbd030c7bac9%3A0x6748b9ff6e7e85c8!2sPT%20Haluan%20Sistem%20Integrasi!5e0!3m2!1sen!2sid!4v1770879185692!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="bg-[#8FC3DC] text-white p-4 text-xs md:text-sm leading-relaxed">
                  <div className="font-semibold">
                    {t("home.contact.cardTitle")}
                  </div>
                  <div>{t("home.contact.cardAddress")}</div>
                  <div className="mt-2">{t("home.contact.cardPhone")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormRow({ field, value, touched, hasError, onChange, onBlur }) {
  const base =
    "w-full rounded border px-3 text-sm md:text-base outline-none focus:border-blue-400";
  const border = touched && hasError ? "border-red-400" : "border-gray-300";
  const inputClass =
    field.type === "textarea"
      ? `${base} py-2 ${border}`
      : `h-9 ${base} ${border}`;

  return (
    <>
      <label className="text-sm md:text-base text-gray-700 pt-2">
        {field.label}
      </label>

      <div>
        {field.type === "textarea" ? (
          <textarea
            name={field.key}
            rows={field.rows ?? 6}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.key, e.target.value)}
            onBlur={() => onBlur(field.key)}
            className={inputClass}
          />
        ) : (
          <input
            name={field.key}
            type={field.type}
            inputMode={field.inputMode}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.key, e.target.value)}
            onBlur={() => onBlur(field.key)}
            className={inputClass}
          />
        )}

        {touched && hasError && (
          <p className="mt-1 text-xs text-red-500">{field.error}</p>
        )}
      </div>
    </>
  );
}

function ProductCard({ image, title, to }) {
  const card = (
    <div className="group w-[280px] md:w-[320px] rounded-xl bg-white shadow-sm overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="p-5 transition-colors duration-200 group-hover:bg-[#bedef3]">
        <div className="w-full h-[200px] md:h-[240px] rounded-lg overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition duration-200 group-hover:scale-[1.02]"
          />
        </div>
        <p className="mt-5 text-center text-[#2E86C1] text-base font-medium transition-colors duration-200 group-hover:text-white">
          {title}
        </p>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {card}
      </Link>
    );
  }

  return card;
}

function ServiceItem({ text }) {
  return (
    <div className="flex items-start gap-6">
      <div className="h-16 w-16 rounded-full bg-gray-300 shrink-0" />
      <p className={`text-gray-700 ${P_TEXT} max-w-xl whitespace-pre-line`}>
        {text}
      </p>
    </div>
  );
}
