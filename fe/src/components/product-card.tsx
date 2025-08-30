import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: { _id: string; name: string };
  isNew?: boolean;
  discount?: number;
}

export function ProductCard({
  _id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  discount,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('Card clicked, navigating to:', `/produk/${_id}`);
    navigate(`/produk/${_id}`);
  };

  const handleAddToCart = () => {
    addToCart({ _id, name, price, image });
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="cursor-pointer group transition-all duration-500 overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 rounded-xl shadow-sm hover:shadow-lg"
    >
      {/* Gambar + overlay + action */}
      <div className="relative aspect-square overflow-hidden">
        <img
          alt={name}
          src={image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded shadow-lg">
              ✨ Baru
            </span>
          )}
          {discount && (
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded shadow-lg animate-pulse">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          {/* Heart */}
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className={`bg-white/90 backdrop-blur-sm shadow-lg rounded-full transition-colors ${
              liked ? "text-white bg-red-400" : "text-gray-700 hover:text-yellow-600"
            }`}
            onPress={handleLike}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick add to cart */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button
            fullWidth
            onPress={handleAddToCart}
            className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] hover:from-yellow-700 hover:to-teal-700 text-white shadow-lg rounded-xl"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Tambah ke Keranjang
          </Button>
        </div>
      </div>

      {/* Konten card */}
      <div className="p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="flat"
              color="success"
              className="text-xs font-medium"
            >
              {category?.name}
            </Badge>
          </div>
          <h3 className="text-gray-900 group-hover:text-yellow-600 transition-colors duration-300 font-semibold leading-snug">
            {name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">
              Rp {price.toLocaleString("id-ID")}
            </span>
            {originalPrice && originalPrice > 0 && (
              <span className="text-sm text-gray-400 line-through">
                Rp {originalPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500 px-6 pb-4">
        <div className="flex items-center">🚚 Gratis Ongkir</div>
        <div className="flex items-center">✅ Garansi Original</div>
      </div>
    </div>
  );
}
