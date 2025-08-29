import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password tidak sama ❌");
      return;
    }

    try {
      await register(username, email, password, role);
      toast.success("Registrasi berhasil ✅");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Registrasi gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold">Register</h2>
          <p className="text-default-500 text-sm">
            Daftar akun baru untuk melanjutkan
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              placeholder="Masukkan username"
              variant="bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isRequired
            />

            <Input
              label="Email"
              type="email"
              placeholder="Masukkan email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />

            <Input
              label="Password"
              type="password"
              placeholder="Masukkan password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />

            <Input
              label="Konfirmasi Password"
              type="password"
              placeholder="Masukkan ulang password"
              variant="bordered"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isRequired
            />

            {/* Dropdown Role */}
            <div className="flex flex-col">
              <select
                className="border rounded-lg p-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white"
              radius="lg"
            >
              Register
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login disini
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
