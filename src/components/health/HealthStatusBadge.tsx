
import React from "react";
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: string;
};

const HealthStatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === "normal") {
    return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Normal</Badge>;
  } else if (status === "perhatian") {
    return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Perlu Perhatian</Badge>;
  } else if (status === "dibalas") {
    return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Dibalas</Badge>;
  } else {
    return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Perlu Penanganan</Badge>;
  }
};

export default HealthStatusBadge;
