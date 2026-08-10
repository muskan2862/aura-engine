import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="flex h-20 w-full items-center justify-between px-6 lg:px-10">
          {/* Left */}
          <Link href="/" className="flex items-center">
            <div>
              <h1 className="text-lg font-bold tracking-wide text-white">
                AURA
              </h1>
              <p className="text-[10px] text-slate-500">
                Inventory Management
              </p>
            </div>
          </Link>

          {/* Right */}
          <nav className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Dashboard
            </Link>

            <Link
              href="/inventory"
              className="rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Inventory
            </Link>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="border-b border-slate-800">
        <div className="grid min-h-140 w-full grid-cols-1 lg:grid-cols-[1fr_0.9fr]">
          {/* Left Content */}
          <div className="flex items-center px-8 py-20 lg:px-16 xl:px-24">
            <div className="max-w-2xl">
              <p className="mb-5 text-sm font-medium text-blue-400">
                Inventory Management Platform
              </p>

              <h2 className="text-5xl font-bold leading-[1.08] tracking-tight text-white xl:text-6xl">
                Manage your inventory
                <span className="block text-slate-400">
                  with clarity.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-400">
                Keep track of products, stock levels, pricing, and
                inventory activity from one place.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
                >
                  Open Dashboard
                </Link>

                <Link
                  href="/inventory"
                  className="rounded-md border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  View Inventory
                </Link>
              </div>
            </div>
          </div>

          {/* Right Preview */}
          <div className="flex items-center border-t border-slate-800 bg-slate-900/30 px-8 py-14 lg:border-l lg:border-t-0 lg:px-12 xl:px-16">
            <div className="w-full max-w-2xl">
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                {/* Preview Header */}
                <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Inventory Overview
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Current inventory status
                    </p>
                  </div>

                  <span className="text-xs text-emerald-400">
                    ● Active
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 border-b border-slate-800">
                  <PreviewStat
                    label="Total SKUs"
                    value="50,000"
                  />

                  <PreviewStat
                    label="Inventory Value"
                    value="$24.8M"
                  />

                  <PreviewStat
                    label="Low Stock"
                    value="124"
                  />
                </div>

                {/* Product List */}
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-300">
                      Stock Overview
                    </p>

                    <span className="text-xs text-slate-600">
                      Current
                    </span>
                  </div>

                  <div>
                    <InventoryRow
                      name="Wireless Mouse"
                      sku="WM-1024"
                      stock="142"
                    />

                    <InventoryRow
                      name="USB-C Hub"
                      sku="UH-2048"
                      stock="38"
                    />

                    <InventoryRow
                      name="Laptop Stand"
                      sku="LS-3012"
                      stock="24"
                    />

                    <InventoryRow
                      name="Bluetooth Speaker"
                      sku="BS-4021"
                      stock="17"
                      warning
                    />

                    <InventoryRow
                      name="Mechanical Keyboard"
                      sku="MK-5098"
                      stock="12"
                      warning
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="w-full border-b border-slate-800">
        <div className="px-8 py-20 lg:px-16 xl:px-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-blue-400">
              Overview
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-white">
              Everything you need to manage inventory
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              A simple workspace for keeping product information
              organized and monitoring stock across your catalog.
            </p>
          </div>

          <div className="mt-12 grid w-full gap-px overflow-hidden border border-slate-800 bg-slate-800 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard
              title="Product Management"
              text="View and manage products, SKUs, categories, and pricing."
            />

            <InfoCard
              title="Stock Monitoring"
              text="Quickly identify products with low or critical stock."
            />

            <InfoCard
              title="Inventory Analytics"
              text="Review inventory value and category-level distribution."
            />

            <InfoCard
              title="Data Export"
              text="Export inventory records for reporting and analysis."
            />
          </div>
        </div>
      </section>

      {/* ================= INVENTORY INSIGHTS ================= */}
      <section className="w-full border-b border-slate-800 bg-slate-900/30">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="px-8 py-20 lg:px-16 xl:px-24">
            <div className="max-w-xl">
              <p className="text-sm font-medium text-blue-400">
                Inventory Insights
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">
                Keep an eye on stock before it becomes a problem.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                The dashboard gives you a quick view of inventory
                health, while the inventory page lets you search,
                filter, and inspect individual products.
              </p>

              <Link
                href="/dashboard"
                className="mt-7 inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center border-t border-slate-800 px-8 py-20 lg:border-l lg:border-t-0 lg:px-16 xl:px-24">
            <div className="w-full max-w-xl rounded-xl border border-slate-800 bg-slate-950 p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    Inventory Health
                  </p>

                  <p className="mt-1 text-3xl font-semibold text-white">
                    94.2%
                  </p>
                </div>

                <span className="rounded-md bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                  Healthy
                </span>
              </div>

              <div className="mt-8 space-y-6">
                <HealthBar
                  label="Electronics"
                  value="40%"
                  width="40%"
                />

                <HealthBar
                  label="Apparel"
                  value="30%"
                  width="30%"
                />

                <HealthBar
                  label="Home & Office"
                  value="20%"
                  width="20%"
                />

                <HealthBar
                  label="Accessories"
                  value="10%"
                  width="10%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GET STARTED ================= */}
      <section className="w-full px-8 py-20 lg:px-16 xl:px-24">
        <div className="flex w-full flex-col justify-between gap-8 border border-slate-800 bg-slate-900 p-8 md:flex-row md:items-center lg:p-10">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Get Started
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Ready to check your inventory?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Open the dashboard for an overview or go directly to
              the inventory catalog.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Dashboard
            </Link>

            <Link
              href="/inventory"
              className="rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Inventory
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800">
        <div className="flex w-full flex-col justify-between gap-4 px-8 py-7 sm:flex-row sm:items-center lg:px-10">
          <div>
            <p className="text-sm font-semibold text-slate-300">
              AURA
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Inventory Management Platform
            </p>
          </div>

          <div className="flex items-center gap-5 text-xs text-slate-500">
            <Link
              href="/dashboard"
              className="transition hover:text-slate-300"
            >
              Dashboard
            </Link>

            <Link
              href="/inventory"
              className="transition hover:text-slate-300"
            >
              Inventory
            </Link>

            <span>© 2026 AURA</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =========================
   PREVIEW STAT
========================= */

function PreviewStat({ label, value }) {
  return (
    <div className="border-r border-slate-800 px-4 py-5 last:border-r-0">
      <p className="text-[11px] text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-base font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

/* =========================
   INVENTORY ROW
========================= */

function InventoryRow({
  name,
  sku,
  stock,
  warning = false,
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/70 py-3.5 last:border-b-0">
      <div>
        <p className="text-xs font-medium text-slate-300">
          {name}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-600">
          {sku}
        </p>
      </div>

      <span
        className={`text-xs font-medium ${
          warning
            ? "text-amber-400"
            : "text-emerald-400"
        }`}
      >
        {stock} units
      </span>
    </div>
  );
}

/* =========================
   INFO CARD
========================= */

function InfoCard({ title, text }) {
  return (
    <div className="bg-slate-900 p-7 transition hover:bg-slate-900/70">
      <h3 className="text-sm font-semibold text-slate-200">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

/* =========================
   HEALTH BAR
========================= */

function HealthBar({
  label,
  value,
  width,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {label}
        </span>

        <span className="text-xs font-medium text-slate-300">
          {value}
        </span>
      </div>

      <div className="h-1.5 bg-slate-800">
        <div
          className="h-full bg-blue-600"
          style={{ width }}
        />
      </div>
    </div>
  );
}