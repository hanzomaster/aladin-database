import { inferRouterOutputs } from "@trpc/server";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppRouter } from "../server/trpc/router/_app";
import { trpc } from "@utils/trpc";

type CartContextType = {
  cart: { data: inferRouterOutputs<AppRouter>["cart"]["get"] | undefined; loading: boolean };
  setCart: (item: any) => void;
};
export const CartContext = createContext<CartContextType>({
  cart: {
    data: undefined,
    loading: true,
  },
  setCart: (item: any): void => undefined,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();
  const { data, status } = trpc.cart.get.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const [cart, setCart] = useState<{
    data: inferRouterOutputs<AppRouter>["cart"]["get"] | undefined;
    loading: boolean;
  }>({
    data: undefined,
    loading: true,
  });
  useEffect(() => {
    const loading = status === "loading";
    setCart({ data, loading });
  }, [data, status]);
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
