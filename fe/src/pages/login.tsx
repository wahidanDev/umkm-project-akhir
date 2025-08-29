import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FF705B] to-[#FFB457]">
      <Card className="w-[380px] shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-yellow-700">Login</h2>
          <p className="text-gray-500 text-sm">Masuk ke akun Anda</p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Input
              type="email"
              label="Email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startContent={<Mail className="text-gray-400" size={18} />}
              variant="bordered"
              radius="lg"
              isRequired
            />

            <Input
              type="password"
              label="Password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startContent={<Lock className="text-gray-400" size={18} />}
              variant="bordered"
              radius="lg"
              isRequired
            />
          </CardBody>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-yellow-600 text-white rounded-lg"
              size="lg"
            >
              Login
            </Button>
            <p className="text-xs text-gray-500">
              Belum punya akun?{" "}
              <a href="/register" className="text-yellow-600 font-semibold">
                Daftar
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
