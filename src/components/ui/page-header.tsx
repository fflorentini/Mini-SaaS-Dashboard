import * as React from "react";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/ui/theme-toggle";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3">
          {actions}
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
