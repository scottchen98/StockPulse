import Head from "next/head";

import Dashboard from "@/components/Dashboard";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>StockPulse - Surging with Market Insights</title>
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
      </Head>
      <Dashboard />
    </>
  );
}
