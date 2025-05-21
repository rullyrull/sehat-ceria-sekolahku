
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationBarProps {
  role: string;
}

const NavigationBar = ({ role }: NavigationBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = {
    siswa: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Input Data Kesehatan", path: "/input-kesehatan" },
      { name: "Riwayat Kesehatan", path: "/riwayat" },
    ],
    guru: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Data Kesehatan Siswa", path: "/data-siswa" },
      { name: "Keluhan Siswa", path: "/keluhan-siswa" },
    ],
    admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manajemen Akun", path: "/manajemen-akun" },
      { name: "Data Kesehatan", path: "/rekap-kesehatan" },
      { name: "Konfigurasi", path: "/konfigurasi" },
    ],
  };

  const items = navigationItems[role as keyof typeof navigationItems] || [];

  return (
    <nav className="bg-white shadow-sm mb-6">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 overflow-x-auto">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors hover:text-health-blue",
                currentPath === item.path
                  ? "text-health-blue border-b-2 border-health-blue"
                  : "text-gray-600"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
