import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <NextNProgress
        color="#dc2626"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ easing: "ease", speed: 500, showSpinner: false }}
      />
      <Component {...pageProps} />;
    </>
  );
}
