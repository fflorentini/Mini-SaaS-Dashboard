export const PROJECT_STATUSES = ["active", "on hold", "completed"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
