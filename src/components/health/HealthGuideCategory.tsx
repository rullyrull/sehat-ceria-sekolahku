
import React from "react";

type CategoryProps = {
  id: string;
  nama: string;
  icon: string;
  isSelected: boolean;
  onClick: (id: string) => void;
};

const HealthGuideCategory = ({ id, nama, icon, isSelected, onClick }: CategoryProps) => {
  return (
    <button
      className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 transition-colors
        ${isSelected 
          ? 'bg-health-blue/10 text-health-blue border-l-4 border-health-blue' 
          : 'hover:bg-gray-100'
        }`}
      onClick={() => onClick(id)}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{nama}</span>
    </button>
  );
};

export default HealthGuideCategory;
