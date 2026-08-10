import InventoryTable from "@/features/inventory/InventoryTable";

export default function InventoryPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          Operations
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Inventory
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage and monitor your complete inventory catalog.
        </p>
      </div>

      <InventoryTable />
    </div>
  );
}