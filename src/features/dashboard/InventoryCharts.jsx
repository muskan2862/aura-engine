"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";

const CATEGORY_COLORS = [
  "#2563eb",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
];

export default function InventoryCharts() {
  const [lowStockData, setLowStockData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/inventory/summary",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch inventory analytics"
          );
        }

        const result = await response.json();

        console.log(
          "SUMMARY API:",
          result
        );

        /*
         * =====================================
         * RESTOCK PRIORITY
         * =====================================
         *
         * IMPORTANT:
         * We use EXACTLY what the API returns.
         * No sorting.
         * No grouping.
         * No duplicate filtering.
         */

        const restock =
          result?.summary?.restockPriority;

        console.log(
          "API RESTOCK PRIORITY:",
          restock
        );

        if (Array.isArray(restock)) {
          const chartData = restock.map(
            (item, index) => ({
              id: item.id ?? index,
              name: String(
                item.name ?? "Unknown Product"
              ),
              stock: Number(
                item.stock ?? 0
              ),
            })
          );

          console.log(
            "CHART RESTOCK DATA:",
            chartData
          );

          setLowStockData(chartData);
        } else {
          setLowStockData([]);
        }

        /*
         * =====================================
         * CATEGORY DISTRIBUTION
         * =====================================
         */

        const distribution =
          result?.summary
            ?.categoryDistribution;

        if (Array.isArray(distribution)) {
          const chartCategories =
            distribution.map((item) => ({
              name: String(
                item.category ?? "Unknown"
              ),
              value: Number(
                item.value ?? 0
              ),
            }));

          setCategoryData(
            chartCategories
          );
        } else {
          setCategoryData([]);
        }
      } catch (error) {
        console.error(
          "Analytics Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  /*
   * =====================================
   * LOADING
   * =====================================
   */

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ChartCard
          title="Restock Priority"
          description="Top 10 products with the lowest stock levels"
        >
          <div className="flex h-90 items-center justify-center text-sm text-slate-400">
            Loading analytics...
          </div>
        </ChartCard>

        <ChartCard
          title="Portfolio Distribution"
          description="Inventory valuation by category"
        >
          <div className="flex h-90 items-center justify-center text-sm text-slate-400">
            Loading analytics...
          </div>
        </ChartCard>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {/* =====================================
          RESTOCK PRIORITY
      ===================================== */}

      <ChartCard
        title="Restock Priority"
        description="Top 10 products with the lowest stock levels"
      >
        <div className="h-90 w-full">
          {lowStockData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No restock data available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={lowStockData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  type="number"
                  allowDecimals={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={160}
                  tick={{
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value} units`,
                    "Stock Level",
                  ]}
                />

                <Bar
                  dataKey="stock"
                  name="Stock Level"
                  fill="#2563eb"
                  radius={[
                    0,
                    6,
                    6,
                    0,
                  ]}
                  barSize={18}
                  minPointSize={4}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </ChartCard>

      {/* =====================================
          PORTFOLIO DISTRIBUTION
      ===================================== */}

      <ChartCard
        title="Portfolio Distribution"
        description="Inventory valuation by category"
      >
        <div className="h-90 w-full">
          {categoryData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No category data available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} ${(
                      percent * 100
                    ).toFixed(0)}%`
                  }
                  labelLine
                >
                  {categoryData.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          CATEGORY_COLORS[
                            index %
                              CATEGORY_COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    Number(
                      value
                    ).toLocaleString(),
                    "Inventory Value",
                  ]}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </ChartCard>
    </div>
  );
}

function ChartCard({
  title,
  description,
  children,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}