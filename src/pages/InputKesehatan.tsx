
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/sonner";

const InputKesehatan = () => {
  const { user } = useOutletContext<{ user: any }>();
  
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().substr(0, 10),
    suhuTubuh: "",
    beratBadan: "",
    tinggiBadan: "",
    perasaan: "baik",
  });

  const [keluhan, setKeluhan] = useState({
    jenisKeluhan: "",
    deskripsi: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeluhanChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeluhan({
      ...keluhan,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk menyimpan data kesehatan
    // Dalam aplikasi nyata, ini akan mengirim data ke server
    
    toast.success("Data kesehatan harian berhasil disimpan!");
    setFormData({
      ...formData,
      suhuTubuh: "",
      beratBadan: "",
      tinggiBadan: "",
      perasaan: "baik",
    });
  };

  const handleSubmitKeluhan = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk menyimpan keluhan kesehatan
    
    toast.success("Keluhan kesehatan berhasil dilaporkan!");
    setKeluhan({
      jenisKeluhan: "",
      deskripsi: "",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Input Data Kesehatan</h1>
      
      <Tabs defaultValue="data-harian" className="space-y-4">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="data-harian">Data Harian</TabsTrigger>
          <TabsTrigger value="keluhan">Keluhan Kesehatan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-harian" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Kesehatan Harian</CardTitle>
              <CardDescription>
                Masukkan informasi kesehatan harian Anda untuk pemantauan yang lebih baik
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitData} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tanggal">Tanggal</Label>
                    <Input 
                      id="tanggal" 
                      name="tanggal" 
                      type="date" 
                      value={formData.tanggal} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="suhuTubuh">Suhu Tubuh (°C)</Label>
                    <Input 
                      id="suhuTubuh" 
                      name="suhuTubuh" 
                      type="number" 
                      step="0.1"
                      placeholder="36.5" 
                      value={formData.suhuTubuh} 
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beratBadan">Berat Badan (kg)</Label>
                    <Input 
                      id="beratBadan" 
                      name="beratBadan" 
                      type="number" 
                      step="0.1"
                      placeholder="40" 
                      value={formData.beratBadan} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tinggiBadan">Tinggi Badan (cm)</Label>
                    <Input 
                      id="tinggiBadan" 
                      name="tinggiBadan" 
                      type="number" 
                      placeholder="150" 
                      value={formData.tinggiBadan} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Bagaimana Perasaanmu Hari Ini?</Label>
                  <RadioGroup 
                    name="perasaan" 
                    value={formData.perasaan}
                    onValueChange={(value) => setFormData({...formData, perasaan: value})}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="baik" id="baik" />
                      <Label htmlFor="baik" className="cursor-pointer">Baik</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="biasa" id="biasa" />
                      <Label htmlFor="biasa" className="cursor-pointer">Biasa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kurang" id="kurang" />
                      <Label htmlFor="kurang" className="cursor-pointer">Kurang Baik</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full">Simpan Data</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keluhan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporkan Keluhan Kesehatan</CardTitle>
              <CardDescription>
                Jika Anda merasa tidak enak badan, silakan laporkan keluhan Anda di sini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitKeluhan} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jenisKeluhan">Jenis Keluhan</Label>
                  <Input 
                    id="jenisKeluhan" 
                    name="jenisKeluhan" 
                    placeholder="Contoh: Sakit Kepala, Sakit Perut, dll." 
                    value={keluhan.jenisKeluhan} 
                    onChange={handleKeluhanChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi Keluhan</Label>
                  <Textarea 
                    id="deskripsi" 
                    name="deskripsi" 
                    placeholder="Ceritakan lebih detail tentang keluhan yang kamu rasakan..." 
                    value={keluhan.deskripsi} 
                    onChange={handleKeluhanChange}
                    className="min-h-[120px]" 
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-health-yellow hover:bg-health-yellow/80 text-black">
                  Laporkan Keluhan
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
            <div className="flex gap-2 items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold">Catatan:</span>
            </div>
            <p>Keluhan yang kamu laporkan akan langsung dilihat oleh Guru Kelasmu. Bila keluhanmu serius, orang tuamu juga akan diberitahu.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InputKesehatan;
