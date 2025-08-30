import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  ShoppingCart
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import DefaultLayout from "@/layouts/default";
import api from "@/context/api/axios";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const items = cart.map((item) => ({
      product: item._id,
      name: item.name,
      price: item.price,
      qty: item.quantity,
    }));

    try {
      setLoading(true);
      await api.post("/orders/checkout", { items, total });
      clearCart();
      localStorage.removeItem("cart");
      toast.success("Checkout berhasil! 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Checkout gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <DefaultLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <Button
              variant="light"
              onPress={() => navigate(-1)}
              startContent={<ArrowLeft className="w-4 h-4" />}
              className="mb-6"
            >
              Kembali
            </Button>

            {/* Empty Cart */}
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Kosong</h2>
              <p className="text-gray-600 mb-8">Belum ada produk di keranjang belanja Anda.</p>
              <Button
                color="primary"
                onPress={() => navigate('/produk')}
                className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white"
              >
                Mulai Belanja
              </Button>
            </div>
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
            onPress={() => navigate(-1)}
            startContent={<ArrowLeft className="w-4 h-4" />}
            className="mb-6"
          >
            Kembali
          </Button>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
              <p className="text-gray-600 mt-2">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} • {cart.reduce((sum, item) => sum + item.quantity, 0)} total
              </p>
            </div>
            <Badge color="primary" variant="flat" size="lg">
              Rp {total.toLocaleString("id-ID")}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Produk</h2>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-gray-600 mb-2">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                        
                        {/* Quantity Control */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => updateQuantity(item._id, item.quantity - 1)}
                              className="rounded-r-none"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => updateQuantity(item._id, item.quantity + 1)}
                              className="rounded-l-none"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Ringkasan Pesanan</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-semibold">Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span className="text-green-600 font-semibold">Gratis</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>Rp {total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                <Button
                  fullWidth
                  size="lg"
                  onPress={handleCheckout}
                  disabled={loading}
                  startContent={loading ? null : <CreditCard className="w-5 h-5" />}
                  className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] hover:from-yellow-700 hover:to-teal-700 text-white font-semibold py-6"
                >
                  {loading ? "Memproses..." : "Checkout Sekarang"}
                </Button>

                <div className="mt-4 text-center">
                  <Button
                    variant="light"
                    onPress={() => navigate('/produk')}
                    className="text-gray-600"
                  >
                    Lanjutkan Belanja
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
} 