import { prisma } from "@/lib/prisma";

export async function getArticles() {
  const news = await prisma.news.findMany({
    include: {
      news_source: true,
      company_news: {
        include: { company: true },
      },
    },
  });

  return news;
}
