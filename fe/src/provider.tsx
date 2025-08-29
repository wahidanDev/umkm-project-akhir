
import type { NavigateOptions } from "react-router-dom";
import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import { StatsProvider } from "./context/StatsContext";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <OrderProvider>
              <StatsProvider>{children}</StatsProvider>
            </OrderProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}
