import { FilterGroup } from "../types/news-types";

export const FILTERS: FilterGroup[] = [
  {
    name: "Category",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    name: "Industry",
    options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  },
];

export const COMPANY_TAGS_MAP: { [key: string]: string } = {
  "1": "Big company",
  "2": "Urgent",
  "3": "Hot",
};
