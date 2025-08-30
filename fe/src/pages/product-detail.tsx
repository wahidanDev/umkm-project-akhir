import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import DefaultLayout from "@/layouts/default";
import { productApi } from "@/context/api/productApi";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: { _id: string; name: string };
  isNew?: boolean;
  discount?: number;
  description?: string;
  stock?: number;
  rating?: number;
  reviews?: number;
}

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (productId) {
      console.log("Fetching product with ID:", productId);
      productApi
        .getById(productId)
        .then((data: Product) => {
          console.log("Product data received:", data);
          setProduct(data);
          setSelectedImage(data.image);
        })
        .catch((err: any) => {
          console.error("Gagal fetch product:", err);
          console.error("Error details:", err.response?.data || err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      // Add to cart with selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart({ 
          _id: product._id, 
          name: product.name, 
          price: product.price, 
          image: product.image 
        });
      }
      toast.success(`${quantity} ${product.name} ditambahkan ke keranjang!`);
    }
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat produk...</p>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (!product) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Produk Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">Produk yang Anda cari tidak tersedia.</p>
            <Button 
              color="primary" 
              onPress={() => navigate('/produk')}
              startContent={<ArrowLeft className="w-4 h-4" />}
            >
              Kembali ke Produk
            </Button>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="light"
            onPress={() => navigate('/produk')}
            startContent={<ArrowLeft className="w-4 h-4" />}
            className="mb-6"
          >
            Kembali ke Produk
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4">
                <div 
                  className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === product.image ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(product.image)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Add more thumbnail images here if available */}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge color="success" variant="flat">
                    {product.category?.name}
                  </Badge>
                  {product.isNew && (
                    <Badge color="warning" variant="flat">
                      ✨ Baru
                    </Badge>
                  )}
                  {product.discount && (
                    <Badge color="danger" variant="flat">
                      -{product.discount}% OFF
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= (product.rating || 5)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({product.reviews || 0} ulasan)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      Rp {product.originalPrice.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="text-green-600 font-semibold">
                    Hemat Rp {((product.originalPrice || product.price) - product.price).toLocaleString("id-ID")}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Jumlah</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => handleQuantityChange('decrease')}
                      disabled={quantity <= 1}
                      className="rounded-r-none"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-lg font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => handleQuantityChange('increase')}
                      className="rounded-l-none"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-gray-600">
                    Stok: {product.stock || 'Tersedia'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  fullWidth
                  size="lg"
                  onPress={handleAddToCart}
                  startContent={<ShoppingCart className="w-5 h-5" />}
                  className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] hover:from-yellow-700 hover:to-teal-700 text-white font-semibold py-6"
                >
                  Tambah ke Keranjang
                </Button>
                
                <Button
                  fullWidth
                  size="lg"
                  variant="bordered"
                  onPress={() => setLiked(!liked)}
                  startContent={<Heart className={`w-5 h-5 ${liked ? 'fill-current text-red-500' : ''}`} />}
                  className="border-2 border-gray-300 hover:border-red-500"
                >
                  {liked ? 'Disukai' : 'Sukai Produk'}
                </Button>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Gratis Ongkir</h4>
                    <p className="text-sm text-gray-600">Min. pembelian Rp 100.000</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Garansi Original</h4>
                    <p className="text-sm text-gray-600">100% produk asli</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Produk Terkait
            </h2>
            {/* Add related products component here */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
} 