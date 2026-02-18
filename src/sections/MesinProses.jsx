import { useEffect, useMemo, useState } from "react";
import packingLine from "../assets/showcase-product/packaging-machine.png";

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
      desc: "Mesin jet mill untuk penghalusan partikel dengan presisi tinggi.",
      image: "https://via.placeholder.com/800x600.png?text=Micronizer+Jet+Mill",
    },
    {
      id: "hammer-mill",
      title: "Hammer Mill",
      desc: "Mesin hammer mill untuk penghancuran material.",
      image: "https://via.placeholder.com/800x600.png?text=Hammer+Mill",
    },
    {
      id: "pin-mill",
      title: "Pin Mill",
      desc: "Mesin pin mill untuk fine grinding.",
      image: "https://via.placeholder.com/800x600.png?text=Pin+Mill",
    },
  ],
  "Mixing and Granulation": [
    {
      id: "ribbon-mixer",
      title: "Ribbon Mixer",
      desc: "Mixer horizontal untuk pencampuran.",
      image: "https://via.placeholder.com/800x600.png?text=Ribbon+Mixer",
    },
    {
      id: "high-shear-mixer",
      title: "High Shear Mixer",
      desc: "High shear mixer untuk granulasi cepat.",
      image: "https://via.placeholder.com/800x600.png?text=High+Shear+Mixer",
    },
    {
      id: "granulator",
      title: "Granulator",
      desc: "Granulator untuk membentuk granul terkontrol.",
      image: "https://via.placeholder.com/800x600.png?text=Granulator",
    },
  ],
  "Packing & Filling": [
    {
      id: "labeling",
      title: "Labeling Machine",
      desc: "Pelabelan produk sebelum inspeksi.",
      image: "https://via.placeholder.com/800x600.png?text=Labeling+Machine",
    },
    {
      id: "inspection",
      title: "Inspection Machine",
      desc: "Cek kualitas/label/defect sebelum cartoning.",
      image: "https://via.placeholder.com/800x600.png?text=Inspection+Machine",
    },
    {
      id: "cartoning",
      title: "Cartoning Machine",
      desc: "Proses pengemasan karton otomatis.",
      image: "https://via.placeholder.com/800x600.png?text=Cartoning+Machine",
    },
    // produk lain bebas...
    {
      id: "vffs",
      title: "VFFS Packing",
      desc: "Mesin packaging vertical.",
      image: "https://via.placeholder.com/800x600.png?text=VFFS+Packing",
    },
    {
      id: "multihead",
      title: "Multihead Weigher",
      desc: "Sistem penimbangan multihead.",
      image: "https://via.placeholder.com/800x600.png?text=Multihead+Weigher",
    },
    {
      id: "filling",
      title: "Filling Machine",
      desc: "Mesin filling liquid/powder.",
      image: "https://via.placeholder.com/800x600.png?text=Filling+Machine",
    },
  ],
};

const BACKGROUND_BY_CATEGORY = {
  "Dry, Wet & Fine Milling": packingLine,
  "Mixing and Granulation": packingLine,
  "Packing & Filling": packingLine,
};

const HOTSPOT_RECTS_BY_CATEGORY = {
  "Packing & Filling": [
    // Labeling (kiri)
    { id: "labeling", rect: { x: 15, y: 48, w: 22, h: 40 } },
    // Inspection (tengah)
    { id: "inspection", rect: { x: 35, y: 25, w: 28, h: 55 } },
    // Cartoning (kanan)
    { id: "cartoning", rect: { x: 53, y: 15, w: 35, h: 75 } },
  ],
};

/** Helper: center point dari rect */
function rectToCenter(rect) {
  return {
    x: rect.x + rect.w / 2,
    y: rect.y + rect.h / 2,
  };
}

/** Helper: hotspots otomatis untuk kategori lain (kalau belum punya rect) */
function autoHotspotsFromProducts(products) {
  const top3 = (products || []).slice(0, 3);
  const xs = [20, 50, 80];
  const y = 45;
  return top3.map((p, idx) => ({
    id: p.id,
    x: xs[idx] ?? 50,
    y,
    title: p.title,
    desc: p.desc,
  }));
}

export default function MesinProses() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  const products = useMemo(
    () => PRODUCTS_BY_CATEGORY[category] || [],
    [category],
  );
  const backgroundImage = BACKGROUND_BY_CATEGORY[category];

  // fallback bg
  const [bgBroken, setBgBroken] = useState(false);
  useEffect(() => setBgBroken(false), [category]);

  const hotspots = useMemo(() => {
    // kalau kategori punya rect → pakai center dari rect (simetris)
    const rectDefs = HOTSPOT_RECTS_BY_CATEGORY[category];
    if (rectDefs?.length) {
      return rectDefs.map((d) => {
        const p = products.find((x) => x.id === d.id);
        const center = rectToCenter(d.rect);
        return {
          id: d.id,
          x: center.x,
          y: center.y,
          title: p?.title ?? d.id,
          desc: p?.desc ?? "",
          rect: d.rect, // dipakai kalau mau debug kotak
        };
      });
    }
    // default auto
    return autoHotspotsFromProducts(products);
  }, [category, products]);

  const closeModal = () => setActiveProduct(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeModal();
    if (activeProduct) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeProduct]);

  const openFromHotspot = (hotspot) => {
    const found = products.find((p) => p.id === hotspot.id);
    if (found) setActiveProduct(found);
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <h1 className="text-center text-2xl md:text-3xl font-medium text-gray-900">
          Mesin Proses
        </h1>

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

        <div className="mt-8">
          <div className="relative rounded-lg border border-[#B9D8EA] overflow-hidden bg-gray-100">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
              {backgroundImage ? (
                <img
                  src={bgBroken ? packingLine : backgroundImage}
                  alt={`${category} production line`}
                  className="w-full h-full object-contain bg-white"
                  onError={() => setBgBroken(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                  Background image belum diisi.
                </div>
              )}

              {/* Hotspots (titik di tengah rect = simetris) */}
              {hotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  onMouseEnter={() => setHoveredHotspot(hotspot)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  onClick={() => openFromHotspot(hotspot)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative">
                    <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-transform" />

                    {hoveredHotspot?.id === hotspot.id && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white rounded-lg shadow-xl border border-[#B9D8EA] p-3 z-20">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-[#B9D8EA]" />
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {hotspot.title}
                        </h4>
                        <p className="mt-1 text-xs text-gray-600">
                          {hotspot.desc}
                        </p>
                        <p className="mt-2 text-[11px] text-blue-600">
                          Klik untuk lihat detail
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white text-lg md:text-xl font-medium">
                {category} Production Line
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Hotspot simetris (titik = center dari area mesin)
              </p>
            </div>
          </div>
        </div>
      </div>

      {activeProduct && <Modal product={activeProduct} onClose={closeModal} />}
    </section>
  );
}

function Modal({ product, onClose }) {
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
            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
              {product.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
