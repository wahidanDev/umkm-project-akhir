import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { productApi } from "./api/productApi";

export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  isNewProduct?: boolean;
  discount?: number;
}

interface ProductContextType {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (data: FormData) => Promise<Product>;
  updateProduct: (id: string, data: FormData | Record<string, any>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const data = await productApi.getAll();
    setProducts(data);
  };

  const addProduct = async (data: FormData) => {
    const newProduct = await productApi.create(data);
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id: string, data: FormData | Record<string, any>) => {
    const updated = await productApi.update(id, data);
    setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    return updated;
  };

  const deleteProduct = async (id: string) => {
    await productApi.delete(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
}
