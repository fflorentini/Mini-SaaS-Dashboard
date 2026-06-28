import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(2),
  status: z.enum(["active", "on hold", "completed"]),
  deadline: z.string(),
  assignedMember: z.string().min(2),
  budget: z.number().positive(),
});
