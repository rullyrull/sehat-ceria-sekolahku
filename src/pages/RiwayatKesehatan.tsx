import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Thermometer, Weight, Ruler, HeartPulse, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Data untuk demo
const dataKesehatan = [
  { 
    tanggal: "2025-05-21", 
    suhu: "36.5°C", 
    beratBadan: "38.5 kg", 
    tinggiBadan: "142 cm", 
    perasaan: "Baik",
    status: "normal" 
  },
  { 
    tanggal: "2025-05-20", 
    suhu: "36.7°C", 
    beratBadan: "38.5 kg", 
    tinggiBadan: "142 cm", 
    perasaan: "Biasa",
    status: "normal" 
  },
  { 
    tanggal: "2025-05-19", 
    suhu: "37.2°C", 
    beratBadan: "38.5 kg", 
    tinggiBadan: "141.8 cm", 
    perasaan: "Kurang Baik",
    status: "perhatian" 
  },
  { 
    tanggal: "2025-05-18", 
    suhu: "36.6°C", 
    beratBadan: "38.5 kg", 
    tinggiBadan: "141.8 cm", 
    perasaan: "Baik",
    status: "normal" 
  },
];

const keluhanKesehatan = [
  { 
    tanggal: "2025-05-20",
    jenisKeluhan: "Sakit Kepala", 
    deskripsi: "Kepala terasa pusing sejak pagi, terutama saat membaca.", 
    status: "dibalas",
    balasan: {
      dari: "Bu Siti Aminah",
      pesan: "Istirahat yang cukup dan minum air putih yang banyak. Jika besok masih terasa, akan saya informasikan ke orang tua.",
      tanggal: "2025-05-20"
    }
  },
  { 
    tanggal: "2025-05-10",
    jenisKeluhan: "Sakit Perut", 
    deskripsi: "Perut terasa mual dan sedikit sakit sejak makan siang.", 
    status: "dibalas",
    balasan: {
      dari: "Bu Siti Aminah",
      pesan: "Sebaiknya segera ke UKS untuk diperiksa. Saya sudah menginformasikan ke petugas UKS.",
      tanggal: "2025-05-10"
    }
  },
];

const kategoriPanduan = [
  { id: "nutrisi", nama: "Nutrisi Seimbang", icon: "🍎" },
  { id: "aktivitas", nama: "Aktivitas Fisik", icon: "🏃‍♂️" },
  { id: "tidur", nama: "Pola Tidur", icon: "😴" },
  { id: "kebersihan", nama: "Kebersihan Diri", icon: "🧼" },
  { id: "mata", nama: "Kesehatan Mata", icon: "👁️" },
  { id: "gigi", nama: "Kesehatan Gigi", icon: "😁" }
];

const panduanKesehatan = [
  {
    id: "nutrisi",
    judul: "Panduan Nutrisi Seimbang",
    icon: "🍎",
    deskripsi: "Pola makan yang seimbang sangat penting untuk tumbuh kembang anak.",
    tips: [
      "Makan 3 kali sehari dengan porsi seimbang",
      "Pastikan ada sayur dan buah setiap hari",
      "Batasi makanan cepat saji dan minuman manis",
      "Minum air putih minimal 8 gelas sehari",
      "Sarapan pagi sangat penting untuk konsentrasi belajar"
    ]
  },
  {
    id: "aktivitas",
    judul: "Panduan Aktivitas Fisik",
    icon: "🏃‍♂️",
    deskripsi: "Aktifitas fisik yang cukup membantu pertumbuhan dan kesehatan tubuh.",
    tips: [
      "Lakukan aktivitas fisik minimal 60 menit setiap hari",
      "Pilih aktivitas yang menyenangkan seperti bermain bola atau bersepeda",
      "Kurangi waktu di depan layar (TV, gadget) maksimal 2 jam per hari",
      "Ajak teman untuk bermain di luar ruangan",
      "Ikuti kegiatan ekstrakurikuler olahraga di sekolah"
    ]
  }
];

