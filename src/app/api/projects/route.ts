import { NextRequest, NextResponse } from "next/server";

import { getProjects, createProject } from "@/services/project.service";

import { ProjectSchema } from "@/schemas/project.schema";
import { handleApiError } from "@/lib/api-error";

import { ProjectFilters, ProjectSort } from "@/types/project-filter";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters: ProjectFilters = {
      search: searchParams.get("search") ?? "",
      status: searchParams.get("status") ?? "",
      sort: (searchParams.get("sort") as ProjectSort) ?? "newest",
    };

    const projects = await getProjects(filters);

    return NextResponse.json(projects);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = ProjectSchema.safeParse(body);

    if (!result.success) {
      return handleApiError(result.error);
    }

    const project = await createProject(result.data);

    return NextResponse.json(project, {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
