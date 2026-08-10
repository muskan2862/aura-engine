import { NextResponse } from "next/server";
import { getInventoryData } from "@/services/inventoryService";

export async function GET() {
  try {
    // Get all inventory data
    const inventory = getInventoryData();

    // ==========================================
    // 1. SUMMARY KPIs
    // ==========================================

    const totalSKUs = inventory.length;

    const totalInventoryValue = inventory.reduce(
      (total, item) => {
        const price = Number(item.price) || 0;
        const stock = Number(item.stock) || 0;

        return total + price * stock;
      },
      0
    );

    const outOfStockItems = inventory.filter(
      (item) => Number(item.stock) === 0
    ).length;

    // ==========================================
    // 2. RESTOCK PRIORITY
    // Top 10 products with lowest stock
    // ==========================================

    const restockPriority = [...inventory]
      .sort((a, b) => {
        return Number(a.stock) - Number(b.stock);
      })
      .slice(0, 10)
      .map((item) => ({
        id: item.id,
        sku: item.sku,
        name: item.name,
        stock: Number(item.stock) || 0,
        category: item.category,
      }));

    // ==========================================
    // 3. PORTFOLIO DISTRIBUTION
    // Inventory value by category
    // ==========================================

    const categoryMap = {};

    inventory.forEach((item) => {
      const category = item.category || "Uncategorized";

      const inventoryValue =
        (Number(item.price) || 0) *
        (Number(item.stock) || 0);

      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }

      categoryMap[category] += inventoryValue;
    });

    const categoryDistribution = Object.entries(
      categoryMap
    ).map(([category, value]) => ({
      category,
      value: Number(value.toFixed(2)),
    }));

    // Sort highest value category first
    categoryDistribution.sort(
      (a, b) => b.value - a.value
    );

    // ==========================================
    // RESPONSE
    // ==========================================

    return NextResponse.json({
      success: true,

      summary: {
        totalSKUs,
        totalInventoryValue: Number(
          totalInventoryValue.toFixed(2)
        ),
        outOfStockItems,
      },

      restockPriority,

      categoryDistribution,
    });
  } catch (error) {
    console.error(
      "Analytics API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch analytics data",
      },
      {
        status: 500,
      }
    );
  }
}