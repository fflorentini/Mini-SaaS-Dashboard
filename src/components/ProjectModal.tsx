"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Project } from "@/types/project";
import { PROJECT_STATUSES, ProjectStatus } from "@/constants/project";

type FormData = {
  name: string;
  status: ProjectStatus;
  deadline: string;
  assignedMember: string;
  budget: number;
};

type Props = {
  open: boolean;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => Promise<void>;
  project?: Project | null;
};

const DEFAULT_FORM_DATA: FormData = {
  name: "",
  status: "active",
  deadline: "",
  assignedMember: "",
  budget: 0,
};

export default function ProjectModal({
  open,
  loading = false,
  onOpenChange,
  onSubmit,
  project,
}: Props) {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        status: project.status,
        deadline: project.deadline.split("T")[0],
        assignedMember: project.assignedMember,
        budget: project.budget,
      });
    } else {
      setFormData(DEFAULT_FORM_DATA);
    }
  }, [project]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(formData);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>

          <DialogDescription>
            {project
              ? "Update your project information below."
              : "Fill in the details below to create a new project."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Project Name">
            <Input
              placeholder="Website Redesign"
              disabled={loading}
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Status">
            <Select
              disabled={loading}
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as ProjectStatus,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>

              <SelectContent>
                {PROJECT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Deadline">
              <Input
                type="date"
                disabled={loading}
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deadline: e.target.value,
                  })
                }
              />
            </FormField>

            <FormField label="Budget">
              <Input
                type="number"
                min={0}
                step={100}
                placeholder="10000"
                disabled={loading}
                value={formData.budget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budget: Number(e.target.value),
                  })
                }
              />
            </FormField>
          </div>

          <FormField label="Assigned Team Member">
            <Input
              placeholder="John Doe"
              disabled={loading}
              value={formData.assignedMember}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedMember: e.target.value,
                })
              }
            />
          </FormField>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : project
                  ? "Save Changes"
                  : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
