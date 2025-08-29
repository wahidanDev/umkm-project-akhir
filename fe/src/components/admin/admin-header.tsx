import { Button } from "@heroui/button";
import { useAuth } from "@/context/AuthContext";

export default function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">📊 Dashboard Admin</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">👋 {user?.username || "Admin"}</span>
        <Button onPress={logout} color="danger" variant="flat">
          Logout
        </Button>
      </div>
    </div>
  );
}
