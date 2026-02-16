import { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  "Dry, Wet & Fine Milling",
  "Mixing and Granulation",
  "Packing & Filling",
];

const PRODUCTS_BY_CATEGORY = {
  "Dry, Wet & Fine Milling": [
    {
      id: "micronizer-jet-mill",
      title: "Micronizer Jet Mill",
      desc: "Mesin jet mill untuk penghalusan partikel dengan presisi tinggi. Cocok untuk aplikasi dry milling pada industri farmasi, kimia, dan pangan.",
      image: "https://via.placeholder.com/800x600.png?text=Micronizer+Jet+Mill",
    },
    {
      id: "hammer-mill",
      title: "Hammer Mill",
      desc: "Mesin hammer mill untuk penghancuran material dengan output ukuran partikel yang dapat diatur sesuai kebutuhan proses.",
      image: "https://via.placeholder.com/800x600.png?text=Hammer+Mill",
    },
    {
      id: "pin-mill",
      title: "Pin Mill",
      desc: "Mesin pin mill untuk fine grinding, cocok untuk bahan kering dengan kebutuhan ukuran halus dan konsisten.",
      image: "https://via.placeholder.com/800x600.png?text=Pin+Mill",
    },
  ],

  "Mixing and Granulation": [
    {
      id: "ribbon-mixer",
      title: "Ribbon Mixer",
      desc: "Mixer horizontal untuk pencampuran powder/granule dengan hasil homogen, cocok untuk proses batching.",
      image: "https://via.placeholder.com/800x600.png?text=Ribbon+Mixer",
    },
    {
      id: "high-shear-mixer",
      title: "High Shear Mixer",
      desc: "High shear mixer untuk proses granulasi cepat dengan kontrol yang baik terhadap ukuran granul dan konsistensi.",
      image: "https://via.placeholder.com/800x600.png?text=High+Shear+Mixer",
    },
    {
      id: "granulator",
      title: "Granulator",
      desc: "Granulator untuk membentuk granul dengan ukuran terkontrol. Cocok untuk industri farmasi & chemical.",
      image: "https://via.placeholder.com/800x600.png?text=Granulator",
    },
  ],

  "Packing & Filling": [
    {
      id: "vffs",
      title: "VFFS Packing",
      desc: "Mesin packaging vertical untuk berbagai jenis kemasan dengan kecepatan tinggi dan akurasi stabil.",
      image: "https://via.placeholder.com/800x600.png?text=VFFS+Packing",
    },
    {
      id: "multihead",
      title: "Multihead Weigher",
      desc: "Sistem penimbangan multihead untuk meningkatkan akurasi dan throughput pada proses pengemasan.",
      image: "https://via.placeholder.com/800x600.png?text=Multihead+Weigher",
    },
    {
      id: "filling",
      title: "Filling Machine",
      desc: "Mesin filling untuk liquid/powder dengan kontrol volume/berat sesuai kebutuhan produksi.",
      image: "https://via.placeholder.com/800x600.png?text=Filling+Machine",
    },
  ],
};

export default function MesinSparePart() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [activeProduct, setActiveProduct] = useState(null);

  const products = useMemo(() => {
    return PRODUCTS_BY_CATEGORY[category] || [];
  }, [category]);

  const closeModal = () => setActiveProduct(null);

  // ESC untuk close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (activeProduct) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeProduct]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <h1 className="text-center text-2xl md:text-3xl font-medium text-gray-900">
          Mesin Spare Part
        </h1>

        {/* Dropdown */}
        <div className="mt-4 flex justify-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[260px] md:w-[320px] h-9 rounded border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Subheading */}
        <p className="mt-8 text-sm text-gray-700">{category}</p>

        {/* Cards */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

                <div className="mt-5 flex items-center justify-between text-sm text-gray-900">
                  <span className="font-medium">{p.title}</span>
                  <span aria-hidden className="text-gray-500">
                    &gt;
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activeProduct && <Modal product={activeProduct} onClose={closeModal} />}
    </section>
  );
}

function Modal({ product, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4"
      onMouseDown={onClose} // klik luar untuk close
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-md shadow-lg overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()} // klik di dalam jangan close
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-red-500 text-3xl leading-none hover:opacity-80"
          aria-label="Tutup"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: image */}
          <div className="bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[320px] md:h-full object-contain p-6"
            />
          </div>

          {/* RIGHT: content */}
          <div className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              {product.title}
            </h3>

            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
              {product.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
