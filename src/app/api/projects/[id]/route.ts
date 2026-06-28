import { NextResponse } from "next/server";

import {
  getProjectById,
  updateProject,
  deleteProject,
} from "@/services/project.service";

import { ProjectSchema } from "@/schemas/project.schema";
import { handleApiError, unauthorizedResponse } from "@/lib/api-error";
import { requireSession } from "@/lib/require-session";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireSession();

    if (!session) {
      return unauthorizedResponse();
    }

    const { id } = await context.params;

    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireSession();

    if (!session) {
      return unauthorizedResponse();
    }

    const { id } = await context.params;

    const body = await request.json();

    const result = ProjectSchema.safeParse(body);

    if (!result.success) {
      return handleApiError(result.error);
    }

    const project = await updateProject(id, result.data);

    return NextResponse.json(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireSession();

    if (!session) {
      return unauthorizedResponse();
    }

    const { id } = await context.params;

    await deleteProject(id);

    return NextResponse.json({
      message: "Project deleted",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
