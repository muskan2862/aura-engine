"use client";

import { useEffect, useMemo, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import InventoryFilters from "./InventoryFilters";
import { exportToCSV } from "@/utils/exportCsv";

const ITEMS_PER_PAGE = 50;

export default function InventoryTable() {
  // =========================
  // DATA
  // =========================
  const [inventory, setInventory] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // =========================
  // UI STATES
  // =========================
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // PAGINATION
  // =========================
  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // SEARCH
  // =========================
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // =========================
  // FILTERS
  // =========================
  const [category, setCategory] = useState("All");

  // null = no stock filter
  const [stockLevel, setStockLevel] = useState(null);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // =========================
  // SORTING
  // =========================
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // =========================
  // FETCH INVENTORY
  // =========================
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set("page", currentPage);
        params.set("limit", ITEMS_PER_PAGE);

        // Search
        if (debouncedSearch.trim()) {
          params.set("search", debouncedSearch.trim());
        }

        // Category
        if (category !== "All") {
          params.set("category", category);
        }

        // Stock
        if (stockLevel !== null) {
          params.set("stockLevel", stockLevel);
        }

        // Minimum price
        if (minPrice !== "") {
          params.set("minPrice", minPrice);
        }

        // Maximum price
        if (maxPrice !== "") {
          params.set("maxPrice", maxPrice);
        }

        // Sorting
        if (sortBy) {
          params.set("sortBy", sortBy);
          params.set("sortOrder", sortOrder);
        }

        const response = await fetch(
          `/api/inventory?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch inventory"
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message ||
              "Unable to load inventory"
          );
        }

        setInventory(result.data || []);

        // Pagination information from API
        setTotalItems(
          result.pagination?.totalItems || 0
        );

        setTotalPages(
          result.pagination?.totalPages || 1
        );
      } catch (err) {
        console.error(
          "Inventory fetch error:",
          err
        );

        setError(
          err.message ||
            "Something went wrong while loading inventory."
        );

        setInventory([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [
    currentPage,
    debouncedSearch,
    category,
    stockLevel,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  ]);

  // =========================
  // SEARCH
  // =========================
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  // =========================
  // CATEGORY
  // =========================
  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  // =========================
  // STOCK LEVEL
  // =========================
  const handleStockLevelChange = (value) => {
    setStockLevel(value);
    setCurrentPage(1);
  };

  // =========================
  // MIN PRICE
  // =========================
  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  // =========================
  // MAX PRICE
  // =========================
  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  // =========================
  // RESET FILTERS
  // =========================
  const handleResetFilters = () => {
    setCategory("All");
    setStockLevel(null);
    setMinPrice("");
    setMaxPrice("");
    setSearch("");

    setSortBy(null);
    setSortOrder("asc");

    setCurrentPage(1);
  };

  // =========================
  // SORTING
  // =========================
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((current) =>
        current === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }

    setCurrentPage(1);
  };

  // =========================
  // EXPORT CSV
  // =========================
  const handleExport = () => {
    if (!inventory.length) {
      return;
    }

    exportToCSV(
      inventory,
      `inventory-page-${currentPage}.csv`
    );
  };

  // =========================
  // DISPLAY RANGE
  // =========================
  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          ITEMS_PER_PAGE +
        1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    totalItems
  );

  // =========================
  // SORT ICON
  // =========================
  const getSortIcon = (column) => {
    if (sortBy !== column) {
      return "↕";
    }

    return sortOrder === "asc"
      ? "↑"
      : "↓";
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* ================= HEADER ================= */}
      <div className="border-b border-slate-200 px-6 py-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Title */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Inventory Catalog
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search, filter and manage your inventory
            </p>
          </div>

          {/* Search + Export */}
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

            {/* Search */}
            <div className="relative w-full sm:w-96">

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products, SKU or category..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>

            </div>

            {/* Export */}
            <button
              type="button"
              onClick={handleExport}
              disabled={
                loading ||
                inventory.length === 0
              }
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↓ Export CSV
            </button>

          </div>

        </div>

        {/* ================= FILTERS ================= */}
        <InventoryFilters
          category={category}
          setCategory={handleCategoryChange}
          stockLevel={stockLevel}
          setStockLevel={
            handleStockLevelChange
          }
          minPrice={minPrice}
          setMinPrice={
            handleMinPriceChange
          }
          maxPrice={maxPrice}
          setMaxPrice={
            handleMaxPriceChange
          }
          onReset={handleResetFilters}
        />

        {/* ================= RESULT COUNT ================= */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {startItem}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-slate-700">
              {endItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {totalItems.toLocaleString()}
            </span>{" "}
            results
          </p>

          <div className="w-fit rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
            50,000 SKUs
          </div>

        </div>

      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="border-b border-red-200 bg-red-50 px-6 py-4">

          <p className="text-sm font-medium text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              setCurrentPage(
                currentPage
              )
            }
            className="mt-2 text-xs font-semibold text-red-700 underline"
          >
            Try again
          </button>

        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="max-h-150 overflow-auto">

        <table className="w-full min-w-212.5 text-left">

          {/* Table Header */}
          <thead className="sticky top-0 z-10 bg-slate-50">

            <tr className="border-b border-slate-200">

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                SKU
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Product
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Stock
              </th>

              {/* Sortable Price */}
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">

                <button
                  type="button"
                  onClick={() =>
                    handleSort("price")
                  }
                  className="flex items-center gap-2 transition hover:text-blue-600"
                >
                  Price

                  <span className="text-sm">
                    {getSortIcon("price")}
                  </span>
                </button>

              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {/* Loading */}
            {loading ? (
              Array.from({
                length: 8,
              }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100"
                >

                  <td className="px-6 py-5">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="h-6 w-12 animate-pulse rounded-full bg-slate-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                  </td>

                </tr>
              ))
            ) : inventory.length > 0 ? (

              inventory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >

                  {/* SKU */}
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    {item.sku}
                  </td>

                  {/* Product */}
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {item.name}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {item.category}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.stock < 20
                          ? "bg-red-50 text-red-600"
                          : item.stock < 50
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {item.stock}
                    </span>

                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    $
                    {Number(
                      item.price
                    ).toFixed(2)}
                  </td>

                </tr>
              ))

            ) : (

              /* Empty State */
              <tr>

                <td
                  colSpan={5}
                  className="px-6 py-16 text-center"
                >

                  <div className="mx-auto max-w-sm">

                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                      📦
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      No inventory found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try changing your search or filters.
                    </p>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-slate-500">

          Page{" "}

          <span className="font-semibold text-slate-700">
            {currentPage}
          </span>

          {" "}of{" "}

          <span className="font-semibold text-slate-700">
            {totalPages}
          </span>

        </p>

        <div className="flex gap-2">

          {/* Previous */}
          <button
            type="button"
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.max(
                    page - 1,
                    1
                  )
              )
            }
            disabled={
              currentPage === 1 ||
              loading
            }
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.min(
                    page + 1,
                    totalPages
                  )
              )
            }
            disabled={
              currentPage ===
                totalPages ||
              loading
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}