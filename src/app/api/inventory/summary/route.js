import { NextResponse } from "next/server";
import { getInventoryData } from "@/services/inventoryService";

export async function GET() {
  try {
    const inventory = getInventoryData();

    // -----------------------------
    // Total SKUs
    // -----------------------------
    const totalSKUs = inventory.length;

    // -----------------------------
    // Total Inventory Value
    // -----------------------------
    const totalInventoryValue = inventory.reduce(
      (total, item) => {
        return total + item.stock * item.price;
      },
      0
    );

    // -----------------------------
    // Out of Stock Items
    // -----------------------------
    const outOfStockItems = inventory.filter(
      (item) => Number(item.stock) === 0
    ).length;

    // -----------------------------
    // -----------------------------
// Restock Priority
// Lowest-stock UNIQUE products
// -----------------------------

const productGroups = new Map();

inventory
  .filter((item) => Number(item.stock) > 0)
  .forEach((item) => {
    // Remove the generated number at the end.
    // Example:
    // "Bluetooth Speaker 251"
    // becomes:
    // "Bluetooth Speaker"
    const baseName = String(item.name)
      .trim()
      .replace(/\s+\d+$/, "");

    const current = productGroups.get(baseName);

    // Keep the SKU with the lowest stock
    if (
      !current ||
      Number(item.stock) < Number(current.stock)
    ) {
      productGroups.set(baseName, item);
    }
  });

const restockPriority = Array.from(
  productGroups.values()
)
  .sort(
    (a, b) =>
      Number(a.stock) - Number(b.stock)
  )
  .slice(0, 10)
  .map((item) => ({
    id: item.id,
    sku: item.sku,
    name: String(item.name)
      .trim()
      .replace(/\s+\d+$/, ""),
    stock: Number(item.stock),
    category: item.category,
  }));

    // -----------------------------
    // Category Distribution
    // Inventory value by category
    // -----------------------------
    const categoryMap = {};

    inventory.forEach((item) => {
      const inventoryValue =
        Number(item.stock) * Number(item.price);

      if (!categoryMap[item.category]) {
        categoryMap[item.category] = 0;
      }

      categoryMap[item.category] +=
        inventoryValue;
    });

    const categoryDistribution = Object.entries(
      categoryMap
    ).map(([category, value]) => ({
      category,
      value,
    }));

    // -----------------------------
    // API Response
    // -----------------------------
    return NextResponse.json({
      success: true,

      summary: {
        totalSKUs,
        totalInventoryValue,
        outOfStockItems,
        restockPriority,
        categoryDistribution,
      },
    });
  } catch (error) {
    console.error(
      "Inventory Summary API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate inventory analytics",
      },
      {
        status: 500,
      }
    );
  }
}