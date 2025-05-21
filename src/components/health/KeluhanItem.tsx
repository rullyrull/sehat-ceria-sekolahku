
import React from "react";
import { AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import HealthStatusBadge from "./HealthStatusBadge";

type KeluhanData = {
  tanggal: string;
  jenisKeluhan: string;
  deskripsi: string;
  status: string;
  balasan?: {
    dari: string;
    pesan: string;
    tanggal: string;
  };
};

const KeluhanItem = ({ keluhan }: { keluhan: KeluhanData }) => {
  return (
    <div className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 p-1 rounded-full">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </div>
            <h3 className="font-medium">
              {keluhan.jenisKeluhan}
            </h3>
          </div>
          <HealthStatusBadge status={keluhan.status} />
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">
            {new Date(keluhan.tanggal).toLocaleDateString("id-ID", {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-gray-700">{keluhan.deskripsi}</p>
        </div>
      </div>
      
      {keluhan.balasan && (
        <div className="bg-blue-50 p-4 border-t">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-200 text-blue-700">
                {keluhan.balasan.dari.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{keluhan.balasan.dari}</p>
              <p className="text-xs text-gray-500">
                {new Date(keluhan.balasan.tanggal).toLocaleDateString("id-ID", {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <p className="text-blue-800">{keluhan.balasan.pesan}</p>
        </div>
      )}
    </div>
  );
};

export default KeluhanItem;
