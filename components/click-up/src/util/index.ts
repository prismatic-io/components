import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ClickUpTask } from "../types";

export { createKeyValMapper } from "./keyValmapper";

const POLL_PAGE_LIMIT = 100;

export const commaSeparatedStringToArrayOfNumbers = (str: string): number[] =>
  str
    .replace(/\s/g, "")
    .split(",")
    .map((s: string) => util.types.toNumber(s));

export const booleanToString = (value: boolean): string => (value ? "true" : "false");

export const addToObjectIfContent = (object: Record<string, unknown>): Record<string, string> => {
  const newObject: Record<string, string> = {};
  for (const key of Object.keys(object)) {
    if (object[key] && util.types.isString(object[key]) && util.types.toString(object[key]).length) {
      newObject[key] = util.types.toString(object[key]);
    }
  }

  return newObject;
};

export const cleanNumber = (value: unknown) => (value ? util.types.toNumber(value) : undefined);

export const cleanCommaSeparatedString = (idsString: unknown) =>
  idsString ? commaSeparatedStringToArrayOfNumbers(idsString as string) : undefined;

export const cleanNumberArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((string: string) => util.types.toNumber(string));
  }
  return undefined;
};

export const cleanStringArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((string: string) => util.types.toString(string));
  }
  return undefined;
};


export const formatClickUpTimestamp = (date: Date): string => String(date.getTime());




export const fetchTasksSince = async (
  client: HttpClient,
  scopeType: "team" | "list",
  scopeId: string,
  sinceMs: string
): Promise<ClickUpTask[]> => {
  const path = scopeType === "team" ? `/team/${scopeId}/task` : `/list/${scopeId}/task`;
  const tasks: ClickUpTask[] = [];
  let page = 0;
  while (true) {
    const { data } = await client.get<{ tasks: ClickUpTask[] }>(path, {
      params: { date_updated_gt: sinceMs, page },
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





export const partitionTasksByTimestamp = (
  tasks: ClickUpTask[],
  sinceMs: number
): { created: ClickUpTask[]; updated: ClickUpTask[] } => {
  const created: ClickUpTask[] = [];
  const updated: ClickUpTask[] = [];

  for (const task of tasks) {
    const createdAt = task.date_created ? Number(task.date_created) : null;
    const updatedAt = task.date_updated ? Number(task.date_updated) : null;

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
