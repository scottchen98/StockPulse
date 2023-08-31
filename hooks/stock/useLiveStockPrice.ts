import useWebSocket from "react-use-websocket";

import { useEffect, useState } from "react";

import { TradeData } from "@/Interface/ILiveTrade";

export function useLiveStockPrice(
  symbol: string,
  prevSymbol: string,
  isMarketOpen: boolean
) {
  const [price, setPrice] = useState<number | null>(null);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_FINNHUB_WEBSOCKET_URL}?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`,
    {
      onOpen: () => console.log("opened!"),
      onClose: () => console.log("closed!"),
      onError: (e) => console.log("error!", e),
    },
    isMarketOpen
  );

  useEffect(() => {
    setPrice(null);
    sendJsonMessage({
      type: "unsubscribe",
      symbol: prevSymbol,
    });
    sendJsonMessage({
      type: "subscribe",
      symbol,
    });
  }, [symbol, prevSymbol, sendJsonMessage]);

  useEffect(() => {
    if (!lastJsonMessage) {
      return;
    }

    const { data: liveData } = lastJsonMessage as unknown as TradeData;

    if (!liveData || liveData.length === 0) return;
    const { p: currentPrice } = liveData[liveData.length - 1];

    setPrice(+currentPrice.toFixed(2));
  }, [lastJsonMessage]);

  return { price };
}
