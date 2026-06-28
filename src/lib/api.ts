import { Project } from "@/types/project";
import { ProjectFilters } from "@/types/project-filter";
import { ProjectInput } from "@/schemas/project.schema";

export async function getProjects(filters: ProjectFilters): Promise<Project[]> {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.status) {
    params.append("status", filters.status);
  }

  if (filters.sort) {
    params.append("sort", filters.sort);
  }

  const response = await fetch(`/api/projects?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function createProject(data: ProjectInput) {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.details ?? errorData.error ?? "Failed to create project",
    );
  }

  return response.json();
}

export async function updateProject(id: string, data: ProjectInput) {
  const response = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();

    console.error("Update API Error:", errorData);

    throw new Error(
      errorData.details ?? errorData.error ?? "Failed to update project",
    );
  }

  return response.json();
}

export async function deleteProject(id: string) {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.details ?? errorData.error ?? "Failed to delete project",
    );
  }
}
