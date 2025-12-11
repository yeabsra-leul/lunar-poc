import { getArticles } from "../queries/article";

export interface FilterGroup {
  name: string;
  options: string[];
}

export type ArticlesArrayType = Awaited<ReturnType<typeof getArticles>>;