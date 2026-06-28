"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PROJECT_STATUSES } from "@/constants/project";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function formatStatus(status: string) {
  return status
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function StatusFilter({ value, onChange }: Props) {
  return (
    <Select
      value={value || "all"}
      onValueChange={(value) => onChange(value === "all" ? "" : value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>

        {PROJECT_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {formatStatus(status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
