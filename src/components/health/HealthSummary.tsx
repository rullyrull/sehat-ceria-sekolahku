
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";
import HealthMetricCard from "./HealthMetricCard";

type HealthData = {
  tanggal: string;
  suhu: string;
  beratBadan: string;
  tinggiBadan: string;
  perasaan: string;
  status: string;
};

type SummaryProps = {
  latestData: HealthData;
  weightChange: number;
  heightChange: number;
};

const HealthSummary = ({ latestData, weightChange, heightChange }: SummaryProps) => {
  return (
    <Card className="bg-gradient-to-r from-health-blue/10 to-blue-50 border-health-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-health-blue" />
          Ringkasan Kesehatan Terkini
        </CardTitle>
        <CardDescription>
          Data kesehatan terakhir yang direkam pada {new Date(latestData.tanggal).toLocaleDateString("id-ID", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <HealthMetricCard
            type="temperature"
            label="Suhu Tubuh"
            value={latestData.suhu}
            reference="Normal: 36.1°C - 37.2°C"
          />
          
          <HealthMetricCard 
            type="weight"
            label="Berat Badan"
            value={latestData.beratBadan}
            change={weightChange}
            reference="Ideal untuk usia 10-12 tahun: 35-55 kg"
          />
          
          <HealthMetricCard 
            type="height"
            label="Tinggi Badan"
            value={latestData.tinggiBadan}
            change={heightChange}
            reference="Ideal untuk usia 10-12 tahun: 138-162 cm"
          />
          
          <HealthMetricCard 
            type="feeling"
            label="Perasaan"
            value={latestData.perasaan}
            reference="Penting untuk kesehatan mental"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSummary;
