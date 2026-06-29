import { Project } from "@/types/project";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2, Calendar, User, DollarSign } from "lucide-react";

type Props = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
};

export default function ProjectTable({ projects, onEdit, onDelete }: Props) {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-semibold">No projects found</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try changing your search or filter, or create a new project.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Mobile */}

      <div className="space-y-4 md:hidden">
        {projects.map((project) => (
          <Card
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            key={project.id}
          >
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {project.assignedMember}
                  </p>
                </div>

                <StatusBadge status={project.status} />
              </div>

              <div className="grid grid-cols-2 gap-6 rounded-lg bg-muted/30 p-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Deadline </p>

                  <p>
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(project.deadline),
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Budget</p>

                  <p>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(project.budget)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => onEdit(project)}>
                  Edit
                </Button>

                <Button
                  className="flex-1"
                  variant="destructive"
                  onClick={() => onDelete(project.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop */}

      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Member</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="transition-colors hover:bg-muted/60"
              >
                <TableCell className="py-5">
                  <div className="font-semibold tracking-tight">
                    {project.name}
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>

                <TableCell className="py-5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />

                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(project.deadline))}
                  </div>
                </TableCell>

                <TableCell className="py-5">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />

                    <span>{project.assignedMember}</span>
                  </div>
                </TableCell>

                <TableCell className="py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <DollarSign className="h-4 w-4 text-emerald-600" />

                    <span className="font-semibold tracking-tight">
                      {new Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 0,
                      }).format(project.budget)}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(project)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(project.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
