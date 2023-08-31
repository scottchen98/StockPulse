import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head title="StockPulse - Surging with Market Insights">
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta
          property="og:title"
          content="StockPulse - Surging with Market Insights"
          key="title"
        />
        <meta
          name="description"
          content="Elevate your investment game with the sleek, real-time stock insights tool."
          key="desc"
        />
        <meta
          property="og:description"
          content="Elevate your investment game with the sleek, real-time stock insights tool."
        />
        <meta
          property="og:image"
          content="https://s-pulse.vercel.app/meta.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
