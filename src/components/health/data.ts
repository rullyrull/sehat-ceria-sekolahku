
// Health records test data
export const dataKesehatan = [
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

// Complaints data
export const keluhanKesehatan = [
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

// Health guide categories
export const kategoriPanduan = [
  { id: "nutrisi", nama: "Nutrisi Seimbang", icon: "🍎" },
  { id: "aktivitas", nama: "Aktivitas Fisik", icon: "🏃‍♂️" },
  { id: "tidur", nama: "Pola Tidur", icon: "😴" },
  { id: "kebersihan", nama: "Kebersihan Diri", icon: "🧼" },
  { id: "mata", nama: "Kesehatan Mata", icon: "👁️" },
  { id: "gigi", nama: "Kesehatan Gigi", icon: "😁" }
];

// Health guide content
export const panduanKesehatan = [
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
