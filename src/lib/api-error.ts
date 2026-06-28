import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function handleApiError(error: unknown) {
  console.error(error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: error.flatten(),
      },
      {
        status: 400,
      },
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        return NextResponse.json(
          {
            error: "Project not found",
          },
          {
            status: 404,
          },
        );

      default:
        return NextResponse.json(
          {
            error: "Database error",
          },
          {
            status: 500,
          },
        );
    }
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    {
      error: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
}
