
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import InputKesehatan from "./pages/InputKesehatan";
import RiwayatKesehatan from "./pages/RiwayatKesehatan";
import DataSiswa from "./pages/DataSiswa";
import KeluhanSiswa from "./pages/KeluhanSiswa";
import ManajemenAkun from "./pages/ManajemenAkun";
import RekapKesehatan from "./pages/RekapKesehatan";
import Konfigurasi from "./pages/Konfigurasi";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Rute untuk user yang sudah login */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Rute untuk siswa */}
            <Route path="/input-kesehatan" element={<InputKesehatan />} />
            <Route path="/riwayat" element={<RiwayatKesehatan />} />
            
            {/* Rute untuk guru */}
            <Route path="/data-siswa" element={<DataSiswa />} />
            <Route path="/keluhan-siswa" element={<KeluhanSiswa />} />
            
            {/* Rute untuk admin */}
            <Route path="/manajemen-akun" element={<ManajemenAkun />} />
            <Route path="/rekap-kesehatan" element={<RekapKesehatan />} />
            <Route path="/konfigurasi" element={<Konfigurasi />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
