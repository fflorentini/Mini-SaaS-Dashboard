import SearchBar from "@/components/SearchBar";
import SortProjects from "@/components/SortProjects";
import StatusFilter from "@/components/StatusFilter";

import { ProjectFilters } from "@/types/project-filter";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataToolbar } from "@/components/ui/data-toolbar";

type Props = {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
};

export default function FilterToolbar({ filters, onFiltersChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>

        <CardDescription>
          Search, filter and sort your projects.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <DataToolbar>
          <SearchBar
            value={filters.search}
            onChange={(value) =>
              onFiltersChange({
                ...filters,
                search: value,
              })
            }
          />

          <StatusFilter
            value={filters.status}
            onChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value,
              })
            }
          />

          <SortProjects
            value={filters.sort}
            onChange={(value) =>
              onFiltersChange({
                ...filters,
                sort: value,
              })
            }
          />
        </DataToolbar>
      </CardContent>
    </Card>
  );
}
