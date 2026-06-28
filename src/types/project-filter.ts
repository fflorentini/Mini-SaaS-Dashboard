export type ProjectSort =
  | "newest"
  | "oldest"
  | "deadline"
  | "budget_asc"
  | "budget_desc"
  | "name_asc"
  | "name_desc";

export type ProjectFilters = {
  search: string;
  status: string;
  sort: ProjectSort;
};
