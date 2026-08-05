import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { TASK_OPT_FIELDS } from "../constants";
import type { Task } from "../types/Task";
import { fetchMoreData } from "./dataSources";
export const fetchTasksSince = async (
  client: HttpClient,
  projectId: string,
  modifiedSinceIso: string,
): Promise<Task[]> => {
  return await fetchMoreData<Task>(client, "/tasks", [], true, {
    project: projectId,
    modified_since: modifiedSinceIso,
    opt_fields: TASK_OPT_FIELDS,
    limit: 100,
  });
};
export const partitionTasksByTimestamp = (
  tasks: Task[],
  sinceDate: Date,
): {
  created: Task[];
  updated: Task[];
} => {
  const created: Task[] = [];
  const updated: Task[] = [];
  for (const task of tasks) {
    const createdAt = task.created_at ? new Date(task.created_at) : null;
    const modifiedAt = task.modified_at ? new Date(task.modified_at) : null;
    if (createdAt && createdAt > sinceDate) {
      created.push(task);
    } else if (modifiedAt && modifiedAt > sinceDate) {
      updated.push(task);
    } else if (!createdAt && !modifiedAt) {
      updated.push(task);
    }
  }
  return { created, updated };
};
