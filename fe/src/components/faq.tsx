import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Badge } from "@heroui/badge";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  ShieldCheckIcon,
  TruckIcon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

const FAQPage = () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(["1"]);

  const faqData = [
    {
      id: "1",
      question: "Apa itu website UMKM Aladdin?",
      answer: "Website UMKM Aladdin adalah platform e-commerce yang menyediakan berbagai produk berkualitas tinggi, khususnya produk-produk yang berkaitan dengan kebutuhan sehari-hari. Kami berkomitmen untuk memberikan pengalaman berbelanja yang aman, nyaman, dan terpercaya."
    },
    {
      id: "2",
      question: "Bagaimana cara melakukan pemesanan?",
      answer: "Untuk melakukan pemesanan: 1) Pilih produk yang diinginkan, 2) Klik 'Tambah ke Keranjang', 3) Periksa keranjang belanja Anda, 4) Klik 'Checkout', 5) Isi informasi pengiriman, 6) Pilih metode pembayaran, 7) Konfirmasi pesanan."
    },
    {
      id: "3",
      question: "Metode pembayaran apa saja yang tersedia?",
      answer: "Saat ini kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, DANA), dan pembayaran tunai saat pengambilan (COD). Kami terus menambahkan metode pembayaran baru untuk kenyamanan pelanggan."
    },
    {
      id: "4",
      question: "Berapa lama waktu pengiriman?",
      answer: "Waktu pengiriman bervariasi tergantung lokasi pengiriman. Untuk area dalam kota: 1-2 hari kerja, untuk area luar kota: 2-5 hari kerja. Kami akan memberikan estimasi waktu pengiriman yang lebih detail saat checkout."
    },
    {
      id: "5",
      question: "Apakah ada garansi untuk produk?",
      answer: "Ya, semua produk kami memiliki garansi sesuai dengan kebijakan masing-masing brand. Untuk produk elektronik biasanya 1 tahun, sedangkan untuk produk fashion dan aksesoris memiliki garansi 7-30 hari tergantung jenis produk."
    },
    {
      id: "6",
      question: "Bagaimana jika produk yang diterima rusak?",
      answer: "Jika produk yang diterima rusak, segera hubungi customer service kami dalam waktu maksimal 24 jam setelah penerimaan. Kami akan membantu proses pengembalian atau penggantian produk sesuai dengan kebijakan yang berlaku."
    },
    {
      id: "7",
      question: "Bagaimana cara menghubungi customer service?",
      answer: "Anda dapat menghubungi customer service kami melalui: WhatsApp: 0812-3456-7890, Email: cs@aladdin-umkm.com, atau melalui fitur chat di website. Customer service kami siap melayani 24/7."
    }
  ];

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              FAQ - <span className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">Pertanyaan Umum</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang website UMKM Aladdin
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white shadow-lg">
            <CardBody className="text-center p-6">
              <ShoppingCartIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Belanja Aman
              </h3>
              <p className="text-sm text-gray-600">
                Transaksi aman dengan berbagai metode pembayaran
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardBody className="text-center p-6">
              <TruckIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Pengiriman Cepat
              </h3>
              <p className="text-sm text-gray-600">
                Pengiriman 1-5 hari kerja ke seluruh Indonesia
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardBody className="text-center p-6">
              <ShieldCheckIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Garansi Produk
              </h3>
              <p className="text-sm text-gray-600">
                Garansi resmi untuk semua produk yang dijual
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardBody className="text-center p-6">
              <UserIcon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Customer Service 24/7
              </h3>
              <p className="text-sm text-gray-600">
                Layanan pelanggan siap membantu kapan saja
              </p>
            </CardBody>
          </Card>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl">
            <CardHeader className="pb-0">
              <h2 className="text-2xl font-bold text-gray-900">
                Pertanyaan Umum
              </h2>
            </CardHeader>
            <CardBody>
              <Accordion
                variant="splitted"
                selectedKeys={expandedKeys}
                onSelectionChange={(keys) => setExpandedKeys(Array.from(keys as Set<string>))}
                className="gap-2"
              >
                {faqData.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    aria-label={faq.question}
                    title={
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <Badge color="primary" variant="flat" size="sm">
                          FAQ #{faq.id}
                        </Badge>
                      </div>
                    }
                  >
                    <div className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardBody>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white">
            <CardBody className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">
                Masih Punya Pertanyaan?
              </h3>
              <p className="text-blue-100 mb-6">
                Tim customer service kami siap membantu menjawab pertanyaan Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  color="primary"
                  variant="solid"
                  startContent={<PhoneIcon className="w-4 h-4" />}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Hubungi Kami
                </Button>
                <Button
                  color="primary"
                  variant="bordered"
                  startContent={<EnvelopeIcon className="w-4 h-4" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Kirim Email
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 