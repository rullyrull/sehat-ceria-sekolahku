
import React from "react";
import { Thermometer, Weight, Ruler } from "lucide-react";

type MetricCardProps = {
  type: "temperature" | "weight" | "height" | "feeling";
  value: string;
  change?: number;
  label: string;
  reference?: string;
};

const HealthMetricCard = ({ type, value, change, label, reference }: MetricCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "temperature":
        return <Thermometer className="h-5 w-5 text-red-500" />;
      case "weight":
        return <Weight className="h-5 w-5 text-green-500" />;
      case "height":
        return <Ruler className="h-5 w-5 text-blue-500" />;
      case "feeling":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        );
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "temperature": return "bg-red-100";
      case "weight": return "bg-green-100";
      case "height": return "bg-blue-100";
      case "feeling": return "bg-purple-100";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
      <div className="flex items-center gap-2 mb-2">
        <div className={`${getBgColor()} p-2 rounded-full`}>
          {getIcon()}
        </div>
        <h3 className="font-medium text-gray-700">{label}</h3>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change !== undefined && change !== 0 && (
          <span className={`text-xs ${change > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
            {change > 0 ? `+${change}` : `${change}`}
            {type === "weight" ? " kg" : type === "height" ? " cm" : ""}
          </span>
        )}
      </div>
      {reference && <p className="text-xs text-gray-500 mt-1">{reference}</p>}
    </div>
  );
};

export default HealthMetricCard;
