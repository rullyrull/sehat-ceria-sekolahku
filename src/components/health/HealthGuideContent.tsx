
import React from "react";

type GuideContent = {
  id: string;
  judul: string;
  icon: string;
  deskripsi: string;
  tips: string[];
};

const HealthGuideContent = ({ guide }: { guide: GuideContent }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-6 rounded-lg border border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{guide.icon}</div>
        <h3 className="text-xl font-bold text-blue-800">{guide.judul}</h3>
      </div>
      <p className="text-blue-700 mb-4">{guide.deskripsi}</p>
      
      <div className="space-y-2">
        <h4 className="font-medium text-blue-800">Tips:</h4>
        <ul className="space-y-2">
          {guide.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-blue-700">
              <svg className="h-5 w-5 mt-0.5 text-health-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthGuideContent;
