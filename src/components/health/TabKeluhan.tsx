
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import KeluhanItem from "./KeluhanItem";

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

type KeluhanProps = {
  keluhanData: KeluhanData[];
  isLoading: boolean;
};

const TabKeluhan = ({ keluhanData, isLoading }: KeluhanProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-health-blue" />
          Riwayat Keluhan
        </CardTitle>
        <CardDescription>
          Keluhan kesehatan yang telah kamu laporkan
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-blue"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {keluhanData.map((keluhan, index) => (
              <KeluhanItem key={index} keluhan={keluhan} />
            ))}
            
            {keluhanData.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">Belum ada keluhan yang dilaporkan</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper component for MessageCircle icon
const MessageCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default TabKeluhan;
