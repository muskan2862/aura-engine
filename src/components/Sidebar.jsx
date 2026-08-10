"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "▦",
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: "▤",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-64 bg-slate-950 text-white shadow-xl">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Aura<span className="text-blue-400">Engine</span>
          </h1>

          <p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-500">
            Enterprise
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg ${
                    isActive
                      ? "bg-white/15"
                      : "bg-slate-800 group-hover:bg-slate-700"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-5 left-4 right-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-xs font-medium text-slate-300">
          Aura Enterprise Engine
        </p>

        <p className="mt-1 text-[11px] text-slate-500">
          Inventory Management
        </p>
      </div>
    </aside>
  );
}