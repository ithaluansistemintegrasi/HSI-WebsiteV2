// src/sections/TentangKami.jsx
import { Link } from "react-router-dom";

const P_TEXT = "text-sm md:text-base leading-relaxed text-slate-600";
const H2 = "text-2xl md:text-3xl font-bold text-slate-900";
const CARD =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition";

export default function TentangKami() {
  return (
    <section className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* HERO */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#4D6CFF]">Tentang Kami</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Solusi Industri yang Praktis, Rapi, dan Siap Dipakai.
            </h1>
            <p className={`mt-4 ${P_TEXT}`}>
              Kami membantu kebutuhan mesin & layanan pendukung industri dengan
              pendekatan yang jelas: pahami kebutuhan, rekomendasikan solusi
              yang tepat, lalu dampingi sampai implementasi berjalan.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#4D6CFF] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Konsultasi Sekarang
              </Link>
              <Link
                to="/#product"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Lihat Produk
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Fokus</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Kebutuhan industri
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Layanan</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Konsultasi → Implementasi
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Prinsip</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Cepat, transparan, rapi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PROFIL */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${CARD} lg:col-span-2`}>
            <h2 className={H2}>Siapa Kami</h2>
            <p className={`mt-3 ${P_TEXT}`}>
              Kami adalah tim yang berfokus pada pengadaan mesin, perencanaan
              kebutuhan, serta dukungan layanan purna jual. Kami percaya solusi
              yang baik itu bukan yang paling mahal, tapi yang paling sesuai
              dengan target produksi, kualitas, dan kapasitas bisnis kamu.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Misi</p>
                <p className={`mt-2 ${P_TEXT}`}>
                  Memudahkan perusahaan menemukan solusi mesin dan sistem kerja
                  yang efektif, aman, dan terukur.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Visi</p>
                <p className={`mt-2 ${P_TEXT}`}>
                  Menjadi partner industri yang dipercaya untuk pengembangan
                  kapasitas produksi dan efisiensi operasional.
                </p>
              </div>
            </div>
          </div>

          <div className={CARD}>
            <h3 className="text-lg font-bold text-slate-900">
              Yang Kamu Dapat
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Rekomendasi mesin sesuai kebutuhan",
                "Estimasi & opsi budget yang jelas",
                "Dukungan instalasi & training (opsional)",
                "After-sales support & sparepart (opsional)",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#4D6CFF]/10 text-[#4D6CFF] text-xs font-bold">
                    ✓
                  </span>
                  <p className="text-sm text-slate-700">{t}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs text-slate-500">Catatan</p>
              <p className="mt-1 text-sm text-slate-700">
                Konten ini bisa kamu sesuaikan dengan profil perusahaan (tahun
                berdiri, sertifikasi, partner, dsb).
              </p>
            </div>
          </div>
        </div>

        {/* NILAI */}
        <div className="mt-12">
          <h2 className={H2}>Nilai Kerja Kami</h2>
          <p className={`mt-3 max-w-3xl ${P_TEXT}`}>
            Biar proyeknya enak dijalankan, kami pakai prinsip kerja yang sama
            untuk setiap klien.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Transparan",
                desc: "Spesifikasi, estimasi biaya, dan timeline dijelaskan di awal.",
              },
              {
                title: "Responsif",
                desc: "Komunikasi cepat dan update progres yang jelas.",
              },
              {
                title: "Rapi",
                desc: "Dokumentasi kebutuhan, keputusan, dan perubahan tercatat.",
              },
            ].map((v) => (
              <div key={v.title} className={CARD}>
                <p className="text-sm font-semibold text-slate-900">
                  {v.title}
                </p>
                <p className={`mt-2 ${P_TEXT}`}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ALUR KERJA */}
        <div className="mt-12">
          <h2 className={H2}>Alur Kerja</h2>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "Pahami kebutuhan & target.",
              },
              {
                step: "02",
                title: "Proposal",
                desc: "Opsi mesin + estimasi biaya.",
              },
              {
                step: "03",
                title: "Implementasi",
                desc: "Pengadaan & instalasi.",
              },
              {
                step: "04",
                title: "Support",
                desc: "After-sales & perawatan.",
              },
            ].map((s) => (
              <div key={s.step} className={CARD}>
                <p className="text-xs font-bold text-[#4D6CFF]">{s.step}</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {s.title}
                </p>
                <p className={`mt-2 ${P_TEXT}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-900 p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Punya kebutuhan mesin atau pengembangan produksi?
              </h3>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-slate-200">
                Ceritakan kebutuhanmu. Kami bantu mapping solusi dan langkah
                paling masuk akal.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:opacity-90 transition"
              >
                Hubungi Kami
              </Link>
              <Link
                to="/#news"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/0 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Lihat Update / News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
