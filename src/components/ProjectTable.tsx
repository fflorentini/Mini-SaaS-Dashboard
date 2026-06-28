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
          <Card key={project.id}>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    {project.assignedMember}
                  </p>
                </div>

                <StatusBadge status={project.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Deadline</p>

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
          <TableHeader>
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
                className="hover:bg-muted/40 transition-colors"
              >
                <TableCell className="font-medium">{project.name}</TableCell>

                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>

                <TableCell>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(project.deadline),
                  )}
                </TableCell>

                <TableCell>{project.assignedMember}</TableCell>

                <TableCell className="text-right">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(project.budget)}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(project)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(project.id)}
                    >
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
