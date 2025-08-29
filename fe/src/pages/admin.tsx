import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import StatsCards from "@/components/admin/stats-card";
import AdminTabs from "@/components/admin/admin-tabs";
import api from "@/context/api/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  return (
    <section className="flex flex-col items-center py-8 md:py-10">
      <div className="max-w-6xl w-full p-8 space-y-6">
        <AdminHeader />
        <StatsCards />
        <AdminTabs products={products} refresh={fetchProducts} />
      </div>
    </section>
  );
}
