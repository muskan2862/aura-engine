import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-64">
        <Header />

        <main className="min-h-screen pt-16">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}