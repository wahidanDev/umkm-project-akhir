import { Heart, Star, Users } from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { title } from "@/components/primitives";

export function About() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-full shadow-sm mb-6">
            <span className="text-yellow-600 text-sm font-medium">
              🌿 Tentang Kami
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Kenali Lebih Dekat{" "}
            <span className="text-transparent bg-gradient-to-r bg-clip-text">
              <span className={title({ color: "yellow" })}>Toko Kami&nbsp;</span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kami hadir untuk menyediakan perlengkapan ibadah berkualitas,
            membantu memperindah setiap langkah ibadah Anda dengan produk
            terpercaya dan pelayanan ramah.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative group">
            {/* Card dengan overflow-hidden biar img nggak bikin scrollbar */}
            <Card shadow="lg" radius="lg" className="overflow-hidden border-0">
              <CardBody className="p-0 overflow-hidden">
                <img
                  src="/roob.jpg"
                  alt="Tentang Kami"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </CardBody>
            </Card>

            {/* Floating badge di luar card, tetap nempel */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white rounded-2xl px-6 py-4 shadow-lg">
              <p className="text-lg font-bold">2+ Tahun</p>
              <p className="text-sm opacity-90">Pengalaman melayani</p>
            </div>
          </div>

          {/* Right - Text */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Visi & Misi Kami
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Kami percaya bahwa ibadah bukan hanya kewajiban, melainkan juga
              sumber ketenangan dan kebahagiaan. Dengan itu, kami berkomitmen
              untuk menyediakan produk yang berkualitas, terjangkau, dan
              bermanfaat bagi seluruh umat muslim.
            </p>

            {/* Values */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF705B] to-[#FFB457] rounded-xl flex items-center justify-center text-white shadow-md">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dedikasi</h4>
                  <p className="text-gray-600 text-sm">
                    Selalu melayani dengan hati, mengutamakan kenyamanan
                    pelanggan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Kualitas</h4>
                  <p className="text-gray-600 text-sm">
                    Produk berkualitas tinggi, dipilih dengan teliti untuk
                    kebutuhan ibadah.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Komunitas</h4>
                  <p className="text-gray-600 text-sm">
                    Menjadi bagian dari perjalanan ibadah jutaan muslim di
                    seluruh Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
