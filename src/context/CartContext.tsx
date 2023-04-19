import { inferRouterOutputs } from "@trpc/server";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppRouter } from "../server/trpc/router/_app";

type getCartType = inferRouterOutputs<AppRouter>["cart"]["get"] | undefined;
type CartContextType = {
  cart: { data: getCartType | undefined; loading: boolean };
  setCart: ({ data, loading }: { data: getCartType | undefined; loading: boolean }) => void;
};
export const CartContext = createContext<CartContextType>({
  cart: {
    data: undefined,
    loading: true,
  },
  setCart: ({}: { data: getCartType | undefined; loading: boolean }): void => undefined,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();
  const { data, status } = trpc.cart.get.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const [cart, setCart] = useState<{
    data: getCartType | undefined;
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
