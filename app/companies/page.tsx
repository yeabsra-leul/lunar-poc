import Companies from "@/components/company/Companies";
import { getCompanies } from "@/lib/queries/company";

export default async function CompaniesPage() {
  const [initialCompaniesData] = await Promise.all([getCompanies(0)]);

  return (
    <Companies
      initialCompanies={initialCompaniesData.companies}
      initialSkip={initialCompaniesData.pageSize}
      totalCount={initialCompaniesData.totalCount}
    />
  );
}
