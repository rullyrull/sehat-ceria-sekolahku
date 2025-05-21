
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

type Role = "siswa" | "guru" | "admin";

const AuthForm = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("siswa");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Untuk demo, kita akan menggunakan kredensial sederhana
    // Dalam aplikasi nyata, ini akan terhubung ke backend untuk autentikasi
    if (username && password) {
      // Demo data
      const userData = {
        id: Math.floor(Math.random() * 1000),
        username,
        role: role,
        name: username,
        class: role === "siswa" ? "6A" : undefined,
        teachClass: role === "guru" ? "6A" : undefined,
      };

      // Simpan di session storage untuk simulasi autentikasi
      sessionStorage.setItem("currentUser", JSON.stringify(userData));
      
      toast.success(`Berhasil masuk sebagai ${role}!`);
      onLogin(userData);
    } else {
      toast.error("Username dan password harus diisi");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjNEZDNEU4Ij48cGF0aCBkPSJNMjg4IDMyYy04IDMyLTI0Ljg3NSA1Ni0yNCA1Nmw0OC0xMS41TDM1MiAxMjhsNDAtMTA0LTU2LTI0Yy0yNy41IDAtNDggMzItNDggMzJ6TTIwMC45MzcgNDQ4SDI1NnYtMzJoLTU1LjA2M2MtNTEuODEyIDAtOTIuOTM3LTMzLjM3NS05Mi45MzctOTZWOTUuMDYzQzExMiA0OC4zNzUgNjQgMTYgNjQgMTZTMTYgNDguMzc1IDE2IDk1LjA2M3Y4LjkzN2MwIDg5Ljg3NSA1OS4wNjIgMTU5Ljc1IDE1OS4wNjIgMTU5Ljc1SDI1NnYtMzJoLTgwLjkzOEMxMjMuNzUgMjMxLjc1IDgwIDIwMi4wNjMgODAgMTI4aDMyYzAgNTcuMzEyIDMzLjEzIDcxLjc1IDYzLjA2MiA3MS43NUgyNTZ2LTMyaC04MC45MzhDMTU5LjkzNyAxNjcuNzUgMTQ0IDE2Ni41MTkgMTQ0IDE2MDAtNjU1MzYgMTYwMC02NTUzNiAwIDE2MDAtNjU1MzYgMTYwMC02NTUzNiAwIDE2MDAtNjU1MzYgMTYwMC02NTUzNmgtMzJjMCAyMy45MzggMTAuNSAyNy4wNjIgMzIuODEyIDI5LjE4OEMxNjUuNzUgMTk5Ljc1IDE4NiAxNjcuNzUgMTg2IDEyOGgtMzJjMCAyNS0zLjA2MiAzMi0xMS4yNSAzMi44NzVDMTE4LjEyNSAxNTctOTYgMTI4IDEyOCAxMjh2LTMyYy0yMy40MzggMC00OCAzLjYyNS00OCAzOS4xMjUgMCA1Ljg3NS4xMjUgMS44NzUtLjYyNSAzLjY4OC0zIDQuNjI1LTIxLjE4OCAxNC4xMjUtMjEuMTg4IDM4LjE4N3YxODAuNUM1OCAzOTYgMTEzLjEyNSA0NDggMjAwLjkzNyA0NDh6TTUxMiA5NS4wNjNWMTYtOC43NSAwIDYxLjEyNVYxNnMtNDggMzIuMzc1LTQ4IDc5LjA2M3YyMjQuODc0YzAgNjIuNjI1LTQxLjEyNSA5Ni05Mi45MzcgOTZIMzE2di0zMmg1NS4wNjNjMjkuODc1IDAgNjMuMDYyLTE0LjQzOCA2My4wNjItNzEuNzVIMzY4YzAgMTA4LjA2My0wLjM3NSA3MS43NS0xNi4xMjUgNzEuNzVIMjkxLjc1VjM4NGgoNjAuMTI1YzEwMCAwIDE1OS4wNjItNjkuODc1IDE1OS4wNjItMTU5Ljc1di04LjkzN2MwLTQ2LjY4OC00OC03OS4wNjItNDgtNzkuMDYycy00OCAzMi4zNzUtNDggNzkuMDYydjc0Ljc1QzQxNSA0MzYgMzQzLjEyNSA0NDggMjkxLjc1IDQ0OEgxNzYtOC43NSA0NDggMCAxMzZTMjU2IDQ0OFYzODQtOC43NSAzODQgMTE5Ljc1VjM4NGgtNTQuMTI1Yy03Ni44NzUgMC0xMjkuNzUtNDMuMTI1LTE0My44NzUtOTZINzZjMTIuNzUgNzUgNzguNjI1IDEyOCAxNDMuODc1IDEyOEgyNzUuNzVWMzg0aC04Mi44NzVDMTY5LjM3NSAzODQgMTYwLjYyNSA0MDMuNzUgMTYwLjYyNSA0MTZIMTkyYzE0LjkzOCAwIDE1LjYyNS05LjM3NSAzMi0zMkgyOTUuNzVjMjUuNjI1IDAgNDgtNi41IDY0LTMyLjM3NVY0MTZoMzJ2LTEyOGgtMzJ2NDVjMCAzMS44NzUtMzEgNTEuMTI1LTY0IDUxLjEyNUgyNDBWNDgwaDUxLjc1YzUxLjM3NSAwIDEyMy4xMjUtMTIgMTIzLjEyNS0xMTJ2LTE3NC45MzdDNDE2IDEzNiA0MzIgMTI4IDQ0OCAxMjhoMzJjMC03NC4wNjItNDMuNzUtMTAzLjc1LTk1LjA2Mi0xMDMuNzVIMzA0djMyaDgwLjkzOGMyOS45NzUgMCA2My4wNjIgMTQuNDM4IDYzLjA2MiA3MS43NWgzMmMwLTc0LjA2Mi00My43NS0xMDMuNzUtOTUuMDYyLTEwMy43NUgzMDR2MzJoODAuOTM4YzI5Ljk2MiAwIDYzLjA2MiAxNC40MzggNjMuMDYyIDcxLjc1SDQ4MGMwLTEwOCAwLTcxLjc1LTE2LTcxLjc1aC02MC4xMjV2MzJIODAgMTI4aDE5MlYxNmgtMzJ2MzJIMTQ0VjE2aC0zMnYzMkg4MEMzMS43NSA0OCAwIDc5Ljc1IDAgMTI4aDMyQzMyIDk2IDU2IDgwIDgwIDgwaDE2djMySDgwYy00NCAwLTQ4IDY0LTQ4IDk1LjA2MnYyNC44NzVjMCAxMDguMDYzLjEyNSA3Mi0xNiA3Mi0xNi4xMjUgMC0xNi0xNi0xNiA2NGgzMmMwLTU2LTEuOTM4LTQ4IDAtNDggMzIgMCAzMi05LjEyNSAzMi0zMnYtODAtOC43NSAwIDk2TDgwIDMwNHYxMTJoMzJWMzA0Yy03LjkzOC00Ny44NzUtNDguNzUtNDguMTI1LTQ4LjA2Mi05NlYxNjAtOC43NSAxNjAgODBWMTI4aDMyYzQxLjc1IDAgODAtMjggODAtODhIMTQ0Yy0uMTI1LTguNjg4LTcuNzUtMTYtMTYtMTZIODBjLTguMjUgMC0xNiA3LjMxMi0xNiAxNmgzMnYtMTZoMzJ2MTZjMCAwLTMxLjc1IDAtMzIgMCAwIDI4LjY4OCAxMC43NSA1NiAzMiA3Nmw0MCAzNy43NS00MCA1LjVMNDAgMjg4LTguNzUgMjg4IDAgMjcydjE3NmMwIDM1LjM3NSAyOC42MjUgNjQgNjQgNjRoMzg0YzM1LjM3NSAwIDY0LTI4LjYyNSA2NC02NFYzNTMuNzVMNTEyIDM1My43NSA0MTYgMzIwbC00MC01LjUtNDAgMzdoOFYxNjAtOC43NSAxNjAgMzUybC00OC0uMzc1TDI0MCAzOTkuNzVWNDgwaDE2di02NGgzMmw2NC01Nmg0OHY0OGgzMnYtNjR6TTQwMCAzODRsLTU2IDQ4aC01NmwzMi0zMnptLTIwOC05NmwtMTEuMTI1LTExLjEyNS03OS4zNzUgNzkuMzc1TDExMiAzNjZsMTMuMTI1LTEzLjEyNSA2NS4yNS02NS4yNUwxOTIgMjg4eiIvPjwvc3ZnPg=="
            alt="Icon"
            className="w-16 h-16"
          />
        </div>
        <CardTitle className="text-2xl text-health-blue">Peduli Kesehatan Anak SD</CardTitle>
        <CardDescription>
          Login untuk mengakses sistem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Masuk Sebagai
            </label>
            <Select value={role} onValueChange={(value) => setRole(value as Role)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="siswa">Siswa</SelectItem>
                <SelectItem value="guru">Guru</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full bg-health-blue hover:bg-health-blue/80">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          © 2025 Peduli Kesehatan Anak SD
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
