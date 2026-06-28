import { Project } from "@/types/project";

import { Card, CardContent } from "@/components/ui/card";

import {
  FolderKanban,
  CircleCheckBig,
  CirclePause,
  CircleDashed,
  DollarSign,
} from "lucide-react";

type Props = {
  projects: Project[];
};

export default function DashboardStats({ projects }: Props) {
  const totalProjects = projects.length;

  const activeProjects = projects.filter((p) => p.status === "active").length;

  const onHoldProjects = projects.filter((p) => p.status === "on hold").length;

  const completedProjects = projects.filter(
    (p) => p.status === "completed",
  ).length;

  const totalBudget = projects.reduce(
    (sum, project) => sum + project.budget,
    0,
  );

  const stats = [
    {
      label: "Projects",
      value: totalProjects,
      icon: FolderKanban,
    },
    {
      label: "Active",
      value: activeProjects,
      icon: CircleCheckBig,
    },
    {
      label: "On Hold",
      value: onHoldProjects,
      icon: CirclePause,
    },
    {
      label: "Completed",
      value: completedProjects,
      icon: CircleDashed,
    },
    {
      label: "Budget",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(totalBudget),
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>

                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              </div>

              <Icon className="h-8 w-8 text-muted-foreground" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
