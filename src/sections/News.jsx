// src/sections/News.jsx
import { Link } from "react-router-dom";
import { NEWS } from "../data/newsData";

export default function News() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold">Berita</h1>
        <p className="mt-2 text-sm md:text-base text-gray-600">
          Halaman berita / update terbaru.
        </p>

        <div className="mt-8 space-y-5">
          {NEWS.map((n) => (
            <article
              key={n.slug}
              className="relative rounded-xl border border-sky-200 bg-white p-4 md:p-5 shadow-sm"
            >
              <div className="absolute right-4 top-3 text-xs text-gray-500">
                {n.date}
              </div>

              <div className="flex gap-4 md:gap-6">
                <div className="w-28 h-20 md:w-44 md:h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0 flex-1 pr-10">
                  <h2 className="font-semibold text-gray-900">{n.title}</h2>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                    {n.excerpt}
                  </p>
                </div>

                <div className="flex items-end">
                  <Link
                    to={`/news/${n.slug}`}
                    className="text-xs md:text-sm text-gray-700 hover:text-gray-900 whitespace-nowrap"
                  >
                    Baca Selengkapnya&gt;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
