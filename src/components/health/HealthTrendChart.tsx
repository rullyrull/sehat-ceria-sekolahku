
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type HealthData = {
  tanggal: string;
  suhu: string;
  beratBadan: string;
  tinggiBadan: string;
  perasaan: string;
  status: string;
};

const transformData = (data: HealthData[]) => {
  return data.map(item => ({
    date: new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    weight: parseFloat(item.beratBadan),
    height: parseFloat(item.tinggiBadan),
    temperature: parseFloat(item.suhu),
  })).reverse(); // Reverse to show oldest to newest
};

type Props = {
  data: HealthData[];
  metric: "weight" | "height" | "temperature";
  title: string;
  color: string;
};

const metricConfig = {
  weight: {
    dataKey: "weight",
    unit: "kg",
    label: "Berat Badan",
  },
  height: {
    dataKey: "height",
    unit: "cm",
    label: "Tinggi Badan",
  },
  temperature: {
    dataKey: "temperature",
    unit: "°C",
    label: "Suhu Tubuh",
  },
};

const HealthTrendChart = ({ data, metric, title, color }: Props) => {
  const chartData = transformData(data);
  const config = metricConfig[metric];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription>Tren {config.label} selama 30 hari terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ChartContainer 
            config={{
              [config.dataKey]: {
                label: config.label,
                color: color,
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                />
                <YAxis 
                  width={30}
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  domain={['dataMin - 1', 'dataMax + 1']} 
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="bg-white p-2 border rounded shadow"
                          payload={payload}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={config.dataKey} 
                  stroke={color} 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }} 
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTrendChart;
