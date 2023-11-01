// src/pages/_app.tsx
import { trpc } from "@utils/trpc";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import Head from "next/head";
import { redirect } from "react-router-dom";
import { ToastProvider } from "../components/Toast";
import Footer from "../components/footer";
import { CartProvider } from "../context/CartContext";
import "../styles/globals.css";

export { reportWebVitals } from "next-axiom";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  redirect("/home");
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <ToastProvider>
          <Head>
            <title>Aladin</title>
            <meta name="description" content="An E-commerce website" />
            <link rel="icon" href="/icon3.ico" />
          </Head>
          <Component {...pageProps} />
          <Footer />
        </ToastProvider>
      </CartProvider>
      <Analytics />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
