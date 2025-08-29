import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { useNavigate } from "react-router-dom";
import api from "@/context/api/axios";
import { useState } from "react";
import toast from "react-hot-toast"; 

export function CartButton() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const items = cart.map((item) => ({
      product: item._id,
      name: item.name,
      price: item.price,
      qty: 1,
    }));

    try {
      setLoading(true);
      await api.post("/orders/checkout", { items, total });
      clearCart();
      localStorage.removeItem("cart");
      toast.success("Checkout berhasil! 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Checkout gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="fixed top-30 right-200 bg-yellow-600 text-white p-4 rounded-full shadow-lg hover:bg-yellow-700 transition animate-bounce"
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
            {cart.length}
          </span>
        )}
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Keranjang Belanja
              </ModalHeader>

              <ModalBody>
                {cart.length === 0 ? (
                  <p className="text-gray-600">Keranjang masih kosong</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item._id);
                          if (cart.length === 1) onClose();
                        }}
                        className="text-red-500 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  ))
                )}
              </ModalBody>

              {cart.length > 0 && (
                <ModalFooter className="flex flex-col gap-2">
                  <div className="flex justify-between w-full text-lg font-semibold">
                    <span>Total:</span>
                    <span>Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`w-full py-2 rounded-lg transition ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-600 text-white hover:bg-yellow-700"
                    }`}
                  >
                    {loading ? "Memproses..." : "Checkout"}
                  </button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