const RiwayatKesehatan = () => {
  const { user } = useOutletContext<{ user: any }>();
  const [selectedKategori, setSelectedKategori] = useState<string>("nutrisi");
  const [filteredPanduan, setFilteredPanduan] = useState<any>(panduanKesehatan[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHealthMetrics, setShowHealthMetrics] = useState(false);
  
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

  const getStatusBadge = (status: string) => {
    if (status === "normal") {
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Normal</Badge>;
    } else if (status === "perhatian") {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Perlu Perhatian</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Perlu Penanganan</Badge>;
    }
  };

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
        <Card className="bg-gradient-to-r from-health-blue/10 to-blue-50 border-health-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-health-blue" />
              Ringkasan Kesehatan Terkini
            </CardTitle>
            <CardDescription>
              Data kesehatan terakhir yang direkam pada {new Date(dataKesehatan[0].tanggal).toLocaleDateString("id-ID", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Thermometer className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="font-medium text-gray-700">Suhu Tubuh</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{latestData.suhu}</p>
                <p className="text-xs text-gray-500 mt-1">Normal: 36.1°C - 37.2°C</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Weight className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="font-medium text-gray-700">Berat Badan</h3>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold text-gray-900">{latestData.beratBadan}</p>
                  {weightChange !== 0 && (
                    <span className={`text-xs ${weightChange > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                      {weightChange > 0 ? `+${weightChange} kg` : `${weightChange} kg`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Ideal untuk usia 10-12 tahun: 35-55 kg</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Ruler className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-medium text-gray-700">Tinggi Badan</h3>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold text-gray-900">{latestData.tinggiBadan}</p>
                  {heightChange !== 0 && (
                    <span className={`text-xs ${heightChange > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                      {heightChange > 0 ? `+${heightChange} cm` : `${heightChange} cm`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Ideal untuk usia 10-12 tahun: 138-162 cm</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                  </div>
                  <h3 className="font-medium text-gray-700">Perasaan</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{latestData.perasaan}</p>
                <p className="text-xs text-gray-500 mt-1">Penting untuk kesehatan mental</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="data-harian" className="space-y-4">
        <TabsList className="grid w-full md:w-[500px] grid-cols-3">
          <TabsTrigger value="data-harian">Data Harian</TabsTrigger>
          <TabsTrigger value="keluhan">Keluhan</TabsTrigger>
          <TabsTrigger value="panduan">Panduan Kesehatan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-harian" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-health-blue" />
                Catatan Kesehatan Harian
              </CardTitle>
              <CardDescription>
                Riwayat data kesehatan yang telah kamu input sebelumnya
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-blue"></div>
                </div>
              ) : filteredDataKesehatan.length > 0 ? (
                <div className="space-y-4">
                  {filteredDataKesehatan.map((item, index) => (
                    <div key={index} className="border rounded-md p-4 space-y-3 hover:border-health-blue/50 hover:shadow-sm transition-all">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        {getStatusBadge(item.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Suhu Tubuh</p>
                            <p className="font-medium">{item.suhu}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Weight className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-500">Berat Badan</p>
                            <p className="font-medium">{item.beratBadan}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Tinggi Badan</p>
                            <p className="font-medium">{item.tinggiBadan}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                          <div>
                            <p className="text-sm text-gray-500">Perasaan</p>
                            <p className="font-medium">{item.perasaan}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle>Tidak ada data</AlertTitle>
                  <AlertDescription>
                    Belum ada data kesehatan yang sesuai dengan pencarian Anda.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keluhan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-health-blue" />
                Riwayat Keluhan
              </CardTitle>
              <CardDescription>
                Keluhan kesehatan yang telah kamu laporkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-blue"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {keluhanKesehatan.map((keluhan, index) => (
                    <div key={index} className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-yellow-100 p-1 rounded-full">
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            </div>
                            <h3 className="font-medium">
                              {keluhan.jenisKeluhan}
                            </h3>
                          </div>
                          <Badge variant="outline" className={keluhan.status === "dibalas" 
                            ? "bg-green-50 text-green-700 hover:bg-green-50 border-green-200" 
                            : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200"
                          }>
                            {keluhan.status === "dibalas" ? "Dibalas" : "Menunggu Balasan"}
                          </Badge>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            {new Date(keluhan.tanggal).toLocaleDateString("id-ID", {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-gray-700">{keluhan.deskripsi}</p>
                        </div>
                      </div>
                      
                      {keluhan.balasan && (
                        <div className="bg-blue-50 p-4 border-t">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-200 text-blue-700">
                                {keluhan.balasan.dari.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{keluhan.balasan.dari}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(keluhan.balasan.tanggal).toLocaleDateString("id-ID", {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <p className="text-blue-800">{keluhan.balasan.pesan}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {keluhanKesehatan.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-gray-500">Belum ada keluhan yang dilaporkan</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="panduan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-health-blue"><path d="M3 5v14"></path><path d="M21 12H7"></path><path d="m15 18 6-6-6-6"></path></svg>
                Panduan Kesehatan
              </CardTitle>
              <CardDescription>
                Kumpulan informasi dan tips untuk menjaga kesehatan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full md:w-1/3 space-y-2">
                  {kategoriPanduan.map((kategori) => (
                    <button
                      key={kategori.id}
                      className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 transition-colors
                        ${selectedKategori === kategori.id 
                          ? 'bg-health-blue/10 text-health-blue border-l-4 border-health-blue' 
                          : 'hover:bg-gray-100'
                        }`}
                      onClick={() => setSelectedKategori(kategori.id)}
                    >
                      <span className="text-xl">{kategori.icon}</span>
                      <span className="font-medium">{kategori.nama}</span>
                    </button>
                  ))}
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">{filteredPanduan.icon}</div>
                      <h3 className="text-xl font-bold text-blue-800">{filteredPanduan.judul}</h3>
                    </div>
                    <p className="text-blue-700 mb-4">{filteredPanduan.deskripsi}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-800">Tips:</h4>
                      <ul className="space-y-2">
                        {filteredPanduan.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-blue-700">
                            <svg className="h-5 w-5 mt-0.5 text-health-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Kita perlu menentukan MessageCircle karena tidak diimpor di atas
const MessageCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default RiwayatKesehatan;
