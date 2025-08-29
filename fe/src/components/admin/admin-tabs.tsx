import { Tabs, Tab } from "@heroui/tabs";
import ProductForm from "./product-form";
import ProductTable from "./product-table";
import TopProducts from "../top-products";


export default function AdminTabs({ products, refresh }: { products: any[]; refresh: () => void }) {
  return (
    <Tabs aria-label="Dashboard Admin" color="primary" variant="underlined">
      <Tab key="add" title="Tambah Produk">
        <ProductForm onProductAdded={refresh} />
        <ProductTable products={products} refresh={refresh} />
      </Tab>

      

      <Tab key="top" title="Top Produk">
  <TopProducts />
</Tab>
    </Tabs>
  );
}
