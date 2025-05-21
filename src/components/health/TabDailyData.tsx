
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, ChartLineIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import HealthDailyItem from "./HealthDailyItem";
import HealthTrendChart from "./HealthTrendChart";

type HealthData = {
  tanggal: string;
  suhu: string;
  beratBadan: string;
  tinggiBadan: string;
  perasaan: string;
  status: string;
};

type DailyDataProps = {
  isLoading: boolean;
  filteredData: HealthData[];
};

const TabDailyData = ({ isLoading, filteredData }: DailyDataProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-health-blue" />
          Catatan Kesehatan Harian
        </CardTitle>
        <CardDescription>
          Riwayat data kesehatan yang telah kamu input sebelumnya
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-blue"></div>
          </div>
        ) : filteredData.length > 0 ? (
          <>
            {/* Health trend charts */}
            {filteredData.length > 1 && (
              <>
                <div className="mb-6 flex items-center gap-2">
                  <ChartLineIcon className="h-5 w-5 text-health-blue" />
                  <h3 className="text-lg font-medium">Tren Kesehatan</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <HealthTrendChart 
                    data={filteredData} 
                    metric="weight" 
                    title="Berat Badan" 
                    color="#7ED957" 
                  />
                  <HealthTrendChart 
                    data={filteredData} 
                    metric="height" 
                    title="Tinggi Badan" 
                    color="#4FC4E8" 
                  />
                  <HealthTrendChart 
                    data={filteredData} 
                    metric="temperature" 
                    title="Suhu Tubuh" 
                    color="#FF9DC5" 
                  />
                </div>
              </>
            )}
            
            <div className="mb-4 flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-health-blue" />
              <h3 className="text-lg font-medium">Catatan Harian</h3>
            </div>
            <div className="space-y-4">
              {filteredData.map((item, index) => (
                <HealthDailyItem key={index} data={item} />
              ))}
            </div>
          </>
        ) : (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertTitle>Tidak ada data</AlertTitle>
            <AlertDescription>
              Belum ada data kesehatan yang sesuai dengan pencarian Anda.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default TabDailyData;
