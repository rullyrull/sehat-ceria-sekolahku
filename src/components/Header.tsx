
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface HeaderProps {
  user: {
    name: string;
    role: string;
    class?: string;
    teachClass?: string;
  };
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    toast.success("Berhasil keluar dari sistem");
    navigate("/");
  };

  const getRoleLabel = (role: string) => {
    switch(role) {
      case "siswa": return "Siswa";
      case "guru": return "Guru";
      case "admin": return "Administrator";
      default: return role;
    }
  };
  
  const getClassInfo = () => {
    if (user.role === "siswa" && user.class) {
      return `Kelas ${user.class}`;
    } else if (user.role === "guru" && user.teachClass) {
      return `Wali Kelas ${user.teachClass}`;
    }
    return "";
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjNEZDNEU4Ij48cGF0aCBkPSJNMjg4IDMyYy04IDMyLTI0Ljg3NSA1Ni0yNCA1NmwtNDItOC41TDM1MiAxMjhsNDAtMTA0LTU2LTI0Yy0yNy41IDAtNDggMzItNDggMzJ6TTIwMC45MzcgNDQ4SDI1NnYtMzJoLTU1LjA2M2MtNTEuODEyIDAtOTIuOTM3LTMzLjM3NS05Mi45MzctOTZWOTUuMDYzQzExMiA0OC4zNzUgNjQgMTYgNjQgMTZTMTYgNDguMzc1IDE2IDk1LjA2M3Y4LjkzN2MwIDg5Ljg3NSA1OS4wNjIgMTU5Ljc1IDE1OS4wNjIgMTU5Ljc1SDI1NnYtMzJoLTgwLjkzOEMxMjMuNzUgMjMxLjc1IDgwIDIwMi4wNjMgODAgMTI4aDMyYzAgNTcuMzEyIDMzLjEzIDcxLjc1IDYzLjA2MiA3MS43NUgyNTZ2LTMyaC04MC45MzhDMTU5LjkzNyAxNjcuNzUgMTQ0IDE2Ni41MTkgMTQ0IDE2MC42MjhWMTI4aC0zMmMwIDIzLjkzOCAxMC41IDI3LjA2MiAzMi44MTIgMjkuMTg4IDE5LjkzOCA0Mi41NjIgNDAuMTg4IDEwLjU2MiA0MC4xODgtMjloLTMyYzAgMjUtMy4wNjIgMzItMTEuMjUgMzIuODc1LTI0LjYyNS0zLjg3NS00OC4xMjUtMzIuODc1LTQ4LjEyNS0zMi44NzV2LTMyYy0yMy40MzggMC00OCAzLjYyNS00OCAzOS4xMjUgMCA1Ljg3NS4xMjUgMS44NzUtLjYyNSAzLjY4OC0zIDQuNjI1LTIxLjE4OCAxNC4xMjUtMjEuMTg4IDM4LjE4N3YxODAuNUM1OCAzOTYgMTEzLjEyNSA0NDggMjAwLjkzNyA0NDh6TTUxMiA5NS4wNjNWMTI4YzAgMCAwLTMyLjM3NSAwLTc5LjA2M1YxNnMtNDggMzIuMzc1LTQ4IDc5LjA2M3YyMjQuODc0YzAgNjIuNjI1LTQxLjEyNSA5Ni05Mi45MzcgOTZIMzE2di0zMmg1NS4wNjNjMjkuODc1IDAgNjMuMDYyLTE0LjQzOCA2My4wNjItNzEuNzVIMzY4YzAgMTA4LjA2My0wLjM3NSA3MS43NS0xNi4xMjUgNzEuNzVIMjkxLjc1VjM4NGg2MC4xMjVjMTAwIDAgMTU5LjA2Mi02OS44NzUgMTU5LjA2Mi0xNTkuNzV2LTguOTM3YzAtNDYuNjg4LTQ4LTc5LjA2Mi00OC03OS4wNjJzLTQ4IDMyLjM3NS00OCA3OS4wNjJ2NzQuNzVDNDE1IDQzNiAzNDMuMTI1IDQ0OCAyOTEuNzUgNDQ4SDE3Ni44NzV2LTMySDE5Ni43NQ=="/>
          <div className="text-xl font-bold text-health-blue">
            <span>Peduli Kesehatan Anak SD</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right mr-2">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">
              {getRoleLabel(user.role)} {getClassInfo()}
            </p>
          </div>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjNEZDNEU4Ij48cGF0aCBkPSJNMjU2IDMyYzYxLjggMCAxMTIgNTAuMiAxMTIgMTEycy01MC4yIDExMi0xMTIgMTEyLTExMi01MC4yLTExMi0xMTJTMTk0LjIgMzIgMjU2IDMyem0wIDI0MGM3NC4yIDAgMTM0LjUgNDAuOCAxNzUuOCA5Ni45QzM3OS4yIDE3MS44IDI2NC4yIDk2IDE1Mi4yIDk2aC0yM2M5MC4xIDAgMTYyLjggNzIuNyAxNjIuOCAxNjJ2MTA3LjZjLTE5LjgtMjQuNS01LjUtNDktMzYtNTAuOVYzODRjMC02Mi44LTQwLjkwOS05Mi4xLTgwLjEtOTIuMUgxNTJjLTgwLjIgMC0xNTIgNzEuOC0xNTIgMTUydjIwYTcuOSA3LjkgMCAwIDAgNy45IDcuOWg0MTQuMmE3LjkgNy45IDAgMCAwIDcuOS03LjlWMzQzLjVDNDY0LjUgMjc1LjUgMzcyLjkgMjcyIDI1NiAyNzJ6Ii8+PC9zdmc+"/>
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <Button onClick={handleLogout} variant="outline" size="sm">
            Keluar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
