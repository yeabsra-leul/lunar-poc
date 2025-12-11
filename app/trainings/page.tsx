import ArticleReview from "@/components/article/ArticleReview";
import { getArticles } from "@/lib/queries/article";

export default async function TrainingsPage() {
  const [articles] = await Promise.all([getArticles()]);

  return <ArticleReview articles={articles} />;
}
