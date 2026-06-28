"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Project Name"
            disabled={loading}
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <select
            disabled={loading}
            className="w-full rounded-md border p-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as ProjectStatus,
              })
            }
          >
            {PROJECT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>

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

          <Input
            placeholder="Assigned Team Member"
            disabled={loading}
            value={formData.assignedMember}
            onChange={(e) =>
              setFormData({
                ...formData,
                assignedMember: e.target.value,
              })
            }
          />

          <Input
            type="number"
            placeholder="Budget"
            disabled={loading}
            value={formData.budget}
            onChange={(e) =>
              setFormData({
                ...formData,
                budget: Number(e.target.value),
              })
            }
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
