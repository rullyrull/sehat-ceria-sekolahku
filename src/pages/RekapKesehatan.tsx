
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";

// Data demo untuk grafik
const statistikBulanan = {
  "2025-05": {
    totalData: 560,
    totalSuhu: {
      normal: 520,
      peringatan: 30,
      tinggi: 10
    },
    totalKehadiran: 540,
    kelas: {
      "6A": { total: 120, sakit: 5, normal: 115 },
      "6B": { total: 110, sakit: 3, normal: 107 },
      "5A": { total: 115, sakit: 4, normal: 111 },
      "5B": { total: 108, sakit: 6, normal: 102 },
      "4A": { total: 112, sakit: 2, normal: 110 },
    }
  }
};

// Data untuk tabel siswa yang perlu perhatian
const siswaPerluPerhatian = [
  { id: 1, nama: "Deni Pratama", kelas: "6A", suhu: "38.2", keluhan: "Demam, sakit kepala", tanggal: "2025-05-21" },
  { id: 2, nama: "Rini Wulandari", kelas: "5B", suhu: "37.8", keluhan: "Batuk, pilek", tanggal: "2025-05-21" },
  { id: 3, nama: "Ahmad Rizki", kelas: "6B", suhu: "38.0", keluhan: "Sakit perut", tanggal: "2025-05-21" },
  { id: 4, nama: "Luna Maya", kelas: "4A", suhu: "37.6", keluhan: "Pusing", tanggal: "2025-05-20" },
  { id: 5, nama: "Budi Santoso", kelas: "6A", suhu: "37.9", keluhan: "Demam ringan", tanggal: "2025-05-20" },
];

// Data untuk tabel rekap
const dataRekap = [
  { kelas: "6A", totalSiswa: 28, hadir: 27, tidakHadir: 1, sehat: 25, perluPerhatian: 2, tanggal: "2025-05-21" },
  { kelas: "6B", totalSiswa: 30, hadir: 29, tidakHadir: 1, sehat: 28, perluPerhatian: 1, tanggal: "2025-05-21" },
  { kelas: "5A", totalSiswa: 26, hadir: 25, tidakHadir: 1, sehat: 24, perluPerhatian: 1, tanggal: "2025-05-21" },
  { kelas: "5B", totalSiswa: 28, hadir: 26, tidakHadir: 2, sehat: 24, perluPerhatian: 2, tanggal: "2025-05-21" },
  { kelas: "4A", totalSiswa: 25, hadir: 24, tidakHadir: 1, sehat: 23, perluPerhatian: 1, tanggal: "2025-05-21" },
  { kelas: "4B", totalSiswa: 27, hadir: 26, tidakHadir: 1, sehat: 26, perluPerhatian: 0, tanggal: "2025-05-21" },
];

