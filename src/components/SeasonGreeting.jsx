import { useEffect, useState } from "react";

export default function SeasonGreetingPopup({
  imageSrc,
  imageAlt = "Season Greeting",
  delay = 600,

  // posisi / ukuran
  topClass = "top-24",
  leftClass = "left-4",
  widthClass = "w-[260px] sm:w-[300px]",
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // kalau sudah pernah tampil di 1x load SPA, jangan tampil lagi
    if (window.__HSI_SEASON_GREETING_SHOWN__ === true) return;

    const t = setTimeout(() => {
      setOpen(true);
      // ✅ set flag saat benar-benar tampil (bukan saat mount)
      window.__HSI_SEASON_GREETING_SHOWN__ = true;
    }, delay);

    return () => clearTimeout(t);
  }, [delay]);

  const close = () => setOpen(false);

  if (!open) return null;

  return (
    <div
      className={`fixed z-[99999] ${topClass} ${leftClass} ${widthClass}`}
      role="dialog"
      aria-label="Season Greeting"
    >
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg border border-black/5 animate-[sgToast_220ms_ease-out]">
        <button
          onClick={close}
          className="absolute right-2 top-2 z-10 rounded-full text-red-700 bg-white/90 backdrop-blur px-2 py-1 text-xs hover:bg-white transition"
          aria-label="Close popup"
        >
          ✕
        </button>

        <div className="relative h-[140px] sm:h-[160px] bg-gray-100">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <style>{`
          @keyframes sgToast {
            from { opacity: 0; transform: translateY(-6px) scale(.98); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
