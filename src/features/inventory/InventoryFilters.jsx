"use client";

export default function InventoryFilters({
  category,
  setCategory,
  stockLevel,
  setStockLevel,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onReset,
}) {
  return (
    <div className="mt-6">

      {/* Filters Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Category Filter */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Apparel">Apparel</option>
            <option value="Home & Office">
              Home & Office
            </option>
            <option value="Accessories">
              Accessories
            </option>
          </select>
        </div>

        {/* Stock Level Filter */}
        <div>
          <div className="mb-2 flex items-center justify-between">

            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Stock Level
            </label>

            <span className="text-xs font-semibold text-blue-600">
              {stockLevel === null
                ? "All Stock"
                : `≤ ${stockLevel}`}
            </span>

          </div>

          <input
            type="range"
            min="0"
            max="250"
            value={stockLevel ?? 250}
            onChange={(e) =>
              setStockLevel(
                Number(e.target.value)
              )
            }
            className="w-full accent-blue-600"
          />

          <div className="mt-1 flex justify-between text-[11px] text-slate-400">
            <span>0</span>
            <span>250</span>
          </div>

          {/* All Stock */}
          <button
            type="button"
            onClick={() => setStockLevel(null)}
            className={`mt-2 text-xs font-medium transition ${
              stockLevel === null
                ? "text-blue-600"
                : "text-slate-400 hover:text-blue-600"
            }`}
          >
            Show All Stock
          </button>
        </div>

        {/* Minimum Price */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Minimum Price
          </label>

          <div className="relative">

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              $
            </span>

            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value)
              }
              placeholder="Min price"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>
        </div>

        {/* Maximum Price */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Maximum Price
          </label>

          <div className="relative">

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              $
            </span>

            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              placeholder="Max price"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>
        </div>

      </div>

      {/* Reset */}
      <div className="mt-4 flex justify-end">

        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
}