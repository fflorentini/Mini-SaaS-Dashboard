import { ProjectStatus } from "@/constants/project";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  deadline: string;
  assignedMember: string;
  budget: number;
  createdAt: string;
  updatedAt: string;
};
