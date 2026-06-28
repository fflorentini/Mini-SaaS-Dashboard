import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/constants/project";
import { CircleCheckBig, CirclePause, CircleDashed } from "lucide-react";

type Props = {
  status: ProjectStatus;
};

const statusConfig: Record<
  ProjectStatus,
  {
    icon: React.ElementType;
    className: string;
    label: string;
  }
> = {
  active: {
    icon: CircleCheckBig,
    label: "Active",
    className:
      "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  },

  "on hold": {
    icon: CirclePause,
    label: "On Hold",
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  },

  completed: {
    icon: CircleDashed,
    label: "Completed",
    className:
      "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-100",
  },
};

export function StatusBadge({ status }: Props) {
  const config = statusConfig[status];

  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`gap-1 ${config.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}
