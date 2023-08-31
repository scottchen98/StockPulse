import Head from "next/head";

import News from "@/components/News";

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>StockPulse - Top 100 Market News</title>
        <meta
          property="og:title"
          content="StockPulse - Top 100 Market News"
          key="news"
        />
        <meta
          name="description"
          content="Get all the latest news in the market on StockPulse."
          key="desc"
        />
        <meta
          property="og:description"
          content="Get all the latest news in the market on StockPulse."
        />
      </Head>
      <News />
    </>
  );
}
