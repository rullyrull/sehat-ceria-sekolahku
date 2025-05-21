
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

// Data demo untuk akun
const demoAkun = {
  siswa: [
    { id: 1, nama: "Andi Saputra", username: "andi", kelas: "6A", status: "aktif" },
    { id: 2, nama: "Budi Santoso", username: "budi", kelas: "6A", status: "aktif" },
    { id: 3, nama: "Cindy Aulia", username: "cindy", kelas: "6A", status: "aktif" },
    { id: 4, nama: "Deni Pratama", username: "deni", kelas: "6A", status: "aktif" },
    { id: 5, nama: "Eka Putri", username: "eka", kelas: "6A", status: "aktif" },
    { id: 6, nama: "Fajar Ramadhan", username: "fajar", kelas: "6B", status: "aktif" },
    { id: 7, nama: "Gita Nirmala", username: "gita", kelas: "6B", status: "aktif" },
    { id: 8, nama: "Hadi Firmansyah", username: "hadi", kelas: "6B", status: "nonaktif" },
  ],
  guru: [
    { id: 1, nama: "Siti Aminah", username: "siti_aminah", kelas: "6A", status: "aktif" },
    { id: 2, nama: "Ahmad Sudrajat", username: "ahmad_s", kelas: "6B", status: "aktif" },
    { id: 3, nama: "Nina Wati", username: "nina_w", kelas: "5A", status: "aktif" },
    { id: 4, nama: "Budi Santoso", username: "budi_s", kelas: "5B", status: "nonaktif" },
  ]
};

const kelasTersedia = ["6A", "6B", "5A", "5B", "4A", "4B"];

const ManajemenAkun = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("siswa");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    id: 0,
    nama: "",
    username: "",
    password: "",
    kelas: "",
    role: "siswa"
  });
  
  const [editData, setEditData] = useState({
    id: 0,
    nama: "",
    username: "",
    password: "",
    kelas: "",
    role: "siswa"
  });
  
  // Filter data berdasarkan pencarian dan kelas
  const filterData = (data: any[], query: string, kelas: string | null) => {
    return data.filter(item => 
      (item.nama.toLowerCase().includes(query.toLowerCase()) || 
       item.username.toLowerCase().includes(query.toLowerCase())) &&
      (!kelas || item.kelas === kelas)
    );
  };
  
  const filteredData = filterData(
    demoAkun[selectedTab as keyof typeof demoAkun], 
    searchQuery,
    selectedKelas
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleTambahAkun = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.nama || !formData.username || !formData.password || !formData.kelas) {
      toast.error("Semua field harus diisi!");
      return;
    }
    
    // Logika untuk tambah akun
    // Dalam aplikasi nyata, ini akan mengirim data ke server
    
    toast.success(`Akun ${selectedTab} berhasil ditambahkan!`);
    setIsDialogOpen(false);
    setFormData({
      id: 0,
      nama: "",
      username: "",
      password: "",
      kelas: "",
      role: selectedTab
    });
  };
  
  const handleEditAkun = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!editData.nama || !editData.username || !editData.kelas) {
      toast.error("Nama, username, dan kelas harus diisi!");
      return;
    }
    
    // Logika untuk edit akun
    // Dalam aplikasi nyata, ini akan mengirim data ke server
    
    toast.success(`Akun ${selectedTab} berhasil diperbarui!`);
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteAkun = (id: number) => {
    // Logika untuk hapus akun
    // Dalam aplikasi nyata, ini akan mengirim data ke server
    
    toast.success(`Akun ${selectedTab} berhasil dihapus!`);
  };
  
  const openEditDialog = (akun: any) => {
    setEditData({
      id: akun.id,
      nama: akun.nama,
      username: akun.username,
      password: "",
      kelas: akun.kelas,
      role: selectedTab
    });
    setIsEditDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Akun</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Tambah Akun Baru</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Akun {selectedTab === "siswa" ? "Siswa" : "Guru"}</DialogTitle>
              <DialogDescription>
                Isi informasi untuk membuat akun baru
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTambahAkun}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    name="nama"
                    placeholder="Masukkan nama lengkap"
                    value={formData.nama}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Masukkan username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="kelas">Kelas</Label>
                  <Select name="kelas" value={formData.kelas} onValueChange={(value) => setFormData({...formData, kelas: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {kelasTersedia.map((kelas) => (
                        <SelectItem key={kelas} value={kelas}>
                          {kelas}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Akun {selectedTab === "siswa" ? "Siswa" : "Guru"}</DialogTitle>
              <DialogDescription>
                Perbarui informasi akun
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditAkun}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nama">Nama Lengkap</Label>
                  <Input
                    id="edit-nama"
                    name="nama"
                    placeholder="Masukkan nama lengkap"
                    value={editData.nama}
                    onChange={handleEditInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-username">Username</Label>
                  <Input
                    id="edit-username"
                    name="username"
                    placeholder="Masukkan username"
                    value={editData.username}
                    onChange={handleEditInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-password">Password (kosongkan jika tidak diubah)</Label>
                  <Input
                    id="edit-password"
                    name="password"
                    type="password"
                    placeholder="Masukkan password baru"
                    value={editData.password}
                    onChange={handleEditInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-kelas">Kelas</Label>
                  <Select name="kelas" value={editData.kelas} onValueChange={(value) => setEditData({...editData, kelas: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {kelasTersedia.map((kelas) => (
                        <SelectItem key={kelas} value={kelas}>
                          {kelas}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Perbarui</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <div className="flex items-center justify-between border-b px-6 py-2">
              <TabsList>
                <TabsTrigger value="siswa">Akun Siswa</TabsTrigger>
                <TabsTrigger value="guru">Akun Guru</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Select value={selectedKelas || ""} onValueChange={(value) => setSelectedKelas(value || null)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Semua Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Kelas</SelectItem>
                    {kelasTersedia.map((kelas) => (
                      <SelectItem key={kelas} value={kelas}>Kelas {kelas}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="relative">
                  <svg
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <Input
                    placeholder="Cari..."
                    className="pl-8 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <TabsContent value="siswa" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((siswa) => (
                      <TableRow key={siswa.id}>
                        <TableCell className="font-medium">{siswa.nama}</TableCell>
                        <TableCell>{siswa.username}</TableCell>
                        <TableCell>Kelas {siswa.kelas}</TableCell>
                        <TableCell>
                          {siswa.status === "aktif" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Non-Aktif</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(siswa)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteAkun(siswa.id)}>
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredData.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Tidak ada data yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="guru" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Wali Kelas</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((guru) => (
                      <TableRow key={guru.id}>
                        <TableCell className="font-medium">{guru.nama}</TableCell>
                        <TableCell>{guru.username}</TableCell>
                        <TableCell>Kelas {guru.kelas}</TableCell>
                        <TableCell>
                          {guru.status === "aktif" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Non-Aktif</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(guru)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteAkun(guru.id)}>
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredData.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
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
      
      <div className="bg-gray-50 p-4 rounded-md border">
        <h3 className="font-medium mb-2">Informasi Manajemen Akun</h3>
        <p className="text-sm text-gray-600">
          Sebagai Admin, Anda dapat mengelola seluruh akun Siswa dan Guru dalam sistem. Pastikan untuk menetapkan kelas yang sesuai agar data terhubung dengan benar. Guru hanya dapat mengakses informasi kesehatan siswa di kelas yang mereka ampu.
        </p>
      </div>
    </div>
  );
};

export default ManajemenAkun;
