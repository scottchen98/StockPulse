import { useQuery } from "@tanstack/react-query";

import { getNews } from "@/services/apiNews";
import { NewsArticle } from "@/Interface/IMarketNews";

export function useMarketNews() {
  const {
    data,
    isLoading: isLoadingNews,
    error,
  } = useQuery<NewsArticle[]>({
    queryKey: ["market-news"],
    queryFn: () => getNews(),
    retry: false,
    staleTime: 900000, // 15 minutes
  });

  // Remove the colon if the headline starts with it
  const marketNews = data?.map((news) => {
    return news.headline[0] === ":"
      ? {
          ...news,
          headline: news.headline.slice(1),
        }
      : news;
  });
  return { marketNews, isLoadingNews, error };
}
