
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah user sudah login
    const userData = sessionStorage.getItem("currentUser");
    if (userData) {
      navigate("/dashboard");
    }
    setLoading(false);
  }, [navigate]);

  const handleLogin = (user: any) => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-blue/10 to-health-green/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <AuthForm onLogin={handleLogin} />
      </div>
      
      <div className="max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-2 text-health-blue">Tentang Aplikasi</h2>
        <p className="text-gray-600 mb-4">
          Portal Peduli Kesehatan Anak SD adalah platform pemantauan kesehatan terpadu untuk siswa sekolah dasar.
          Dengan fitur pencatatan data kesehatan harian dan komunikasi dua arah antara siswa dan guru,
          kami membantu menciptakan lingkungan belajar yang lebih sehat.
        </p>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-health-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-health-yellow">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-bold mb-2">Siswa</h3>
          <p className="text-sm text-gray-500">
            Input data kesehatan harian seperti suhu tubuh, berat badan, dan keluhan kesehatan.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-health-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-health-blue">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-bold mb-2">Guru</h3>
          <p className="text-sm text-gray-500">
            Monitoring kesehatan siswa, melihat keluhan dan memberikan tanggapan secara real-time.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-health-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-health-green">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-bold mb-2">Admin</h3>
          <p className="text-sm text-gray-500">
            Manajemen akun pengguna dan akses ke seluruh data kesehatan siswa di sekolah.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
