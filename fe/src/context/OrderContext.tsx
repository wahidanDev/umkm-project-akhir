import { createContext, useContext, useState, ReactNode } from "react";
import { orderApi } from "./api/orderApi";

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  checkout: (items: OrderItem[], total: number) => Promise<Order>;
  fetchMyOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const checkout = async (items: OrderItem[], total: number) => {
    const newOrder = await orderApi.checkout(items, total);
    setOrders((prev) => [...prev, newOrder]);
    return newOrder;
  };

  const fetchMyOrders = async () => {
    const data = await orderApi.getMyOrders();
    setOrders(data);
  };

  return (
    <OrderContext.Provider value={{ orders, checkout, fetchMyOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
}
