import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

export async function getCompanies(skip = 0, take = PAGE_SIZE) {
  const companies = await prisma.company.findMany({
    skip: skip,
    take: take,
    orderBy: {
      id: 'asc', 
    },
  });

  const totalCount = await prisma.company.count();

  return {
    companies,
    totalCount,
    pageSize: PAGE_SIZE,
  };
}