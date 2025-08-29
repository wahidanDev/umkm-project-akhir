import { Button } from "@heroui/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import api from "@/context/api/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image?: string;
}

export default function ProductTable({ products, refresh }: { products: Product[]; refresh: () => void }) {
  const deleteProduct = async (id: string) => {
    await api.delete(`/products/${id}`);
    refresh();
  };

  return (
    <Table aria-label="Daftar Produk" className="mt-4">
      <TableHeader>
        <TableColumn>Gambar</TableColumn>
        <TableColumn>Nama</TableColumn>
        <TableColumn>Harga</TableColumn>
        <TableColumn>Harga Asli</TableColumn>
        <TableColumn>Diskon</TableColumn>
        <TableColumn>Aksi</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p._id}>
            <TableCell>{p.image ? <img src={p.image} alt={p.name} className="w-16 h-16 object-cover mx-auto" /> : "—"}</TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>Rp {p.price.toLocaleString("id-ID")}</TableCell>
            <TableCell>{p.originalPrice && p.originalPrice > 0 ? `Rp ${p.originalPrice.toLocaleString("id-ID")}` : "—"}</TableCell>
            <TableCell>{p.discount ? `${p.discount}%` : "—"}</TableCell>
            <TableCell>
              <Button color="danger" size="sm" onPress={() => deleteProduct(p._id)}>Hapus</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
