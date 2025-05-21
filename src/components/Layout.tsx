
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";

const Layout = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah user sudah login
    const userData = sessionStorage.getItem("currentUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-blue"></div>
      </div>
    );
  }

  // Jika belum login, redirect ke halaman login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header user={user} />
      <NavigationBar role={user.role} />
      <main className="flex-1 container mx-auto px-4 pb-8">
        <Outlet context={{ user }} />
      </main>
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          © 2025 Peduli Kesehatan Anak SD - Semua hak dilindungi
        </div>
      </footer>
    </div>
  );
};

export default Layout;
