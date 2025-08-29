import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import api from "@/context/api/axios";

export default function ProductForm({
  onProductAdded,
}: {
  onProductAdded: () => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("originalPrice", String(originalPrice));
    formData.append("discount", String(discount));
    if (imageFile) formData.append("image", imageFile);

    console.log({
    name,
    price,
    originalPrice,
    discount,
    imageFile
  });

    try {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // reset form
      setName("");
      setPrice(0);
      setOriginalPrice(0);
      setDiscount(0);
      setImageFile(null);
      onProductAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="number"
        label="Harga"
        value={price.toString()}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <Input type="number" label="Harga Asli (Original Price)" value={originalPrice.toString()} onChange={(e) => setOriginalPrice(Number(e.target.value))} />

      <Input
        type="number"
        label="Diskon (%)"
        value={discount.toString()}
        onChange={(e) => setDiscount(Number(e.target.value))}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <Button onPress={addProduct} color="success">
        Tambah Produk
      </Button>
    </div>
  );
}
