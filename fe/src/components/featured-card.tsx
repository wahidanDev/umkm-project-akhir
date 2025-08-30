import { Button } from "@heroui/button";
import { ProductCard } from "./product-card";
import { productApi } from "@/context/api/productApi";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";


type Category = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  isNew?: boolean;
  discount?: number;
};


export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi
      .getAll()
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((err: any) => {
        console.error("Gagal fetch products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      

      <div className="container mx-auto px-4 relative z-10">
        

        {/* Products grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Belum ada produk tersedia.
          </p>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF705B] to-[#FFB457] rounded-2xl blur-lg opacity-30" />
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-[#FF705B] to-[#FFB457] hover:from-yellow-700 hover:to-teal-700 text-white px-10 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl font-semibold text-lg"
              endContent={<ArrowRight className="w-5 h-5" />}
            >
              🛍️ Lihat Semua Produk
            </Button>
          </div>
          <p className="text-gray-500 mt-4 text-sm">
            Temukan lebih dari 500+ produk perlengkapan ibadah berkualitas
          </p>
        </div>
      </div>
    </section>
  );
}