const RekapKesehatan = () => {
  const [selectedTab, setSelectedTab] = useState("ringkasan");
  const [selectedKelas, setSelectedKelas] = useState<string>("semua");
  const [selectedTanggal, setSelectedTanggal] = useState(new Date().toISOString().substr(0, 10));
  
  const bulanIni = "2025-05";
  const dataBulanIni = statistikBulanan[bulanIni];
  
  const totalSiswaSehat = dataRekap.reduce((acc, current) => acc + current.sehat, 0);
  const totalSiswaPerhatian = dataRekap.reduce((acc, current) => acc + current.perluPerhatian, 0);
  const totalSiswa = dataRekap.reduce((acc, current) => acc + current.totalSiswa, 0);
  
  const persentaseSehat = Math.round((totalSiswaSehat / totalSiswa) * 100);
  
  // Filter data rekap berdasarkan kelas
  const filteredRekap = selectedKelas === "semua" 
    ? dataRekap 
    : dataRekap.filter(data => data.kelas === selectedKelas);
  
  // Filter siswa perlu perhatian berdasarkan kelas
  const filteredSiswaPerhatian = selectedKelas === "semua"
    ? siswaPerluPerhatian
    : siswaPerluPerhatian.filter(siswa => siswa.kelas === selectedKelas);
  
  const handleExport = () => {
    toast.success("Data berhasil diekspor ke Excel!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rekap Data Kesehatan</h1>
        
        <Button variant="outline" onClick={handleExport}>
          Ekspor Data Excel
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="text-sm font-medium mb-1 block">Kelas</label>
          <Select value={selectedKelas} onValueChange={setSelectedKelas}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Semua Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Kelas</SelectItem>
              <SelectItem value="6A">Kelas 6A</SelectItem>
              <SelectItem value="6B">Kelas 6B</SelectItem>
              <SelectItem value="5A">Kelas 5A</SelectItem>
              <SelectItem value="5B">Kelas 5B</SelectItem>
              <SelectItem value="4A">Kelas 4A</SelectItem>
              <SelectItem value="4B">Kelas 4B</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Tanggal</label>
          <Input
            type="date"
            value={selectedTanggal}
            onChange={(e) => setSelectedTanggal(e.target.value)}
            className="w-[180px]"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Data Kesehatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dataBulanIni.totalData}</p>
            <p className="text-sm text-gray-500">Mei 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Status Kesehatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{persentaseSehat}% Sehat</p>
            <p className="text-sm text-gray-500">{totalSiswaPerhatian} Siswa Perlu Perhatian</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalSiswa}</p>
            <p className="text-sm text-gray-500">Dari 6 Kelas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Kehadiran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{dataBulanIni.totalKehadiran}</p>
            <p className="text-sm text-gray-500">Kehadiran Bulan Ini</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <div className="border-b px-6 py-2">
              <TabsList>
                <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
                <TabsTrigger value="siswa-perhatian">Siswa Perlu Perhatian</TabsTrigger>
                <TabsTrigger value="rekap-kelas">Rekap Per Kelas</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="ringkasan" className="px-6 py-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Statistik Kesehatan Bulan Ini</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="bg-green-50 py-3">
                        <CardTitle className="text-base text-green-800">Suhu Normal</CardTitle>
                      </CardHeader>
                      <CardContent className="py-3">
                        <p className="text-2xl font-bold text-green-600">{dataBulanIni.totalSuhu.normal}</p>
                        <p className="text-sm text-gray-500">Siswa</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-yellow-50 py-3">
                        <CardTitle className="text-base text-yellow-800">Suhu Peringatan</CardTitle>
                      </CardHeader>
                      <CardContent className="py-3">
                        <p className="text-2xl font-bold text-yellow-600">{dataBulanIni.totalSuhu.peringatan}</p>
                        <p className="text-sm text-gray-500">Siswa</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-red-50 py-3">
                        <CardTitle className="text-base text-red-800">Suhu Tinggi</CardTitle>
                      </CardHeader>
                      <CardContent className="py-3">
                        <p className="text-2xl font-bold text-red-600">{dataBulanIni.totalSuhu.tinggi}</p>
                        <p className="text-sm text-gray-500">Siswa</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Status Per Kelas</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(dataBulanIni.kelas).map(([kelas, data]) => (
                      <Card key={kelas}>
                        <CardHeader className="py-3 bg-gray-50">
                          <CardTitle className="text-base">Kelas {kelas}</CardTitle>
                        </CardHeader>
                        <CardContent className="py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500">Total Siswa</p>
                              <p className="text-xl font-bold">{data.total}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Status Normal</p>
                              <p className="text-xl font-bold text-green-600">{data.normal}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Perlu Perhatian</p>
                              <p className="text-xl font-bold text-yellow-600">{data.sakit}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="siswa-perhatian" className="px-6 py-4">
              <h3 className="text-lg font-semibold mb-4">Daftar Siswa Perlu Perhatian</h3>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Suhu (°C)</TableHead>
                      <TableHead>Keluhan</TableHead>
                      <TableHead>Tanggal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSiswaPerhatian.map((siswa) => (
                      <TableRow key={siswa.id}>
                        <TableCell className="font-medium">{siswa.nama}</TableCell>
                        <TableCell>{siswa.kelas}</TableCell>
                        <TableCell className="text-red-600">{siswa.suhu}</TableCell>
                        <TableCell>{siswa.keluhan}</TableCell>
                        <TableCell>{siswa.tanggal}</TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredSiswaPerhatian.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Tidak ada siswa yang perlu perhatian
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="rekap-kelas" className="px-6 py-4">
              <h3 className="text-lg font-semibold mb-4">Rekap Data Per Kelas</h3>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Total Siswa</TableHead>
                      <TableHead>Hadir</TableHead>
                      <TableHead>Tidak Hadir</TableHead>
                      <TableHead>Sehat</TableHead>
                      <TableHead>Perlu Perhatian</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRekap.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{data.kelas}</TableCell>
                        <TableCell>{data.totalSiswa}</TableCell>
                        <TableCell>{data.hadir}</TableCell>
                        <TableCell>{data.tidakHadir}</TableCell>
                        <TableCell>{data.sehat}</TableCell>
                        <TableCell>{data.perluPerhatian}</TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredRekap.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Tidak ada data yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RekapKesehatan;
