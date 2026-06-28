"use client";

import { ProjectSort } from "@/types/project-filter";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: ProjectSort;
  onChange: (value: ProjectSort) => void;
};

const SORT_OPTIONS: {
  value: ProjectSort;
  label: string;
}[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "deadline", label: "Deadline" },
  { value: "budget_desc", label: "Highest Budget" },
  { value: "budget_asc", label: "Lowest Budget" },
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
];

export default function SortProjects({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as ProjectSort)}
    >
      <SelectTrigger className="w-full md:w-[220px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
