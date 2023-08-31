import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { NewsArticle } from "@/Interface/IMarketNews";

export default function NewsCard({
  category,
  datetime,
  headline,
  image,
  source,
  summary,
  url,
}: Omit<NewsArticle, "id" | "datetime" | "related"> & { datetime: string }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <Card
      className={`${
        isShown ? "border-gray-500" : ""
      } relative flex h-[440px] max-w-xs flex-col items-center justify-center rounded-2xl shadow-2xl dark:shadow-[0_25px_50px_-12px_rgba(250,250,250,0.25);]`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <CardHeader>
        <Badge className="w-fit text-[10px] font-bold leading-3">
          {category}
        </Badge>
        <CardTitle className="line-clamp-3 text-2xl font-bold tracking-tight">
          {headline}
        </CardTitle>
        <Button
          asChild
          className={`${
            isShown ? "lg:inline-flex" : "lg:hidden"
          } absolute right-[7px] top-[1px] rounded-xl px-2 font-bold`}
        >
          <Link href={`${url}`} target="_blank" className="ml-1">
            Read post{" "}
            <span className="ml-1">
              <ExternalLink />
            </span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex items-center space-x-2 text-xs font-medium">
          <p className="border-r-[1px] border-[#374151] pr-2 dark:border-[#e5e7eb]">
            {datetime}
          </p>
          <p>{source}</p>
        </div>
        <CardDescription className="text-md mb-3 mt-1 line-clamp-2 tracking-tight">
          {summary}
        </CardDescription>
        <Image
          className="h-40 rounded-xl object-cover"
          src={image}
          width={302}
          height={200}
          alt={`${headline} image`}
        />
      </CardContent>
    </Card>
  );
}
