
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Data untuk demo
const demoData = {
  siswa: {
    totalEntries: 28,
    totalKeluhan: 3,
    responseRate: 100,
    lastUpdate: "2025-05-21",
    health: {
      suhu: "36.5°C",
      beratBadan: "38 kg",
      tinggiBadan: "142 cm",
      status: "Sehat"
    },
    recentActivities: [
      { type: "input-data", date: "2025-05-21", desc: "Input data kesehatan harian" },
      { type: "keluhan", date: "2025-05-20", desc: "Melaporkan keluhan sakit kepala" },
      { type: "input-data", date: "2025-05-19", desc: "Input data kesehatan harian" }
    ]
  },
  guru: {
    totalSiswa: 28,
    keluhanAktif: 3,
    kehadiranHariIni: 26,
    kesehatanSiswa: {
      sehat: 25,
      perluPerhatian: 2,
      sakit: 1
    },
    recentActivities: [
      { type: "respon", date: "2025-05-21", desc: "Merespon keluhan Budi tentang sakit perut" },
      { type: "lihat-data", date: "2025-05-20", desc: "Melihat rekap kesehatan kelas 6A" },
      { type: "respon", date: "2025-05-19", desc: "Merespon keluhan Ani tentang sakit kepala" }
    ]
  },
  admin: {
    totalSiswa: 320,
    totalGuru: 16,
    totalKelas: 12,
    trendKehadiran: 96,
    trendKesehatan: 94,
    recentActivities: [
      { type: "tambah-akun", date: "2025-05-21", desc: "Menambahkan akun guru baru: Sri Widiyanti" },
      { type: "edit-akun", date: "2025-05-20", desc: "Edit data guru: Ahmad Sudrajat" },
      { type: "lihat-rekap", date: "2025-05-19", desc: "Melihat rekap kesehatan sekolah" }
    ]
  }
};

const Dashboard = () => {
  const { user } = useOutletContext<{ user: any }>();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Dalam aplikasi nyata, data ini akan diambil dari API
    // Untuk demo, kita gunakan data statis berdasarkan peran pengguna
    if (user && user.role) {
      setUserData(demoData[user.role as keyof typeof demoData]);
    }
  }, [user]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-blue"></div>
      </div>
    );
  }

  // Dashboard untuk Siswa
  if (user.role === "siswa") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Halo, {user.name}!</h1>
          <div className="bg-health-green/10 text-health-green px-3 py-1 rounded-full text-sm font-medium">
            {userData.health.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Suhu Tubuh Terakhir</CardDescription>
              <CardTitle className="text-2xl">{userData.health.suhu}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Berat Badan</CardDescription>
              <CardTitle className="text-2xl">{userData.health.beratBadan}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tinggi Badan</CardDescription>
              <CardTitle className="text-2xl">{userData.health.tinggiBadan}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Entri Data</CardDescription>
              <CardTitle className="text-2xl">{userData.totalEntries}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.recentActivities.map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'keluhan' 
                      ? 'bg-health-yellow/20 text-health-yellow' 
                      : 'bg-health-blue/20 text-health-blue'
                  }`}>
                    {activity.type === 'keluhan' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.desc}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard untuk Guru
  if (user.role === "guru") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Guru</h1>
          <div className="bg-health-blue/10 text-health-blue px-3 py-1 rounded-full text-sm font-medium">
            Wali Kelas: {user.teachClass}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Siswa di Kelas</CardDescription>
              <CardTitle className="text-2xl">{userData.totalSiswa}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Kehadiran Hari Ini</CardDescription>
              <CardTitle className="text-2xl">{userData.kehadiranHariIni} Siswa</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Keluhan Aktif</CardDescription>
              <CardTitle className="text-2xl text-health-yellow">{userData.keluhanAktif} Keluhan</CardTitle>
            </CardHeader>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Status Kesehatan Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{userData.kesehatanSiswa.sehat}</div>
                <div className="text-sm text-gray-500">Sehat</div>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">{userData.kesehatanSiswa.perluPerhatian}</div>
                <div className="text-sm text-gray-500">Perlu Perhatian</div>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{userData.kesehatanSiswa.sakit}</div>
                <div className="text-sm text-gray-500">Sakit</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.recentActivities.map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'respon' 
                      ? 'bg-health-green/20 text-health-green' 
                      : 'bg-health-blue/20 text-health-blue'
                  }`}>
                    {activity.type === 'respon' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.desc}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard untuk Admin
  if (user.role === "admin") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Administrator</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Siswa</CardDescription>
              <CardTitle className="text-2xl">{userData.totalSiswa}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Guru</CardDescription>
              <CardTitle className="text-2xl">{userData.totalGuru}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Kelas</CardDescription>
              <CardTitle className="text-2xl">{userData.totalKelas}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Kehadiran</CardDescription>
              <CardTitle className="text-2xl">{userData.trendKehadiran}%</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Status Kesehatan</CardDescription>
              <CardTitle className="text-2xl">{userData.trendKesehatan}%</CardTitle>
            </CardHeader>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentActivities.map((activity: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type.includes('akun') 
                        ? 'bg-health-blue/20 text-health-blue' 
                        : 'bg-health-purple/20 text-health-purple'
                    }`}>
                      {activity.type.includes('tambah') ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      ) : activity.type.includes('edit') ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.desc}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Kelas</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="kesehatan">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="kesehatan">Status Kesehatan</TabsTrigger>
                  <TabsTrigger value="kehadiran">Kehadiran</TabsTrigger>
                </TabsList>
                <TabsContent value="kesehatan" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Kelas 6A</div>
                      <div className="font-medium">97% Sehat</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Kelas 6B</div>
                      <div className="font-medium">95% Sehat</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Kelas 5A</div>
                      <div className="font-medium">98% Sehat</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Kelas 5B</div>
                      <div className="font-medium">92% Sehat</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="kehadiran" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Kelas 6A</div>
                      <div className="font-medium">98% Hadir</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Kelas 6B</div>
                      <div className="font-medium">96% Hadir</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Kelas 5A</div>
                      <div className="font-medium">97% Hadir</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Kelas 5B</div>
                      <div className="font-medium">95% Hadir</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;
