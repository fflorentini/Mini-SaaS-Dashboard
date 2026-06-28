import { prisma } from "@/lib/prisma";

import { ProjectInput } from "@/schemas/project.schema";
import { ProjectFilters, ProjectSort } from "@/types/project-filter";

function getOrderBy(sort: ProjectSort) {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" as const };

    case "deadline":
      return { deadline: "asc" as const };

    case "budget_desc":
      return { budget: "desc" as const };

    case "budget_asc":
      return { budget: "asc" as const };

    case "name_asc":
      return { name: "asc" as const };

    case "name_desc":
      return { name: "desc" as const };

    case "newest":
    default:
      return { createdAt: "desc" as const };
  }
}

export async function getProjects({
  search,
  status,
  sort = "newest",
}: ProjectFilters) {
  return prisma.project.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(status && {
        status,
      }),
    },

    orderBy: getOrderBy(sort),
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
}

export async function createProject(data: ProjectInput) {
  return prisma.project.create({
    data: {
      ...data,
      deadline: new Date(data.deadline),
      budget: Number(data.budget),
    },
  });
}

export async function updateProject(id: string, data: ProjectInput) {
  return prisma.project.update({
    where: {
      id,
    },
    data: {
      ...data,
      deadline: new Date(data.deadline),
      budget: Number(data.budget),
    },
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: {
      id,
    },
  });
}
