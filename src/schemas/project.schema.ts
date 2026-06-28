import { z } from "zod";
import { PROJECT_STATUSES } from "@/constants/project";

export const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),

  status: z.enum(PROJECT_STATUSES),

  deadline: z.string(),

  assignedMember: z.string().min(1, "Assigned member is required"),

  budget: z.number().positive("Budget must be greater than zero"),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
