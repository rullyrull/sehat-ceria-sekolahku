
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import HealthDailyItem from "./HealthDailyItem";

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
          <div className="space-y-4">
            {filteredData.map((item, index) => (
              <HealthDailyItem key={index} data={item} />
            ))}
          </div>
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
