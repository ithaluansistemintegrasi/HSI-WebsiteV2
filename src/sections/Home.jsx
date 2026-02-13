import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import heroBg from "../assets/hero-section/hero-image1.jpg";
import aboutImg from "../assets/about-section/about-image1.jpg";
import product1 from "../assets/product-section/produk-1.jpg";
import product2 from "../assets/product-section/produk-2.jpg";
import product3 from "../assets/product-section/produk-3.jpg";
import servicesImg from "../assets/services-section/services.jpg";
import preownedImg from "../assets/preowned-section/preowned.jpg";

const P_TEXT = "text-sm md:text-base leading-relaxed";

function useInViewOnce(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // fallback kalau IntersectionObserver tidak tersedia
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, isInView];
}

export default function Home() {
  const [aboutRef, aboutInView] = useInViewOnce({ threshold: 0.25 });

  // ====== INITIAL STATE (buat reset) ======
  const initialForm = { name: "", email: "", phone: "", message: "" };
  const initialTouched = {
    name: false,
    email: false,
    phone: false,
    message: false,
  };

  // CONTACT FORM VALIDATION
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(initialTouched);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((prev) => ({ ...prev, phone: value.replace(/\D/g, "") }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const nameOk = form.name.trim().length > 0;
  const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
  const phoneOk = form.phone.trim().length >= 8;
  const messageOk = form.message.trim().length > 0;

  const isValid = nameOk && emailOk && phoneOk && messageOk;

  const onSubmit = (e) => {
    e.preventDefault();

    // paksa semua field dianggap sudah disentuh biar error muncul
    setTouched({ name: true, email: true, phone: true, message: true });
    if (!isValid) return;

    alert("Pesan berhasil divalidasi! (belum dikirim ke server)");

    // ====== RESET FORM KE KOSONG ======
    setForm(initialForm);
    setTouched(initialTouched);
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
          alt="HSI Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#5D9FC7]/55" />

        <div className="relative h-full mx-auto max-w-7xl px-6">
          <div className="h-full flex items-center justify-end">
            <div className="text-right max-w-xl">
              <h1 className="text-white font-sans font-bold leading-tight text-4xl md:text-5xl animate-slide-in-right">
                Teknologi Pengolahan Terdepan
              </h1>
              <h2 className="mt-4 text-white/90 text-sm md:text-base animate-slide-in-right animate-delay-150">
                PT Haluan Sistem Integrasi
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
                className={`text-4xl font-medium text-gray-900 ${
                  aboutInView ? "animate-slide-in-left" : "opacity-0"
                }`}
              >
                Tentang Kami
              </h2>

              <p
                className={`mt-8 text-gray-700 ${P_TEXT} max-w-xl ${
                  aboutInView
                    ? "animate-slide-in-left animate-delay-150"
                    : "opacity-0"
                }`}
              >
                PT Haluan Sistem Integrasi telah berkecimpung di industri
                pengolahan sejak tahun 2007. Meski masih muda, perusahaan kami
                telah berhasil membangun jaringan bisnis luas meliputi
                Indonesia, Singapura, Thailand, Malaysia, dan Filipina di
                sepanjang Asia Tenggara. Kami berdedikasi untuk menyediakan,
                memasang, dan merawat berbagai peralatan serta perlengkapan
                berkualitas tinggi buatan dari pabrik ahli dan terkenal di
                kalangan industri pengolahan.
              </p>

              <div
                className={`mt-10 ${
                  aboutInView
                    ? "animate-slide-in-left animate-delay-300"
                    : "opacity-0"
                }`}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[#4D6CFF] hover:opacity-70 transition"
                >
                  Lihat Lebih Lanjut <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px]">
            <img
              src={aboutImg}
              alt="Tentang Kami"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="bg-[#8FC3DC]">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-20">
          <h2 className="text-center text-white text-2xl md:text-3xl font-medium">
            Produk Kami
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
            <ProductCard
              image={product1}
              title="Mesin Proses"
              to="/mesin-proses"
            />
            <ProductCard image={product2} title="Mesin Pengemas" />
            <ProductCard image={product3} title="Spare Part" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-[59.5px] lg:pr-12">
              <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
                Layanan yang Kami Tawarkan
              </h2>

              <div className="mt-10 space-y-8">
                <ServiceItem
                  text={`Tim teknisi berkualifikasi kami secara rutin mendapat pelatihan di pabrik manufaktur mesin kami. Mereka siap untuk mendukung pelanggan kami dengan:
- Installasi, start-up, commissioning untuk mesin baru.
- Pemecahan masalah dalam maupun setelah masa garansi, dan servis perawatan.
- Pelatihan penggunaan produk dan aplikasinya bagi operator pelanggan.`}
                />
                <ServiceItem text="Lorem ipsum dolor sit amet consectetur. Iaculis arcu viverra bibendum hendrerit ultrices consequat mi. Ante purus porta id quam quis." />
                <ServiceItem text="Lorem ipsum dolor sit amet consectetur. Iaculis arcu viverra bibendum hendrerit ultrices consequat mi. Ante purus porta id quam quis." />
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px] bg-white">
            <img
              src={servicesImg}
              alt="Layanan"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* PRE-OWNED */}
      <section id="preowned" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px] bg-[#F7F1C8]">
            <img
              src={preownedImg}
              alt="Pre-owned"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="bg-[#8FC3DC] text-white">
            <div className="h-full flex items-center">
              <div className="w-full px-6 py-16 md:py-24 lg:px-14">
                <h2 className="text-2xl md:text-3xl font-medium text-right">
                  Pre-owned
                </h2>

                <p
                  className={`mt-6 text-white/90 ${P_TEXT} max-w-md ml-auto text-right whitespace-pre-line`}
                >
                  {`Mesin proses industri merupakan salah satu investasi yang perlu dipertimbangkan dengan baik sebelum membuat keputusan. Terutama bagi industri yang berniat memulai usaha atau jenis mesin-mesin proses menjadi salah satu investasi yang paling penting. Pertimbangan mendasar perlu dilakukan sebelum mengalokasikan dana, terutama bagi Perusahaan yang berniat memulai usaha industri.

PT HALUAN SISTEM INTEGRASI menghadirkan sebuah solusi bagi Anda yang ingin budget hemat namun tidak ingin kompromi soal kualitas produksi. Kami menawarkan Anda mesin PRE-OWNED.

Kenapa harus beli di HSI?
Mesin yang kami tawarkan, dapat dipertanggung jawabkan keasliannya dengan menyertakan sertifikat.
Pre-owned Machine yang terawat dengan kualitas yang sangat bagus merupakan alternatif yang bisa anda pilih karena tidak menyerap banyak waktu dan biaya.

- Mesin Berkualitas & bersertifikat
- Pengiriman yang CEPAT
- Harga yang EKONOMIS`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
            Kontak Kami
          </h2>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT: Form */}
            <form className="max-w-md" onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-[80px_1fr] gap-x-6 gap-y-4 items-start">
                <label className="text-sm md:text-base text-gray-700 pt-2">
                  Nama
                </label>
                <div>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`h-9 w-full rounded border px-3 text-sm md:text-base outline-none focus:border-blue-400 ${
                      touched.name && !nameOk
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  {touched.name && !nameOk && (
                    <p className="mt-1 text-xs text-red-500">
                      Nama wajib diisi.
                    </p>
                  )}
                </div>

                <label className="text-sm md:text-base text-gray-700 pt-2">
                  Email
                </label>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`h-9 w-full rounded border px-3 text-sm md:text-base outline-none focus:border-blue-400 ${
                      touched.email && !emailOk
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  {touched.email && !emailOk && (
                    <p className="mt-1 text-xs text-red-500">
                      Email tidak valid.
                    </p>
                  )}
                </div>

                <label className="text-sm md:text-base text-gray-700 pt-2">
                  Telepon
                </label>
                <div>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`h-9 w-full rounded border px-3 text-sm md:text-base outline-none focus:border-blue-400 ${
                      touched.phone && !phoneOk
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  {touched.phone && !phoneOk && (
                    <p className="mt-1 text-xs text-red-500">
                      Telepon wajib diisi (min. 8 angka).
                    </p>
                  )}
                </div>

                <label className="text-sm md:text-base text-gray-700 pt-2">
                  Pesan
                </label>
                <div>
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full rounded border px-3 py-2 text-sm md:text-base outline-none focus:border-blue-400 ${
                      touched.message && !messageOk
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  {touched.message && !messageOk && (
                    <p className="mt-1 text-xs text-red-500">
                      Pesan wajib diisi.
                    </p>
                  )}
                </div>
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
                Kirim
              </button>
            </form>

            {/* RIGHT: Map + Info */}
            <div className="w-full">
              <div className="w-full overflow-hidden rounded">
                <div className="w-full h-[220px] md:h-[250px]">
                  <iframe
                    title="PT Haluan Sistem Integrasi"
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
                    PT HALUAN SISTEM INTEGRASI
                  </div>
                  <div>
                    Cluster Golden Vienna 1 Blok B1 No. 2, Jl. Merpati Kencana,
                    Rawa Buntu, Serpong, Tangerang Selatan, Banten 15318
                  </div>
                  <div className="mt-2">+62 895-0805-4752</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
