const categories = [
  "Electronics",
  "Apparel",
  "Home & Office",
  "Accessories",
];

const productNames = [
  "Wireless Headphones",
  "USB-C Hub",
  "Laptop Stand",
  "Bluetooth Speaker",
  "Mechanical Keyboard",
  "Webcam HD",
  "Wireless Mouse",
  "Monitor Arm",
  "Power Bank",
  "Smart Watch",
];

const inventoryData = Array.from({ length: 50000 }, (_, index) => {
  const category = categories[index % categories.length];

  const productName =
    productNames[index % productNames.length];

  return {
    id: index + 1,
    sku: `SKU-${String(index + 1).padStart(6, "0")}`,
    name: `${productName} ${index + 1}`,
    category,
    stock: (index * 7) % 250,
    price: Number((19.99 + ((index * 13) % 1000)).toFixed(2)),
  };
});

export function getInventoryData() {
  return inventoryData;
}