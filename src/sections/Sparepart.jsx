import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CATEGORIES = [
  "Spare Part Mesin Proses",
  "Spare Part Mesin Pengemas",
  "Consumable & Maintenance",
];

const PRODUCTS_BY_CATEGORY = {
  "Spare Part Mesin Proses": [
    {
      id: "sp-rotor",
      title: "Rotor Assembly",
      desc: "Komponen rotor untuk memastikan putaran stabil dan performa optimal.",
      image: "https://via.placeholder.com/800x600.png?text=Rotor+Assembly",
      price: 1250000,
    },
    {
      id: "sp-belt",
      title: "Timing Belt",
      desc: "Belt transmisi untuk sinkronisasi gerak dan efisiensi tenaga.",
      image: "https://via.placeholder.com/800x600.png?text=Timing+Belt",
      price: 350000,
    },
    {
      id: "sp-bearing",
      title: "Bearing Set",
      desc: "Set bearing untuk mengurangi gesekan dan menjaga kestabilan putaran.",
      image: "https://via.placeholder.com/800x600.png?text=Bearing+Set",
      price: 450000,
    },
  ],

  "Spare Part Mesin Pengemas": [
    {
      id: "sp-nozzle",
      title: "Filling Nozzle",
      desc: "Nozzle pengisian untuk akurasi volume dan aliran yang stabil.",
      image: "https://via.placeholder.com/800x600.png?text=Filling+Nozzle",
      price: 900000,
    },
    {
      id: "sp-sensor",
      title: "Photoelectric Sensor",
      desc: "Sensor untuk deteksi produk/label agar proses otomatis lebih presisi.",
      image:
        "https://via.placeholder.com/800x600.png?text=Photoelectric+Sensor",
      price: 650000,
    },
    {
      id: "sp-heater",
      title: "Sealing Heater",
      desc: "Elemen pemanas untuk sealing yang rapi dan konsisten.",
      image: "https://via.placeholder.com/800x600.png?text=Sealing+Heater",
      price: 780000,
    },
  ],

  "Consumable & Maintenance": [
    {
      id: "sp-lubricant",
      title: "Food Grade Lubricant",
      desc: "Pelumas food grade untuk perawatan rutin dan umur pakai mesin.",
      image:
        "https://via.placeholder.com/800x600.png?text=Food+Grade+Lubricant",
      price: 220000,
    },
    {
      id: "sp-o-ring",
      title: "O-Ring Kit",
      desc: "Kit o-ring berbagai ukuran untuk sealing dan pencegahan kebocoran.",
      image: "https://via.placeholder.com/800x600.png?text=O-Ring+Kit",
      price: 180000,
    },
    {
      id: "sp-filter",
      title: "Air Filter",
      desc: "Filter udara untuk menjaga kebersihan sistem pneumatik/kompresor.",
      image: "https://via.placeholder.com/800x600.png?text=Air+Filter",
      price: 250000,
    },
  ],
};

const formatIDR = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));

export default function SparePart() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [activeProduct, setActiveProduct] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const products = useMemo(
    () => PRODUCTS_BY_CATEGORY[category] || [],
    [category],
  );

  const closeModal = () => setActiveProduct(null);

  // ESC untuk close modal
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeModal();
    if (activeProduct) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeProduct]);

  // ✅ satu-satunya fungsi untuk tombol "Hubungi Kami"
  const goToContact = () => {
    closeModal();

    // kalau sudah di home, scroll langsung
    if (location.pathname === "/") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // kalau di /sparepart, pindah ke home + hash contact
    navigate("/?section=contact");
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <h1 className="text-center text-2xl md:text-3xl font-medium text-gray-900">
          Spare Part
        </h1>

        {/* Dropdown */}
        <div className="mt-4 flex justify-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[260px] md:w-[360px] h-9 rounded border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveProduct(p)}
              className="text-left rounded border border-[#B9D8EA] bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="p-6">
                <div className="w-full rounded border border-[#B9D8EA] overflow-hidden bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-[170px] object-cover"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {p.title}
                    </div>
                    <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                      {p.desc}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500">Mulai dari</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formatIDR(p.price)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>Lihat detail</span>
                  <span aria-hidden>&gt;</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activeProduct && (
        <Modal
          product={activeProduct}
          onClose={closeModal}
          onContact={goToContact}
        />
      )}
    </section>
  );
}

function Modal({ product, onClose, onContact }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4"
      onMouseDown={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-md shadow-lg overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-red-500 text-3xl leading-none hover:opacity-80 z-10"
          aria-label="Tutup"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[320px] md:h-full object-contain p-6"
            />
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              {product.title}
            </h3>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
              <span className="text-xs text-slate-600">Harga</span>
              <span className="text-sm font-semibold text-slate-900">
                {formatIDR(product.price)}
              </span>
            </div>

            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
              {product.desc}
            </p>

            {/* ✅ tombol pakai onContact (bukan goToContact) */}
            <button
              type="button"
              onClick={onContact}
              className="mt-6 inline-flex items-center justify-center w-full h-11 rounded-full bg-[#5D9FC7] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
