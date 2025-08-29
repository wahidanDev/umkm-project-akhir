import { useState } from "react";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";

import { title, subtitle } from "@/components/primitives";
const Hero = () => {
  const [slide, setSlide] = useState(0);
  const totalSlides = 3;
  return (
    <>
      <div className="flex items-center justify-between max-w-[1200px] mx-auto px-6">
        {/* Kiri */}
        <div className="text-left">
          <span className={title()}>Lengkapi&nbsp;</span>
          <span className={title({ color: "yellow" })}>ibadah&nbsp;</span>
          <span className={title()}>dengan Perlengkapan Muslim Terbaik.</span>
        </div>

        {/* Kanan */}
        <div className="text-left max-w-md">
          <div className={subtitle({ class: "mb-4" })}>
            Sajadah, Busana muslim, Parfum, dan perlengkapan ibadah lengkap
            untuk Anda.
          </div>
          <Button
            className="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            radius="full"
          >
            Belanja Sekarang
          </Button>
        </div>
      </div>

      <div className="w-full my-6 px-6">
        <div className="relative w-full h-[500px] flex gap-6 overflow-hidden rounded-xl">
          {/* Slide 1 */}
          <section
            className={`relative h-full transition-all duration-500 ease-in-out rounded-xl shadow-md bg-cover bg-center
        ${slide === 0 ? "w-2/1" : "w-1/14"}`}
            style={{ backgroundImage: "url('/1.png')" }}
          >
            <div className="p-6 h-full">
              <h1
                className={`font-bold transition-all duration-700 ease-in-out text-white
            ${
              slide === 0
                ? "text-4xl text-left opacity-100 mb-4"
                : "text-4xl [writing-mode:vertical-rl] h-full flex items-center"
            }`}
              >
                Produk Unggulan
              </h1>

              {slide === 0 && (
                <p className="max-w-md text-left text-2xl font-bold text-white transition-all duration-700 ease-in-out opacity-100">
                  Busana muslim, sejadah, parfum, dan sarung berkualitas tinggi.
                  Produk favorit pelanggan! Tersedia dalam berbagai pilihan
                  model dan ukuran dengan kualitas terjamin. Cocok digunakan
                  sehari-hari maupun untuk acara spesial, sehingga selalu tampil
                  percaya diri.
                </p>
              )}

              {slide === 0 && (
                <Button
                  onPress={() => setSlide((slide + 1) % totalSlides)}
                  color="primary"
                  variant="shadow"
                  radius="full"
                  className="absolute right-2 bottom-2 bg-linear-to-tr from-pink-500 to-yellow-500 text-white outline outline-16 outline-white"
                >
                  <ArrowRight />
                </Button>
              )}
            </div>
          </section>

          {/* Slide 2 */}
          <section
            className={`relative h-full transition-all duration-500 ease-in-out rounded-xl shadow-md bg-cover bg-center
        ${slide === 1 ? "w-2/1" : "w-1/14"}`}
            style={{ backgroundImage: "url('/2.png')" }}
          >
            <div className="p-6 h-full">
              <h1
                className={`font-bold transition-all duration-700 ease-in-out text-white
            ${
              slide === 1
                ? "text-4xl text-left opacity-100 mb-4"
                : "text-4xl [writing-mode:vertical-rl] h-full flex items-center"
            }`}
              >
                Promo & Penawaran
              </h1>

              {slide === 1 && (
                <p className="max-w-md text-left text-2xl font-bold text-white transition-all duration-700 ease-in-out opacity-100">
                  Diskon spesial paket busana + sejadah + parfum. Harga
                  bersahabat dan terbatas! Segera dapatkan sebelum kehabisan,
                  promo ini hanya berlaku sampai akhir bulan. Nikmati kualitas
                  premium dengan harga terbaik untuk menunjang ibadah Anda.
                </p>
              )}

              {slide === 1 && (
                <Button
                  onPress={() => setSlide((slide + 1) % totalSlides)}
                  color="primary"
                  variant="shadow"
                  radius="full"
                  className="absolute right-2 bottom-2 bg-linear-to-tr from-pink-500 to-yellow-500 text-white outline outline-16 outline-white"
                >
                  <ArrowRight />
                </Button>
              )}
            </div>
          </section>

          {/* Slide 3 */}
          <section
            className={`relative h-full transition-all duration-500 ease-in-out rounded-xl shadow-md bg-cover bg-center
        ${slide === 2 ? "w-2/1" : "w-1/14"}`}
            style={{ backgroundImage: "url('/3.png')" }}
          >
            <div className="p-6 h-full">
              <h1
                className={`font-bold transition-all duration-700 ease-in-out text-white
            ${
              slide === 2
                ? "text-4xl text-left opacity-100 mb-4"
                : "text-4xl [writing-mode:vertical-rl] h-full flex items-center"
            }`}
              >
                Keunggulan & Layanan
              </h1>

              {slide === 2 && (
                <p className="max-w-md text-left text-2xl font-bold text-white transition-all duration-700 ease-in-out opacity-100">
                  Testimoni pelanggan, layanan ramah, pengiriman cepat. Belanja
                  aman dan nyaman. Ribuan pelanggan puas dengan kualitas produk
                  dan pelayanan kami. Dukungan pelanggan tersedia setiap hari
                  untuk memastikan pengalaman belanja Anda selalu menyenangkan.
                </p>
              )}

              {slide === 2 && (
                <Button
                  onPress={() => setSlide((slide + 1) % totalSlides)}
                  color="primary"
                  variant="shadow"
                  radius="full"
                  className="absolute right-2 bottom-2 bg-linear-to-tr from-pink-500 to-yellow-500 text-white outline outline-16 outline-white"
                >
                  <ArrowRight />
                </Button>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Hero;
