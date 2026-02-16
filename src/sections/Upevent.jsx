import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { id } from "date-fns/locale";

const EVENTS = [
  {
    id: 1,
    title: "Webinar Transformasi Digital",
    date: "2026-02-16",
    time: "19:00",
    location: "Zoom",
    category: "Webinar",
    description: "Pembahasan strategi transformasi digital untuk bisnis.",
  },
  {
    id: 2,
    title: "Workshop UI/UX Fundamental",
    date: "2026-02-16",
    time: "13:00",
    location: "Jakarta",
    category: "Workshop",
    description: "Belajar basic flow UI/UX dari studi kasus nyata.",
  },
  {
    id: 3,
    title: "Meetup Komunitas React",
    date: "2026-02-18",
    time: "18:30",
    location: "Bandung",
    category: "Meetup",
    description: "Ngobrol santai + sharing project React.",
  },
  {
    id: 4,
    title: "Pelatihan SOP & Audit Internal",
    date: "2026-02-25",
    time: "09:00",
    location: "Online",
    category: "Training",
    description: "Penerapan SOP, risk register, dan audit berbasis temuan.",
  },
  {
    id: 5,
    title: "Pameran Produk Mesin - Open House",
    date: "2026-03-02",
    time: "10:00",
    location: "Showroom HSI",
    category: "Open House",
    description: "Demo produk + sesi tanya jawab dengan tim teknis.",
  },
];

function groupByDate(events) {
  const map = new Map();
  for (const e of events) {
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date).push(e);
  }
  return map;
}

function getCalendarDays(currentMonth) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Senin
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) {
    days.push(d);
  }
  return days;
}

export default function Upevent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  const eventsByDate = useMemo(() => groupByDate(EVENTS), []);
  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const selectedEvents = (eventsByDate.get(selectedKey) ?? [])
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time));

  const monthLabel = format(currentMonth, "MMMM yyyy", { locale: id });
  const days = useMemo(() => getCalendarDays(currentMonth), [currentMonth]);

  const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const hasEvent = (dateObj) => {
    const k = format(dateObj, "yyyy-MM-dd");
    return eventsByDate.has(k);
  };

  const countEvent = (dateObj) => {
    const k = format(dateObj, "yyyy-MM-dd");
    return eventsByDate.get(k)?.length ?? 0;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Kegiatan</h1>
            <p className="mt-2 text-sm md:text-base text-slate-600">
              Pilih tanggal di kalender untuk melihat event pada tanggal
              tersebut.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            Tanggal dipilih:{" "}
            <span className="font-medium text-slate-700">
              {format(selectedDate, "EEEE, d MMMM yyyy", { locale: id })}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Calendar */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="px-3 py-2 rounded-lg border hover:bg-slate-50 transition text-sm"
                  type="button"
                  aria-label="Bulan sebelumnya"
                >
                  ‹
                </button>

                <div className="text-center">
                  <div className="font-semibold capitalize">{monthLabel}</div>
                </div>

                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="px-3 py-2 rounded-lg border hover:bg-slate-50 transition text-sm"
                  type="button"
                  aria-label="Bulan berikutnya"
                >
                  ›
                </button>
              </div>

              {/* Day names */}
              <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-slate-500">
                {dayNames.map((n) => (
                  <div key={n} className="text-center font-medium">
                    {n}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="mt-2 grid grid-cols-7 gap-2">
                {days.map((d) => {
                  const inMonth = isSameMonth(d, currentMonth);
                  const selected = isSameDay(d, selectedDate);
                  const today = isToday(d);
                  const dot = hasEvent(d);
                  const c = countEvent(d);

                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setSelectedDate(d)}
                      type="button"
                      className={[
                        "relative h-11 rounded-xl border text-sm transition",
                        "flex items-center justify-center",
                        inMonth ? "bg-white" : "bg-slate-50 text-slate-400",
                        selected
                          ? "border-[#4D6CFF] ring-2 ring-[#4D6CFF]/20"
                          : "hover:bg-slate-50",
                        today && !selected ? "border-slate-300" : "",
                      ].join(" ")}
                      aria-label={format(d, "yyyy-MM-dd")}
                    >
                      <span className={today ? "font-semibold" : ""}>
                        {format(d, "d")}
                      </span>

                      {/* dot / badge */}
                      {dot && (
                        <>
                          <span
                            className={[
                              "absolute bottom-1 h-1.5 w-1.5 rounded-full",
                              selected ? "bg-[#4D6CFF]" : "bg-slate-400",
                            ].join(" ")}
                          />
                          {c >= 2 && (
                            <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900 text-white">
                              {c}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Event List */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Daftar Event</h2>
                <span className="text-xs text-slate-500">
                  {selectedEvents.length} event
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {selectedEvents.length === 0 ? (
                  <div className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">
                    Tidak ada event pada tanggal ini. Coba pilih tanggal lain.
                  </div>
                ) : (
                  selectedEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-xl border p-4 hover:shadow-sm transition"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold">{ev.title}</div>
                          <div className="mt-1 text-xs text-slate-500">
                            {ev.category} • {ev.location}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium">{ev.time}</div>
                          <div className="text-xs text-slate-500">
                            {format(parseISO(ev.date), "d MMM yyyy", {
                              locale: id,
                            })}
                          </div>
                        </div>
                      </div>

                      {ev.description && (
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                          {ev.description}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
