import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import NewsCard from "@/components/NewsCard";
import { formatDistanceDay } from "@/helpers/time";
import { useMarketNews } from "@/hooks/news/useMarketNews";

export default function News() {
  const { marketNews, isLoadingNews, error } = useMarketNews();

  if (isLoadingNews) return <Loading />;
  if (!marketNews)
    return (
      <Alert
        variant="default"
        title="Sorry!"
        description="No news available at the moment 😢"
      />
    );

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 gap-10 pb-[110px] md:grid-cols-[repeat(2,320px)] lg:grid-cols-[repeat(3,320px)] lg:pb-24 2xl:grid-cols-[repeat(4,320px)] 3xl:grid-cols-[repeat(5,320px)]">
        {marketNews?.map((news) => {
          const {
            category,
            datetime,
            headline,
            id,
            image,
            source,
            summary,
            url,
          } = news;
          return (
            <div key={id} className="grid items-center justify-center">
              <NewsCard
                category={category}
                // Multiply timestamp by 1000 to convert to milliseconds
                datetime={formatDistanceDay(new Date(datetime * 1000))}
                headline={headline}
                image={image}
                source={source}
                summary={summary}
                url={url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
