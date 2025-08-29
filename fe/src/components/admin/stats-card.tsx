"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useStats } from "@/context/StatsContext";

function formatCurrency(value?: number) {
  return value ? `Rp ${value.toLocaleString("id-ID")}` : "Rp 0";
}

function GrowthIndicator({ value }: { value?: number }) {
  if (value === undefined) return null;

  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const color = isPositive ? "text-emerald-600" : "text-red-600";

  return (
    <div className="flex items-center text-sm">
      <Icon className={`w-4 h-4 mr-1 ${color}`} />
      <span className={`${color} font-medium`}>
        {isPositive ? `+${value}%` : `${value}%`}
      </span>
      <span className="text-gray-500 ml-1">dari bulan lalu</span>
    </div>
  );
}

export default function StatsCards() {
  const { stats, loading } = useStats();

  if (loading) {
    return <p className="text-gray-500">Loading statistik...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Penjualan */}
      <Card shadow="sm" className="p-4">
        <CardHeader className="flex justify-between">
          <h4 className="text-sm font-medium text-gray-500">Total Penjualan</h4>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {formatCurrency(stats?.totalSales)}
          </div>
          <GrowthIndicator value={stats?.salesGrowth} />
        </CardBody>
      </Card>

      {/* Total Pesanan */}
      <Card shadow="sm" className="p-4">
        <CardHeader className="flex justify-between">
          <h4 className="text-sm font-medium text-gray-500">Total Pesanan</h4>
          <ShoppingCart className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stats?.totalOrders?.toLocaleString("id-ID") ?? 0}
          </div>
          <GrowthIndicator value={stats?.ordersGrowth} />
        </CardBody>
      </Card>

      {/* Produk Terjual */}
      <Card shadow="sm" className="p-4">
        <CardHeader className="flex justify-between">
          <h4 className="text-sm font-medium text-gray-500">Produk Terjual</h4>
          <Package className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stats?.productsSold?.toLocaleString("id-ID") ?? 0}
          </div>
          <GrowthIndicator value={stats?.productsGrowth} />
        </CardBody>
      </Card>
    </div>
  );
}
