// src/pages/_app.tsx
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import Head from "next/head";
import Footer from "../components/footer";
import { ToastProvider } from "../components/Toast";
import { CartProvider } from "../context/CartContext";

import "../styles/globals.css";
import { trpc } from "../utils/trpc";

export { reportWebVitals } from "next-axiom";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <CartProvider>
      <SessionProvider session={session}>
        <ToastProvider>
          <Head>
            <title>Aladin</title>
            <meta name="description" content="An E-commerce website" />
            <link rel="icon" href="/icon3.ico" />
          </Head>
          <Component {...pageProps} />
          <Footer />
        </ToastProvider>
      </SessionProvider>
    </CartProvider>
  );
};

export default trpc.withTRPC(MyApp);
