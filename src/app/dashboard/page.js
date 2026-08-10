import InventoryCharts from "@/features/dashboard/InventoryCharts";

export default function DashboardPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div className="text-sm font-medium text-blue-600">
          Command Center
        </div>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor your inventory performance and operational risks.
        </p>
      </div>

      {/* Analytics + KPI Cards */}
      <InventoryCharts />
    </div>
  );
}