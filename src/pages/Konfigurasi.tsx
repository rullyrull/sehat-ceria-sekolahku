
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const Konfigurasi = () => {
  // Konfigurasi sistem
  const [konfigurasiFitur, setKonfigurasiFitur] = useState({
    aktifkanInputKesehatan: true,
    aktifkanNotifikasiGuru: true,
    aktifkanNotifikasiOrangTua: false,
    batasanSuhuNormal: "37.5",
    batanSuhuTinggi: "38",
  });
  
  // Konfigurasi sekolah
  const [konfigurasiSekolah, setKonfigurasiSekolah] = useState({
    namaSekolah: "SD Negeri Teladan",
    alamatSekolah: "Jl. Pendidikan No. 123, Jakarta",
    teleponSekolah: "021-5551234",
    emailSekolah: "info@sdnteladan.sch.id",
    logoSekolah: "",
    tahunAjaran: "2025/2026",
    semester: "Genap",
  });
  
  // Konfigurasi notifikasi
  const [konfigurasiNotifikasi, setKonfigurasiNotifikasi] = useState({
    pesanSuhuTinggi: "Perhatian! Suhu tubuh siswa di atas normal. Mohon perhatian lebih lanjut.",
    pesanKeluhanSiswa: "Ada keluhan kesehatan baru dari siswa yang memerlukan perhatian Anda.",
    pesanUntukOrangTua: "Perhatian! Anak Anda memiliki keluhan kesehatan di sekolah. Silakan periksa aplikasi untuk informasi lebih lanjut.",
  });
  
  const handleFeatureChange = (key: string, value: boolean | string) => {
    setKonfigurasiFitur({
      ...konfigurasiFitur,
      [key]: value,
    });
  };
  
  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKonfigurasiSekolah({
      ...konfigurasiSekolah,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKonfigurasiNotifikasi({
      ...konfigurasiNotifikasi,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSaveSettings = () => {
    toast.success("Pengaturan berhasil disimpan!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Konfigurasi Sistem</h1>
        <Button onClick={handleSaveSettings}>Simpan Konfigurasi</Button>
      </div>
      
      <Tabs defaultValue="fitur">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3">
          <TabsTrigger value="fitur">Fitur Sistem</TabsTrigger>
          <TabsTrigger value="sekolah">Data Sekolah</TabsTrigger>
          <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fitur" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Fitur</CardTitle>
              <CardDescription>Aktifkan atau nonaktifkan fitur dalam sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="input-kesehatan" className="flex flex-col space-y-1">
                  <span>Aktifkan Input Kesehatan Harian</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Siswa dapat menginput data kesehatan harian
                  </span>
                </Label>
                <Switch
                  id="input-kesehatan"
                  checked={konfigurasiFitur.aktifkanInputKesehatan}
                  onCheckedChange={(checked) => handleFeatureChange("aktifkanInputKesehatan", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notifikasi-guru" className="flex flex-col space-y-1">
                  <span>Aktifkan Notifikasi Guru</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Guru menerima notifikasi jika ada keluhan dari siswa
                  </span>
                </Label>
                <Switch
                  id="notifikasi-guru"
                  checked={konfigurasiFitur.aktifkanNotifikasiGuru}
                  onCheckedChange={(checked) => handleFeatureChange("aktifkanNotifikasiGuru", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notifikasi-orangtua" className="flex flex-col space-y-1">
                  <span>Aktifkan Notifikasi Orang Tua</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Orang tua menerima notifikasi jika ada masalah kesehatan siswa
                  </span>
                </Label>
                <Switch
                  id="notifikasi-orangtua"
                  checked={konfigurasiFitur.aktifkanNotifikasiOrangTua}
                  onCheckedChange={(checked) => handleFeatureChange("aktifkanNotifikasiOrangTua", checked)}
                />
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-semibold mb-3">Batasan Suhu Tubuh</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="suhu-normal">Batas Suhu Normal (°C)</Label>
                    <Input
                      id="suhu-normal"
                      type="number"
                      step="0.1"
                      value={konfigurasiFitur.batasanSuhuNormal}
                      onChange={(e) => handleFeatureChange("batasanSuhuNormal", e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Suhu di bawah nilai ini dianggap normal</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="suhu-tinggi">Batas Suhu Tinggi (°C)</Label>
                    <Input
                      id="suhu-tinggi"
                      type="number"
                      step="0.1"
                      value={konfigurasiFitur.batanSuhuTinggi}
                      onChange={(e) => handleFeatureChange("batanSuhuTinggi", e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Suhu di atas nilai ini dianggap tinggi/demam</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sekolah" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Sekolah</CardTitle>
              <CardDescription>Informasi dasar tentang sekolah</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama-sekolah">Nama Sekolah</Label>
                <Input
                  id="nama-sekolah"
                  name="namaSekolah"
                  value={konfigurasiSekolah.namaSekolah}
                  onChange={handleSchoolChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alamat-sekolah">Alamat Sekolah</Label>
                <Textarea
                  id="alamat-sekolah"
                  name="alamatSekolah"
                  value={konfigurasiSekolah.alamatSekolah}
                  onChange={handleSchoolChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telepon-sekolah">Telepon</Label>
                  <Input
                    id="telepon-sekolah"
                    name="teleponSekolah"
                    value={konfigurasiSekolah.teleponSekolah}
                    onChange={handleSchoolChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-sekolah">Email</Label>
                  <Input
                    id="email-sekolah"
                    name="emailSekolah"
                    type="email"
                    value={konfigurasiSekolah.emailSekolah}
                    onChange={handleSchoolChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo-sekolah">Logo Sekolah</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="logo-sekolah"
                    type="file"
                    accept="image/*"
                  />
                  {konfigurasiSekolah.logoSekolah && (
                    <Button variant="outline" size="sm">
                      Hapus
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-semibold mb-3">Tahun Ajaran</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tahun-ajaran">Tahun Ajaran</Label>
                    <Input
                      id="tahun-ajaran"
                      name="tahunAjaran"
                      value={konfigurasiSekolah.tahunAjaran}
                      onChange={handleSchoolChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select 
                      value={konfigurasiSekolah.semester} 
                      onValueChange={(value) => setKonfigurasiSekolah({...konfigurasiSekolah, semester: value})}
                    >
                      <SelectTrigger id="semester">
                        <SelectValue placeholder="Pilih semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ganjil">Ganjil</SelectItem>
                        <SelectItem value="Genap">Genap</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifikasi" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Kustomisasi pesan notifikasi dalam sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pesan-suhu-tinggi">Pesan Notifikasi Suhu Tinggi</Label>
                <Textarea
                  id="pesan-suhu-tinggi"
                  name="pesanSuhuTinggi"
                  value={konfigurasiNotifikasi.pesanSuhuTinggi}
                  onChange={handleNotificationChange}
                />
                <p className="text-xs text-gray-500">Pesan ini akan dikirim ke guru ketika siswa memiliki suhu tubuh tinggi</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pesan-keluhan-siswa">Pesan Notifikasi Keluhan Siswa</Label>
                <Textarea
                  id="pesan-keluhan-siswa"
                  name="pesanKeluhanSiswa"
                  value={konfigurasiNotifikasi.pesanKeluhanSiswa}
                  onChange={handleNotificationChange}
                />
                <p className="text-xs text-gray-500">Pesan ini akan dikirim ke guru ketika siswa melapor keluhan kesehatan</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pesan-orang-tua">Pesan Notifikasi untuk Orang Tua</Label>
                <Textarea
                  id="pesan-orang-tua"
                  name="pesanUntukOrangTua"
                  value={konfigurasiNotifikasi.pesanUntukOrangTua}
                  onChange={handleNotificationChange}
                />
                <p className="text-xs text-gray-500">Pesan ini akan dikirim ke orang tua ketika siswa memiliki masalah kesehatan</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Konfigurasi;
