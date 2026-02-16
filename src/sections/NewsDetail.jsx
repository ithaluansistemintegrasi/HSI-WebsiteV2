// src/sections/NewsDetail.jsx
import { Link, useParams } from "react-router-dom";
import { NEWS } from "../data/newsData";

export default function NewsDetail() {
  const { slug } = useParams();
  const data = NEWS.find((n) => n.slug === slug);

  if (!data) {
    return (
      <section className="pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Berita tidak ditemukan</h1>
          <p className="mt-2 text-gray-600">
            Link berita tidak valid atau data belum tersedia.
          </p>

          <Link
            to="/news"
            className="inline-block mt-6 text-sm text-gray-800 hover:underline"
          >
            &larr; Kembali ke News
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 pb-16">
      <div className="container mx-auto px-4">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
        >
          ← Kembali ke News
        </Link>

        {/* Header */}
        <div className="mt-6 max-w-3xl">
          <div className="text-xs text-gray-500">{data.date}</div>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
            {data.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            {data.excerpt}
          </p>
        </div>

        {/* Cover Image */}
        <div className="mt-6 overflow-hidden rounded-2xl border bg-gray-100">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-[220px] md:h-[360px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-8 max-w-3xl space-y-4 text-gray-700 leading-relaxed">
          {data.content.map((p, idx) => (
            <p key={idx} className="text-sm md:text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
