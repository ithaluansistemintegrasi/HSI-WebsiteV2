import logoHSI from "../assets/hsi-logo.png";

const navLinks = [
  { label: "Beranda", id: "home" },
  { label: "Tentang Kami", id: "about" },
  { label: "Produk Kami", id: "products" },
  { label: "Layanan", id: "services" },
  { label: "Pre-Owned", id: "preowned" },
  { label: "Kontak", id: "contact" },
];

export default function Footer() {
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
              <div className="font-semibold text-white">
                PT Haluan Sistem Integrasi
              </div>
              <div>
                Cluster Golden Vienna 1 Blok B1 No. 2, Jl. Merpati Kencana, Rawa
                Buntu, Serpong, Tangerang Selatan, Banten 15318
              </div>
            </div>
          </div>

          {/* MIDDLE: navigation */}
          <div className="md:justify-self-center">
            <div className="font-semibold text-sm mb-3">Navigasi</div>
            <ul className="space-y-2 text-xs text-white/90">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(l.id)}
                    className="hover:opacity-80 transition"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: "red area" content */}
          <div className="md:justify-self-end w-full max-w-sm">
            {/* Ini konten yang "merah" — aku buat versi finalnya (bukan merah), tapi kalau mau persis gambar bisa kasih bg pink */}
            <div className="rounded-md bg-white/15 p-5">
              <div className="font-semibold text-sm">Kontak Cepat</div>

              <div className="mt-3 text-xs text-white/90 space-y-2">
                <div>
                  <span className="font-medium text-white">WhatsApp:</span>{" "}
                  +62 895-0805-4752
                </div>
                <div>
                  <span className="font-medium text-white">Email:</span>{" "}
                  info@haluansistemintegrasi.com
                </div>
                <div>
                  <span className="font-medium text-white">Jam Operasional:</span>{" "}
                  Senin–Jumat 09.00–17.00
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="mt-5 inline-flex items-center justify-center w-full h-10 rounded-full bg-white text-[#5D9FC7] text-sm font-semibold hover:opacity-90 transition"
              >
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-white/90">
          © 2025 PT Haluan Sistem Integrasi. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
