import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { POLL_PAGE_LIMIT } from "../constants";
import type {
  ClickUpTask,
  ClickUpTaskChange,
  ClickUpTaskChangesObject,
  ClickUpTaskPage,
  PartitionedTasks,
  PollingState,
  PollingWindowStart,
  PollScopeType,
} from "../types";
export const fetchTasksSince = async (
  client: HttpClient,
  scopeType: PollScopeType,
  scopeId: string,
  sinceMs: string,
): Promise<ClickUpTask[]> => {
  const path =
    scopeType === "team" ? `/team/${scopeId}/task` : `/list/${scopeId}/task`;
  const tasks: ClickUpTask[] = [];
  let page = 0;
  while (true) {
    const { data } = await client.get<ClickUpTaskPage>(path, {
      params: {
        date_updated_gt: sinceMs,
        page,
        include_closed: true,
        subtasks: true,
      },
    });
    const pageTasks = data?.tasks ?? [];
    tasks.push(...pageTasks);
    if (pageTasks.length < POLL_PAGE_LIMIT) {
      break;
    }
    page += 1;
  }
  return tasks;
};
export const formatClickUpTimestamp = (date: Date): string =>
  util.types.toString(date.getTime());
export const partitionTasksByTimestamp = (
  tasks: ClickUpTask[],
  sinceMs: number,
): PartitionedTasks => {
  const created: ClickUpTask[] = [];
  const updated: ClickUpTask[] = [];
  for (const task of tasks) {
    const createdAt = util.types.toNumber(task.date_created);
    const updatedAt = util.types.toNumber(task.date_updated);
    if (createdAt && createdAt > sinceMs) {
      created.push(task);
    } else if (updatedAt && updatedAt > sinceMs) {
      updated.push(task);
    } else if (!createdAt && !updatedAt) {
      updated.push(task);
    }
  }
  return { created, updated };
};
export const resolvePollingWindowStart = (
  state: PollingState | undefined,
  lookBackDate: string,
  now: Date,
): PollingWindowStart => {
  if (state?.lastPolledAt) {
    return {
      sinceMs: new Date(state.lastPolledAt).getTime(),
      isInitialSync: false,
    };
  }
  if (lookBackDate) {
    return {
      sinceMs: new Date(lookBackDate).getTime() - 1,
      isInitialSync: true,
    };
  }
  return { sinceMs: now.getTime(), isInitialSync: false };
};
export const resolveClickUpTaskChanges = (
  data: ClickUpTaskChangesObject | undefined,
): ClickUpTaskChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): ClickUpTaskChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): ClickUpTaskChange => ({ changeType: "updated", record }),
    ),
  ];
};
