"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@heroui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { productApi } from "@/context/api/productApi";
import { Product } from "@/context/ProductContext";

interface TopProduct extends Product {
  sold: number;
  revenue: number;
  trend: "up" | "down";
}

export default function TopProductsCard() {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const data = await productApi.getTop();
        setTopProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTop();
  }, []);

  if (topProducts.length === 0) {
    return <p className="text-center text-gray-500 mt-6">Belum ada produk terlaris.</p>;
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <h2 className="text-lg font-bold">Top 5 Produk Terlaris</h2>
      </CardHeader>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4">
        {topProducts.map((product, index) => (
          <div
            key={product._id}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-300 bg-white"
          >
            {/* Ranking + Nama */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 font-medium">{index + 1}</span>
              </div>
              <div>
                <h4 className="text-gray-800 font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.sold ?? 0} terjual</p>
              </div>
            </div>

            {/* Revenue + Trend */}
            <div className="text-right flex flex-col items-end gap-1">
              <div className="text-lg font-semibold text-gray-800">
                Rp {(product.revenue ?? 0).toLocaleString("id-ID")}
              </div>
              <div className="flex items-center justify-end">
                {product.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
