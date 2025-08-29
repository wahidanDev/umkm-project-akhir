import { FC } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "react-router-dom";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">☪</span>
              </div>
              <span className="text-xl text-yellow-400 font-semibold">
                Aladdin
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Menyediakan perlengkapan ibadah berkualitas untuk mempermudah
              ibadah umat muslim di seluruh Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              {[                
                { label: "Produk", to: "/produk" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-semibold">Hubungi Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">info@aladdin.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5" />
                <span className="text-gray-400">
                  Jl. Cibangkong Lor No. 13, Bandung
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Aladdin. Semua hak cipta
              dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
