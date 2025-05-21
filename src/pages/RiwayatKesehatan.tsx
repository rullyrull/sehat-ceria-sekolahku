import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";

// Import components
import HealthSummary from "@/components/health/HealthSummary";
import TabDailyData from "@/components/health/TabDailyData";
import TabKeluhan from "@/components/health/TabKeluhan";
import TabPanduanKesehatan from "@/components/health/TabPanduanKesehatan";

// Import data
import { dataKesehatan, keluhanKesehatan, kategoriPanduan, panduanKesehatan } from "@/components/health/data";

const RiwayatKesehatan = () => {
  const { user } = useOutletContext<{ user: any }>();
  const [selectedKategori, setSelectedKategori] = useState<string>("nutrisi");
  const [filteredPanduan, setFilteredPanduan] = useState<any>(panduanKesehatan[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulasi loading data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    const panduan = panduanKesehatan.find(p => p.id === selectedKategori);
    if (panduan) {
      setFilteredPanduan(panduan);
    }
  }, [selectedKategori]);

  // Filter data kesehatan berdasarkan pencarian
  const filteredDataKesehatan = dataKesehatan.filter(data => {
    if (!searchQuery) return true;
    return (
      data.tanggal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Kesehatan metrics
  const latestData = dataKesehatan[0];
  
  // Cek apakah ada peningkatan berat badan
  const weightChange = dataKesehatan.length > 1 
    ? parseFloat(dataKesehatan[0].beratBadan) - parseFloat(dataKesehatan[1].beratBadan)
    : 0;
  
  // Cek apakah ada peningkatan tinggi badan
  const heightChange = dataKesehatan.length > 1 
    ? parseFloat(dataKesehatan[0].tinggiBadan) - parseFloat(dataKesehatan[1].tinggiBadan)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-2xl font-bold">Riwayat Kesehatan</h1>
        
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Input
            placeholder="Cari berdasarkan tanggal atau status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>
      
      {/* Ringkasan kesehatan */}
      {!isLoading && dataKesehatan.length > 0 && (
        <HealthSummary 
          latestData={latestData}
          weightChange={weightChange}
          heightChange={heightChange}
        />
      )}
      
      <Tabs defaultValue="data-harian" className="space-y-4">
        <TabsList className="grid w-full md:w-[500px] grid-cols-3">
          <TabsTrigger value="data-harian">Data Harian</TabsTrigger>
          <TabsTrigger value="keluhan">Keluhan</TabsTrigger>
          <TabsTrigger value="panduan">Panduan Kesehatan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-harian" className="space-y-4">
          <TabDailyData 
            isLoading={isLoading} 
            filteredData={filteredDataKesehatan} 
          />
        </TabsContent>
        
        <TabsContent value="keluhan" className="space-y-4">
          <TabKeluhan 
            keluhanData={keluhanKesehatan} 
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="panduan" className="space-y-4">
          <TabPanduanKesehatan
            categories={kategoriPanduan}
            selectedKategori={selectedKategori}
            setSelectedKategori={setSelectedKategori}
            filteredPanduan={filteredPanduan}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiwayatKesehatan;
