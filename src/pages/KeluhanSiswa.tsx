
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { AlertCircle, ThumbsUp, Stethoscope, Thermometer, MessageCircle, Clock, UserCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Data keluhan untuk demo
const keluhanSiswa = [
  {
    id: 1,
    namaSiswa: "Budi Santoso",
    kelas: "6A",
    tanggal: "2025-05-21",
    jenisKeluhan: "Sakit Perut",
    deskripsi: "Perut terasa mual dan sedikit sakit sejak setelah istirahat. Rasanya ingin muntah.",
    status: "belum-dibalas",
    prioritas: "sedang"
  },
  {
    id: 2,
    namaSiswa: "Eka Putri",
    kelas: "6A",
    tanggal: "2025-05-21",
    jenisKeluhan: "Sakit Kepala",
    deskripsi: "Kepala terasa pusing sejak pagi, terutama di bagian depan. Rasanya berat dan sulit berkonsentrasi.",
    status: "belum-dibalas",
    prioritas: "tinggi"
  },
  {
    id: 3,
    namaSiswa: "Deni Pratama",
    kelas: "6A",
    tanggal: "2025-05-20",
    jenisKeluhan: "Demam",
    deskripsi: "Badan terasa panas dan lemas sejak semalam. Sulit untuk berkonsentrasi selama pelajaran.",
    status: "sudah-dibalas",
    balasan: "Saya sudah menghubungi orang tuamu untuk menjemput. Istirahatlah di rumah sampai kondisimu membaik.",
    prioritas: "tinggi"
  },
];

const kelasTersedia = ["6A", "6B", "5A", "5B", "4A", "4B"];
const kategoriKeluhan = [
  "Demam", 
  "Sakit Kepala", 
  "Sakit Perut", 
  "Mual", 
  "Batuk", 
  "Pilek", 
  "Luka", 
  "Alergi", 
  "Sakit Gigi", 
  "Mata"
];

const KeluhanSiswa = () => {
  const { user } = useOutletContext<{ user: any }>();
  const [selectedKelas, setSelectedKelas] = useState<string>(user?.teachClass || "6A");
  const [searchQuery, setSearchQuery] = useState("");
  const [balasanText, setBalasanText] = useState<{[key: number]: string}>({});
  const [expandedKeluhan, setExpandedKeluhan] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState("semua");
  const [selectedPrioritas, setSelectedPrioritas] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    belumDibalas: 0,
    sudahDibalas: 0,
    prioritasTinggi: 0
  });
  
  useEffect(() => {
    // Di sini kita akan menghitung statistik berdasarkan data keluhanSiswa
    // Pada implementasi nyata, ini akan mengambil data dari Supabase
    const filteredKeluhan = keluhanSiswa.filter(keluhan => keluhan.kelas === selectedKelas);
    setStats({
      total: filteredKeluhan.length,
      belumDibalas: filteredKeluhan.filter(k => k.status === "belum-dibalas").length,
      sudahDibalas: filteredKeluhan.filter(k => k.status === "sudah-dibalas").length,
      prioritasTinggi: filteredKeluhan.filter(k => k.prioritas === "tinggi").length
    });
  }, [selectedKelas]);

  // Filter keluhan berdasarkan kelas guru, pencarian, tab dan prioritas
  const filteredKeluhan = keluhanSiswa
    .filter(keluhan => keluhan.kelas === selectedKelas)
    .filter(keluhan => 
      keluhan.namaSiswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      keluhan.jenisKeluhan.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(keluhan => {
      if (selectedTab === "semua") return true;
      if (selectedTab === "belum-dibalas") return keluhan.status === "belum-dibalas";
      if (selectedTab === "sudah-dibalas") return keluhan.status === "sudah-dibalas";
      return true;
    })
    .filter(keluhan => {
      if (!selectedPrioritas) return true;
      return keluhan.prioritas === selectedPrioritas;
    });
  
  const handleBalasanChange = (keluhanId: number, value: string) => {
    setBalasanText({
      ...balasanText,
      [keluhanId]: value
    });
  };
  
  const handleSubmitBalasan = (keluhanId: number) => {
    if (!balasanText[keluhanId] || balasanText[keluhanId].trim() === "") {
      toast.error("Balasan tidak boleh kosong!");
      return;
    }
    
    setLoading(true);
    
    // Simulasi delay untuk demo
    setTimeout(() => {
      // Logika untuk menyimpan balasan
      // Dalam aplikasi nyata, ini akan mengirim data ke Supabase
      toast.success("Balasan berhasil dikirim!");
      setBalasanText({
        ...balasanText,
        [keluhanId]: ""
      });
      setExpandedKeluhan(null);
      setLoading(false);
    }, 1000);
  };
  
  const toggleExpand = (keluhanId: number) => {
    setExpandedKeluhan(expandedKeluhan === keluhanId ? null : keluhanId);
  };

  const getPrioritasBadge = (prioritas: string) => {
    if (prioritas === "tinggi") {
      return <Badge className="bg-red-500 text-white">Prioritas Tinggi</Badge>;
    } else if (prioritas === "sedang") {
      return <Badge className="bg-yellow-500 text-white">Prioritas Sedang</Badge>;
    } else {
      return <Badge className="bg-green-500 text-white">Prioritas Rendah</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Keluhan Kesehatan Siswa</h1>
        
        <div className="flex gap-2">
          <Select value={selectedKelas} onValueChange={setSelectedKelas}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Pilih Kelas" />
            </SelectTrigger>
            <SelectContent>
              {kelasTersedia.map(kelas => (
                <SelectItem key={kelas} value={kelas}>Kelas {kelas}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedPrioritas || ""} onValueChange={(val) => setSelectedPrioritas(val || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Prioritas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua Prioritas</SelectItem>
              <SelectItem value="tinggi">Prioritas Tinggi</SelectItem>
              <SelectItem value="sedang">Prioritas Sedang</SelectItem>
              <SelectItem value="rendah">Prioritas Rendah</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Keluhan</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Belum Dibalas</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.belumDibalas}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Sudah Dibalas</p>
                <p className="text-2xl font-bold text-green-700">{stats.sudahDibalas}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ThumbsUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Prioritas Tinggi</p>
                <p className="text-2xl font-bold text-red-700">{stats.prioritasTinggi}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Form pencarian */}
      <div className="relative">
        <Input
          placeholder="Cari berdasarkan nama siswa atau jenis keluhan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>
      
      {/* Tab Filter */}
      <Tabs defaultValue="semua" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="belum-dibalas">Belum Dibalas</TabsTrigger>
          <TabsTrigger value="sudah-dibalas">Sudah Dibalas</TabsTrigger>
        </TabsList>
        
        {/* Konten Keluhan */}
        <TabsContent value="semua" className="space-y-6 mt-4">
          {filteredKeluhan.length > 0 ? (
            filteredKeluhan.map(keluhan => (
              <KeluhanCard 
                key={keluhan.id}
                keluhan={keluhan}
                toggleExpand={toggleExpand}
                expandedKeluhan={expandedKeluhan}
                balasanText={balasanText}
                handleBalasanChange={handleBalasanChange}
                handleSubmitBalasan={handleSubmitBalasan}
                getPrioritasBadge={getPrioritasBadge}
                loading={loading}
              />
            ))
          ) : (
            <Alert className="bg-blue-50 border-blue-200">
              <Stethoscope className="h-4 w-4 text-blue-600" />
              <AlertTitle>Tidak Ada Keluhan</AlertTitle>
              <AlertDescription>
                Tidak ada keluhan siswa yang sesuai dengan filter yang Anda pilih.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        
        <TabsContent value="belum-dibalas" className="space-y-6 mt-4">
          {filteredKeluhan.length > 0 ? (
            filteredKeluhan.map(keluhan => (
              <KeluhanCard 
                key={keluhan.id}
                keluhan={keluhan}
                toggleExpand={toggleExpand}
                expandedKeluhan={expandedKeluhan}
                balasanText={balasanText}
                handleBalasanChange={handleBalasanChange}
                handleSubmitBalasan={handleSubmitBalasan}
                getPrioritasBadge={getPrioritasBadge}
                loading={loading}
              />
            ))
          ) : (
            <Alert className="bg-blue-50 border-blue-200">
              <Stethoscope className="h-4 w-4 text-blue-600" />
              <AlertTitle>Tidak Ada Keluhan</AlertTitle>
              <AlertDescription>
                Semua keluhan siswa sudah Anda balas. Kerja bagus!
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        
        <TabsContent value="sudah-dibalas" className="space-y-6 mt-4">
          {filteredKeluhan.length > 0 ? (
            filteredKeluhan.map(keluhan => (
              <KeluhanCard 
                key={keluhan.id}
                keluhan={keluhan}
                toggleExpand={toggleExpand}
                expandedKeluhan={expandedKeluhan}
                balasanText={balasanText}
                handleBalasanChange={handleBalasanChange}
                handleSubmitBalasan={handleSubmitBalasan}
                getPrioritasBadge={getPrioritasBadge}
                loading={loading}
              />
            ))
          ) : (
            <Alert className="bg-blue-50 border-blue-200">
              <Stethoscope className="h-4 w-4 text-blue-600" />
              <AlertTitle>Tidak Ada Keluhan</AlertTitle>
              <AlertDescription>
                Belum ada keluhan siswa yang sudah dibalas.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Panduan untuk membalas keluhan */}
      <Card className="bg-gradient-to-r from-health-blue/10 to-blue-50 border-health-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-health-blue">
            <Stethoscope className="h-5 w-5" />
            Panduan Merespon Keluhan Kesehatan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
              <h4 className="font-semibold text-health-blue mb-2">Yang Harus Dilakukan</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <div className="text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Prioritaskan keluhan dengan gejala berat atau berpotensi menular</span>
                </li>
                <li className="flex gap-2">
                  <div className="text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Hubungi orang tua untuk kasus yang memerlukan penanganan lebih lanjut</span>
                </li>
                <li className="flex gap-2">
                  <div className="text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Berikan instruksi yang jelas dan mudah dipahami oleh siswa</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
              <h4 className="font-semibold text-red-500 mb-2">Yang Tidak Boleh Dilakukan</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <div className="text-red-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span>Memberikan diagnosis medis tanpa konsultasi dengan tenaga kesehatan</span>
                </li>
                <li className="flex gap-2">
                  <div className="text-red-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span>Mengabaikan keluhan yang tampak ringan tanpa memberikan perhatian</span>
                </li>
                <li className="flex gap-2">
                  <div className="text-red-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span>Menunda respons pada keluhan yang prioritas tinggi</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Komponen Kartu Keluhan
interface KeluhanCardProps {
  keluhan: any;
  toggleExpand: (id: number) => void;
  expandedKeluhan: number | null;
  balasanText: {[key: number]: string};
  handleBalasanChange: (id: number, value: string) => void;
  handleSubmitBalasan: (id: number) => void;
  getPrioritasBadge: (prioritas: string) => React.ReactNode;
  loading: boolean;
}

const KeluhanCard = ({
  keluhan,
  toggleExpand,
  expandedKeluhan,
  balasanText,
  handleBalasanChange,
  handleSubmitBalasan,
  getPrioritasBadge,
  loading
}: KeluhanCardProps) => {
  return (
    <Card key={keluhan.id} className="overflow-hidden border-l-4 border-l-health-blue shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback className="bg-health-blue text-white">{keluhan.namaSiswa.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{keluhan.namaSiswa}</CardTitle>
              <p className="text-sm text-muted-foreground">Kelas {keluhan.kelas}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center">
            {getPrioritasBadge(keluhan.prioritas)}
            <Badge variant="outline" className={keluhan.status === "belum-dibalas" 
              ? "bg-yellow-50 text-yellow-700 border-yellow-200" 
              : "bg-green-50 text-green-700 border-green-200"
            }>
              {keluhan.status === "belum-dibalas" ? "Belum Dibalas" : "Sudah Dibalas"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Thermometer className="text-health-blue h-4 w-4" />
            <p className="font-medium text-health-blue">{keluhan.jenisKeluhan}</p>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {new Date(keluhan.tanggal).toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long',
              year: 'numeric' 
            })}
          </p>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-100 text-gray-700">
            <p>{keluhan.deskripsi}</p>
          </div>
        </div>
        
        {keluhan.balasan && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-green-600" />
              <p className="text-sm font-medium text-green-600">Balasan Anda:</p>
            </div>
            <div className="bg-green-50 p-3 rounded-md border border-green-100 text-green-800">
              {keluhan.balasan}
            </div>
          </div>
        )}
        
        {keluhan.status === "belum-dibalas" && (
          <div className={expandedKeluhan === keluhan.id ? "block" : "hidden"}>
            <div className="pt-4 border-t mt-4">
              <label htmlFor={`balasan-${keluhan.id}`} className="text-sm font-medium mb-1 block flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                Balasan
              </label>
              <Textarea
                id={`balasan-${keluhan.id}`}
                placeholder="Tulis balasan untuk keluhan siswa ini..."
                value={balasanText[keluhan.id] || ""}
                onChange={(e) => handleBalasanChange(keluhan.id, e.target.value)}
                className="mb-2 focus:border-health-blue"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => toggleExpand(keluhan.id)} disabled={loading}>
                  Batal
                </Button>
                <Button 
                  onClick={() => handleSubmitBalasan(keluhan.id)} 
                  className="bg-health-blue hover:bg-health-blue/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : "Kirim Balasan"}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {keluhan.status === "belum-dibalas" && expandedKeluhan !== keluhan.id && (
          <Button 
            variant="outline" 
            className="w-full border-health-blue text-health-blue hover:bg-health-blue/10"
            onClick={() => toggleExpand(keluhan.id)}
          >
            Balas Keluhan
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default KeluhanSiswa;
