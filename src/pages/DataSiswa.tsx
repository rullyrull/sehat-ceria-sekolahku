
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Data siswa untuk demo
const demoSiswa = [
  {
    id: 1,
    nama: "Andi Saputra",
    kelas: "6A",
    tanggal: "2025-05-21",
    suhu: "36.5",
    beratBadan: "38",
    tinggiBadan: "142",
    perasaan: "Baik",
    status: "normal"
  },
  {
    id: 2,
    nama: "Budi Santoso",
    kelas: "6A",
    tanggal: "2025-05-21",
    suhu: "37.2",
    beratBadan: "40",
    tinggiBadan: "145",
    perasaan: "Kurang Baik",
    status: "perhatian"
  },
  {
    id: 3,
    nama: "Cindy Aulia",
    kelas: "6A",
    tanggal: "2025-05-21",
    suhu: "36.7",
    beratBadan: "35",
    tinggiBadan: "138",
    perasaan: "Baik",
    status: "normal"
  },
  {
    id: 4,
    nama: "Deni Pratama",
    kelas: "6A",
    tanggal: "2025-05-21",
    suhu: "38.1",
    beratBadan: "42",
    tinggiBadan: "146",
    perasaan: "Kurang Baik",
    status: "perhatian"
  },
  {
    id: 5,
    nama: "Eka Putri",
    kelas: "6A",
    tanggal: "2025-05-21",
    suhu: "36.6",
    beratBadan: "37",
    tinggiBadan: "140",
    perasaan: "Baik",
    status: "normal"
  }
];

const kelasTersedia = ["6A", "6B", "5A", "5B", "4A", "4B"];

const DataSiswa = () => {
  const { user } = useOutletContext<{ user: any }>();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKelas, setSelectedKelas] = useState<string>(user?.teachClass || "6A");
  const [selectedTanggal, setSelectedTanggal] = useState(new Date().toISOString().substr(0, 10));

  useEffect(() => {
    // Filter data berdasarkan pencarian, kelas, dan tanggal
    // Dalam aplikasi nyata, ini akan mengambil data dari API dengan parameter filter
    
    let filtered = [...demoSiswa];
    
    // Filter berdasarkan kelas
    if (selectedKelas) {
      filtered = filtered.filter(siswa => siswa.kelas === selectedKelas);
    }
    
    // Filter berdasarkan nama
    if (searchQuery) {
      filtered = filtered.filter(siswa => 
        siswa.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter berdasarkan tanggal
    // Dalam demo ini, tanggal tidak difilter karena data statis
    // Dalam aplikasi nyata, akan ada filter berdasarkan tanggal
    
    setFilteredData(filtered);
  }, [searchQuery, selectedKelas, selectedTanggal]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getStatusBadge = (status: string) => {
    if (status === "normal") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Normal</Badge>;
    } else if (status === "perhatian") {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Perlu Perhatian</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Perlu Penanganan</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Data Kesehatan Siswa</h1>
      
      <Card>
        <CardHeader>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <CardTitle>Rekap Data Kesehatan</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Cari nama siswa..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="max-w-[250px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Kelas</label>
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

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead className="hidden md:table-cell">Suhu (°C)</TableHead>
                  <TableHead className="hidden md:table-cell">BB (kg)</TableHead>
                  <TableHead className="hidden md:table-cell">TB (cm)</TableHead>
                  <TableHead className="hidden md:table-cell">Perasaan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((siswa) => (
                  <TableRow key={siswa.id}>
                    <TableCell className="font-medium">{siswa.nama}</TableCell>
                    <TableCell>{siswa.kelas}</TableCell>
                    <TableCell className="hidden md:table-cell">{siswa.suhu}</TableCell>
                    <TableCell className="hidden md:table-cell">{siswa.beratBadan}</TableCell>
                    <TableCell className="hidden md:table-cell">{siswa.tinggiBadan}</TableCell>
                    <TableCell className="hidden md:table-cell">{siswa.perasaan}</TableCell>
                    <TableCell>{getStatusBadge(siswa.status)}</TableCell>
                  </TableRow>
                ))}
                
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Tidak ada data yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{filteredData.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Suhu Normal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {filteredData.filter(s => parseFloat(s.suhu) < 37.5).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Suhu Peringatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">
              {filteredData.filter(s => parseFloat(s.suhu) >= 37.5 && parseFloat(s.suhu) < 38).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Suhu Tinggi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              {filteredData.filter(s => parseFloat(s.suhu) >= 38).length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataSiswa;
