export async function getNews() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FINNHUB_URL}/api/v1/news?category=general&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch news`);
  }
  const data = await response.json();
  return data;
}
