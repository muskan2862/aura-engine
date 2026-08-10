export default function Header() {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Aura Enterprise Engine
        </h2>

        <p className="text-xs text-slate-500">
          Inventory & Operations Management
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-700">
            Warehouse Manager
          </p>

          <p className="text-xs text-slate-400">
            Admin
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md">
          WM
        </div>
      </div>
    </header>
  );
}