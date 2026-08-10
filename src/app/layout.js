import "./globals.css";

export const metadata = {
  title: "Aura Enterprise Engine",
  description: "Enterprise Inventory Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}