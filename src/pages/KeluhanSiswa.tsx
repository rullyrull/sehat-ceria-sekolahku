
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

// Data keluhan untuk demo
const keluhanSiswa = [
  {
    id: 1,
    namaSiswa: "Budi Santoso",
    kelas: "6A",
    tanggal: "2025-05-21",
    jenisKeluhan: "Sakit Perut",
    deskripsi: "Perut terasa mual dan sedikit sakit sejak setelah istirahat. Rasanya ingin muntah.",
    status: "belum-dibalas"
  },
  {
    id: 2,
    namaSiswa: "Eka Putri",
    kelas: "6A",
    tanggal: "2025-05-21",
    jenisKeluhan: "Sakit Kepala",
    deskripsi: "Kepala terasa pusing sejak pagi, terutama di bagian depan. Rasanya berat dan sulit berkonsentrasi.",
    status: "belum-dibalas"
  },
  {
    id: 3,
    namaSiswa: "Deni Pratama",
    kelas: "6A",
    tanggal: "2025-05-20",
    jenisKeluhan: "Demam",
    deskripsi: "Badan terasa panas dan lemas sejak semalam. Sulit untuk berkonsentrasi selama pelajaran.",
    status: "sudah-dibalas",
    balasan: "Saya sudah menghubungi orang tuamu untuk menjemput. Istirahatlah di rumah sampai kondisimu membaik."
  },
];

const kelasTersedia = ["6A", "6B", "5A", "5B", "4A", "4B"];

const KeluhanSiswa = () => {
  const { user } = useOutletContext<{ user: any }>();
  const [selectedKelas, setSelectedKelas] = useState<string>(user?.teachClass || "6A");
  const [searchQuery, setSearchQuery] = useState("");
  const [balasanText, setBalasanText] = useState<{[key: number]: string}>({});
  const [expandedKeluhan, setExpandedKeluhan] = useState<number | null>(null);
  
  // Filter keluhan berdasarkan kelas guru dan pencarian
  const filteredKeluhan = keluhanSiswa
    .filter(keluhan => keluhan.kelas === selectedKelas)
    .filter(keluhan => 
      keluhan.namaSiswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      keluhan.jenisKeluhan.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
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
    
    // Logika untuk menyimpan balasan
    // Dalam aplikasi nyata, ini akan mengirim data ke server
    
    toast.success("Balasan berhasil dikirim!");
    setBalasanText({
      ...balasanText,
      [keluhanId]: ""
    });
    setExpandedKeluhan(null);
  };
  
  const toggleExpand = (keluhanId: number) => {
    setExpandedKeluhan(expandedKeluhan === keluhanId ? null : keluhanId);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Keluhan Siswa</h1>
      
      <div className="flex flex-wrap gap-4 items-center">
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
        
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Cari</label>
          <Input
            placeholder="Cari berdasarkan nama siswa atau jenis keluhan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Badge className="bg-yellow-100 text-yellow-800">{filteredKeluhan.filter(k => k.status === "belum-dibalas").length}</Badge>
            Keluhan Belum Dibalas
          </h2>
          
          {filteredKeluhan
            .filter(keluhan => keluhan.status === "belum-dibalas")
            .map(keluhan => (
              <Card key={keluhan.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{keluhan.namaSiswa.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{keluhan.namaSiswa}</CardTitle>
                        <p className="text-sm text-muted-foreground">Kelas {keluhan.kelas}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                      Belum Dibalas
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{keluhan.jenisKeluhan}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(keluhan.tanggal).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-700">{keluhan.deskripsi}</p>
                  </div>
                  
                  <div className={expandedKeluhan === keluhan.id ? "block" : "hidden"}>
                    <div className="pt-4 border-t mt-4">
                      <label htmlFor={`balasan-${keluhan.id}`} className="text-sm font-medium mb-1 block">
                        Balasan
                      </label>
                      <Textarea
                        id={`balasan-${keluhan.id}`}
                        placeholder="Tulis balasan untuk keluhan siswa ini..."
                        value={balasanText[keluhan.id] || ""}
                        onChange={(e) => handleBalasanChange(keluhan.id, e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => toggleExpand(keluhan.id)}>
                          Batal
                        </Button>
                        <Button 
                          onClick={() => handleSubmitBalasan(keluhan.id)} 
                          className="bg-health-blue hover:bg-health-blue/90"
                        >
                          Kirim Balasan
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {expandedKeluhan !== keluhan.id && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => toggleExpand(keluhan.id)}
                    >
                      Balas Keluhan
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          
          {filteredKeluhan.filter(k => k.status === "belum-dibalas").length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">Tidak ada keluhan yang belum dibalas</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">{filteredKeluhan.filter(k => k.status === "sudah-dibalas").length}</Badge>
            Keluhan Sudah Dibalas
          </h2>
          
          {filteredKeluhan
            .filter(keluhan => keluhan.status === "sudah-dibalas")
            .map(keluhan => (
              <Card key={keluhan.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{keluhan.namaSiswa.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{keluhan.namaSiswa}</CardTitle>
                        <p className="text-sm text-muted-foreground">Kelas {keluhan.kelas}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                      Sudah Dibalas
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{keluhan.jenisKeluhan}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(keluhan.tanggal).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-700">{keluhan.deskripsi}</p>
                  </div>
                  
                  {keluhan.balasan && (
                    <div className="pt-4 border-t mt-4">
                      <p className="text-sm font-medium mb-2">Balasan Anda:</p>
                      <div className="bg-blue-50 p-3 rounded-md text-blue-800">
                        {keluhan.balasan}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          
          {filteredKeluhan.filter(k => k.status === "sudah-dibalas").length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">Tidak ada keluhan yang sudah dibalas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeluhanSiswa;
