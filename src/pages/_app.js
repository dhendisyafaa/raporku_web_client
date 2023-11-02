import "@/styles/globals.css";
import axios from "axios";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";

axios.defaults.withCredentials = true;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Education App" />
        <meta name="keywords" content="Education App" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <title>Raporku</title>
      </Head>
      <main>
        <SessionProvider session={session}>
          <NextTopLoader
            color="#FE5E44"
            initialPosition={0.3}
            crawlSpeed={500}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={500}
            shadow="0 0 10px #FE5E44,0 0 5px #FE5E44"
            zIndex={1600}
            showAtBottom={false}
          />
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  );
}
