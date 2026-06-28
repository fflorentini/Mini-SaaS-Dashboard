"use client";

import { useState } from "react";

import { Project } from "@/types/project";
import { ProjectFilters } from "@/types/project-filter";
import { ProjectInput } from "@/schemas/project.schema";

import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";
import SortProjects from "@/components/SortProjects";
import ProjectTable from "@/components/ProjectTable";
import ProjectModal from "@/components/ProjectModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import DashboardStats from "@/components/DashboardStats";
import { useDebounce } from "@/hooks/useDebounce";
import { useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [filters, setFilters] = useState<ProjectFilters>({
    search: "",
    status: "",
    sort: "newest",
  });

  const debouncedFilters = useDebounce(filters, 400);

  const { projects, isSaving, isDeleting, create, update, remove } =
    useProjects(debouncedFilters);

  const [open, setOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  async function handleCreate(data: ProjectInput) {
    await create(data);

    setEditingProject(null);
    setOpen(false);
  }

  async function handleUpdate(data: ProjectInput) {
    if (!editingProject) return;

    await update(editingProject.id, data);

    setEditingProject(null);
    setOpen(false);
  }

  async function handleDelete() {
    if (!projectToDelete) return;

    await remove(projectToDelete.id);

    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  }

  return (
    <main className="container mx-auto space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mini SaaS Dashboard</h1>

          <p className="mt-1 text-muted-foreground">
            Manage your projects and monitor their progress.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingProject(null);
            setOpen(true);
          }}
        >
          Add Project
        </Button>
      </div>

      <DashboardStats projects={projects} />

      <div className="flex flex-col gap-4 md:flex-row">
        <SearchBar
          value={filters.search}
          onChange={(value) =>
            setFilters((current) => ({
              ...current,
              search: value,
            }))
          }
        />

        <StatusFilter
          value={filters.status}
          onChange={(value) =>
            setFilters((current) => ({
              ...current,
              status: value,
            }))
          }
        />

        <SortProjects
          value={filters.sort}
          onChange={(value) =>
            setFilters((current) => ({
              ...current,
              sort: value,
            }))
          }
        />
      </div>

      <div className="text-sm text-muted-foreground">
        {projects.length} project
        {projects.length !== 1 && "s"} found
      </div>

      <ProjectTable
        projects={projects}
        onEdit={(project) => {
          setEditingProject(project);
          setOpen(true);
        }}
        onDelete={(id) => {
          const project = projects.find((p) => p.id === id);

          if (!project) return;

          setProjectToDelete(project);
          setDeleteDialogOpen(true);
        }}
      />

      <ProjectModal
        open={open}
        loading={isSaving}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setEditingProject(null);
          }
        }}
        project={editingProject}
        onSubmit={(data) =>
          editingProject ? handleUpdate(data) : handleCreate(data)
        }
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        loading={isDeleting}
        title="Delete Project"
        description={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
        onCancel={() => {
          if (isDeleting) return;

          setDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </main>
  );
}
