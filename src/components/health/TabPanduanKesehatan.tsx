
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HealthGuideCategory from "./HealthGuideCategory";
import HealthGuideContent from "./HealthGuideContent";

type KategoriType = { 
  id: string; 
  nama: string; 
  icon: string;
};

type GuideContent = {
  id: string;
  judul: string;
  icon: string;
  deskripsi: string;
  tips: string[];
};

type PanduanProps = {
  categories: KategoriType[];
  selectedKategori: string;
  setSelectedKategori: (id: string) => void;
  filteredPanduan: GuideContent;
};

const TabPanduanKesehatan = ({ 
  categories, 
  selectedKategori, 
  setSelectedKategori, 
  filteredPanduan 
}: PanduanProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-health-blue">
            <path d="M3 5v14"></path>
            <path d="M21 12H7"></path>
            <path d="m15 18 6-6-6-6"></path>
          </svg>
          Panduan Kesehatan
        </CardTitle>
        <CardDescription>
          Kumpulan informasi dan tips untuk menjaga kesehatan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/3 space-y-2">
            {categories.map((kategori) => (
              <HealthGuideCategory 
                key={kategori.id}
                id={kategori.id}
                nama={kategori.nama}
                icon={kategori.icon}
                isSelected={selectedKategori === kategori.id}
                onClick={setSelectedKategori}
              />
            ))}
          </div>
          
          <div className="w-full md:w-2/3">
            <HealthGuideContent guide={filteredPanduan} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TabPanduanKesehatan;
