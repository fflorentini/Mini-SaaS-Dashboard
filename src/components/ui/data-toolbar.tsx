import * as React from "react";

import { cn } from "@/lib/utils";

type DataToolbarProps = {
  children: React.ReactNode;
  className?: string;
};

export function DataToolbar({ children, className }: DataToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:items-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
