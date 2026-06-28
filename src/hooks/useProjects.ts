import { useCallback, useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/api";

import { Project } from "@/types/project";
import { ProjectFilters } from "@/types/project-filter";
import { ProjectInput } from "@/schemas/project.schema";

import { toast } from "sonner";

export function useProjects(filters: ProjectFilters) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      const data = await getProjects(filters);

      setProjects(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load projects.");
    }
  }, [filters]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  async function create(data: ProjectInput) {
    try {
      setIsSaving(true);

      await createProject(data);

      toast.success("Project created successfully!");

      await loadProjects();
    } catch (error) {
      console.error(error);

      toast.error("Unable to create project.");

      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  async function update(id: string, data: ProjectInput) {
    try {
      setIsSaving(true);

      await updateProject(id, data);

      toast.success("Project updated successfully!");

      await loadProjects();
    } catch (error) {
      console.error(error);

      toast.error("Unable to update project.");

      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  async function remove(id: string) {
    try {
      setIsDeleting(true);

      await deleteProject(id);

      toast.success("Project deleted successfully!");

      await loadProjects();
    } catch (error) {
      console.error(error);

      toast.error("Unable to delete project.");

      throw error;
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    projects,
    isSaving,
    isDeleting,
    create,
    update,
    remove,
    refresh: loadProjects,
  };
}
