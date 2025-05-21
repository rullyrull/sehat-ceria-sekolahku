
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

const RiwayatKesehatan = () => {
  const { user } = useOutletContext<{ user: any }>();

  const getStatusBadge = (status: string) => {
    if (status === "normal") {
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Normal</Badge>;
    } else if (status === "perhatian") {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Perlu Perhatian</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Perlu Penanganan</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Riwayat Kesehatan</h1>
      
      <Tabs defaultValue="data-harian" className="space-y-4">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="data-harian">Data Harian</TabsTrigger>
          <TabsTrigger value="keluhan">Keluhan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-harian" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catatan Kesehatan Harian</CardTitle>
              <CardDescription>
                Riwayat data kesehatan yang telah kamu input sebelumnya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataKesehatan.map((item, index) => (
                  <div key={index} className="border rounded-md p-4 space-y-3">
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
                      <div>
                        <p className="text-sm text-gray-500">Suhu Tubuh</p>
                        <p className="font-medium">{item.suhu}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Berat Badan</p>
                        <p className="font-medium">{item.beratBadan}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tinggi Badan</p>
                        <p className="font-medium">{item.tinggiBadan}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Perasaan</p>
                        <p className="font-medium">{item.perasaan}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keluhan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Keluhan</CardTitle>
              <CardDescription>
                Keluhan kesehatan yang telah kamu laporkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {keluhanKesehatan.map((keluhan, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">
                          {keluhan.jenisKeluhan}
                        </h3>
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
                        <p>{keluhan.deskripsi}</p>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiwayatKesehatan;
