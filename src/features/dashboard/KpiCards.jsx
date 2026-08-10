const stats = [
  {
    title: "Total SKUs",
    value: "50,248",
    description: "Products in inventory",
    icon: "▦",
  },
  {
    title: "Total Inventory Value",
    value: "$8.42M",
    description: "Current inventory valuation",
    icon: "$",
  },
  {
    title: "Out of Stock Items",
    value: "1,284",
    description: "Products requiring attention",
    icon: "!",
  },
];

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </h3>

              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}