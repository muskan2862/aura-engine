import { NextResponse } from "next/server";
import { getInventoryData } from "@/services/inventoryService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Number(searchParams.get("limit")) || 50,
      50
    );

    // Search
    const search =
      searchParams.get("search")?.trim().toLowerCase() || "";

    // Filters
    const category =
      searchParams.get("category") || "All";

    const stockLevel =
      searchParams.get("stockLevel") !== null
        ? Number(searchParams.get("stockLevel"))
        : null;

    const minPrice =
      searchParams.get("minPrice") !== null
        ? Number(searchParams.get("minPrice"))
        : null;

    const maxPrice =
      searchParams.get("maxPrice") !== null
        ? Number(searchParams.get("maxPrice"))
        : null;

    // Sorting
    const sortBy =
      searchParams.get("sortBy") || null;

    const sortOrder =
      searchParams.get("sortOrder") === "desc"
        ? "desc"
        : "asc";

    // Get inventory
    const inventory = getInventoryData();

    // Filtering
    let filteredInventory = inventory.filter((item) => {
      // Search
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.sku.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search);

      // Category
      const matchesCategory =
        category === "All" ||
        item.category === category;

      // Stock
      const matchesStock =
        stockLevel === null ||
        item.stock <= stockLevel;

      // Minimum price
      const matchesMinPrice =
        minPrice === null ||
        Number.isNaN(minPrice) ||
        item.price >= minPrice;

      // Maximum price
      const matchesMaxPrice =
        maxPrice === null ||
        Number.isNaN(maxPrice) ||
        item.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    // Sorting
    if (sortBy) {
      filteredInventory.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }

        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }

        return 0;
      });
    }

    // Total results
    const totalItems = filteredInventory.length;

    const totalPages = Math.max(
      1,
      Math.ceil(totalItems / limit)
    );

    // Prevent invalid page
    const safePage = Math.min(
      page,
      totalPages
    );

    // Server-side pagination
    const startIndex =
      (safePage - 1) * limit;

    const paginatedInventory =
      filteredInventory.slice(
        startIndex,
        startIndex + limit
      );

    return NextResponse.json({
      success: true,

      data: paginatedInventory,

      pagination: {
        page: safePage,
        limit,
        totalItems,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1,
      },

      filters: {
        search,
        category,
        stockLevel,
        minPrice,
        maxPrice,
      },

      sorting: {
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error(
      "Inventory API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch inventory data",
      },
      {
        status: 500,
      }
    );
  }
}