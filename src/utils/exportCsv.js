export function exportToCSV(data, filename = "inventory.csv") {
  if (!data || data.length === 0) {
    return;
  }

  const headers = [
    "SKU",
    "Product",
    "Category",
    "Stock",
    "Price",
  ];

  const rows = data.map((item) => [
    item.sku,
    item.name,
    item.category,
    item.stock,
    item.price,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((value) => {
          const stringValue = String(value ?? "");

          // Escape quotes and commas correctly
          if (
            stringValue.includes(",") ||
            stringValue.includes('"') ||
            stringValue.includes("\n")
          ) {
            return `"${stringValue.replace(
              /"/g,
              '""'
            )}"`;
          }

          return stringValue;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}