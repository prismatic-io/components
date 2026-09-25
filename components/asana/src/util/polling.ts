import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_LIMIT, TASK_OPT_FIELDS } from "../constants";
import type {
  BatchedPoll,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types/polling";
import type { Task } from "../types/resources";
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
    limit: DEFAULT_PAGE_LIMIT,
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
export const resolvePollWindow = (
  lastState: PollingState | undefined,
  lookBackDate: string | undefined,
  now: Date,
): {
  sinceDate: Date;
  isBackfill: boolean;
} => ({
  sinceDate: lastState?.lastPolledAt
    ? new Date(lastState.lastPolledAt)
    : lookBackDate
      ? new Date(lookBackDate)
      : now,
  isBackfill:
    lastState?.isBackfill === true ||
    (!lastState?.lastPolledAt && Boolean(lookBackDate)),
});
const taskTime = (task: Task): number | undefined => {
  const value = task.modified_at ?? task.created_at;
  return value ? new Date(value).getTime() : undefined;
};
export const planBatchedPoll = (
  tasks: Task[],
  sinceDate: Date,
  seenIds: string[] | undefined,
  maxTasks: number,
): BatchedPoll => {
  const since = sinceDate.getTime();
  const seen = new Set(seenIds ?? []);
  const isAfter = (time: number, gid: string) =>
    time > since || (seenIds !== undefined && time === since && !seen.has(gid));
  const inWindow = tasks
    .filter((task) => {
      const time = taskTime(task);
      return time === undefined || isAfter(time, task.gid);
    })
    .sort(
      (a, b) =>
        (taskTime(a) ?? since) - (taskTime(b) ?? since) ||
        a.gid.localeCompare(b.gid),
    );
  let delivered = inWindow.slice(0, maxTasks);
  const complete = inWindow.length <= maxTasks;
  if (!complete) {
    const lastTime = taskTime(delivered[delivered.length - 1]);
    if (lastTime !== undefined && lastTime === taskTime(inWindow[maxTasks])) {
      const beforeGroup = delivered.filter(
        (task) => (taskTime(task) ?? since) < lastTime,
      );
      if (beforeGroup.length > 0) {
        delivered = beforeGroup;
      }
    }
  }
  const cursor = Math.max(
    since,
    ...delivered.map((task) => taskTime(task) ?? since),
  );
  const atCursor = delivered
    .filter((task) => taskTime(task) === cursor)
    .map((task) => task.gid);
  const carried = cursor === since ? (seenIds ?? []) : [];
  const lastSeenIds =
    seenIds === undefined && atCursor.length === 0
      ? undefined
      : [...new Set([...carried, ...atCursor])];
  const created: Task[] = [];
  const updated: Task[] = [];
  for (const task of delivered) {
    const createdAt = task.created_at
      ? new Date(task.created_at).getTime()
      : undefined;
    if (createdAt !== undefined && isAfter(createdAt, task.gid)) {
      created.push(task);
    } else {
      updated.push(task);
    }
  }
  return {
    created,
    updated,
    nextState: {
      lastPolledAt: new Date(cursor).toISOString(),
      ...(lastSeenIds ? { lastSeenIds } : {}),
    },
    complete,
  };
};
export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
