import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import ProdukPage from "@/pages/product";
import AdminPage from "@/pages/admin";
import ProtectedRoute from "./components/protectedRoute";
import RegisterPage from "./pages/register";

function App() {
  return (
    <>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<ProdukPage />} path="/produk" />
        <Route element={<AboutPage />} path="/about" />
        {/* Admin hanya bisa diakses jika login & role=admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* 👇 taruh toaster di sini supaya global */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
