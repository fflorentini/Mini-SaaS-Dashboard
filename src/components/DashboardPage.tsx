"use client";

import { useState } from "react";

import { signOut } from "next-auth/react";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { DataToolbar } from "@/components/ui/data-toolbar";
import FilterToolbar from "@/components/dashboard/FilterToolbar";

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
    <main className="container mx-auto max-w-7xl space-y-8 px-6 py-8">
      <PageHeader
        title="Mini SaaS Dashboard"
        description="Manage your projects and monitor their progress."
        actions={
          <>
            <Button
              className="min-w-36"
              onClick={() => {
                setEditingProject(null);
                setOpen(true);
              }}
            >
              Add Project
            </Button>

            <Button
              variant="outline"
              className="min-w-28"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
          </>
        }
      />

      <section className="space-y-4">
        <DashboardStats projects={projects} />
      </section>

      <FilterToolbar filters={filters} onFiltersChange={setFilters} />

      <SectionHeader
        title="Projects"
        description={`Showing ${projects.length} project${
          projects.length !== 1 ? "s" : ""
        }`}
      />

      <Card>
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>

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
