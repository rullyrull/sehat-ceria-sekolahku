
import React from "react";
import { Thermometer, Weight, Ruler } from "lucide-react";
import HealthStatusBadge from "./HealthStatusBadge";

type DailyHealthData = {
  tanggal: string;
  suhu: string;
  beratBadan: string;
  tinggiBadan: string;
  perasaan: string;
  status: string;
};

const HealthDailyItem = ({ data }: { data: DailyHealthData }) => {
  return (
    <div className="border rounded-md p-4 space-y-3 hover:border-health-blue/50 hover:shadow-sm transition-all">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">
          {new Date(data.tanggal).toLocaleDateString("id-ID", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h3>
        <HealthStatusBadge status={data.status} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Suhu Tubuh</p>
            <p className="font-medium">{data.suhu}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Weight className="h-4 w-4 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Berat Badan</p>
            <p className="font-medium">{data.beratBadan}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Ruler className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Tinggi Badan</p>
            <p className="font-medium">{data.tinggiBadan}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
          <div>
            <p className="text-sm text-gray-500">Perasaan</p>
            <p className="font-medium">{data.perasaan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDailyItem;
