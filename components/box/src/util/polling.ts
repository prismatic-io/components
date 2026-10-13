import {
  type PollingContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
import type {
  BoxChangesObject,
  BoxCommentChange,
  BoxCommentChangesObject,
  BoxFolderChange,
  BoxFolderChangesObject,
  BoxRecordChange,
  NewOrUpdatedFilesResult,
  PollingResult,
  PollingState,
} from "../types";
export const getStoreKey = (flowName: string): string =>
  `boxTrigger-${flowName}`;
export const getLegacyStoreKey = (
  targetId: string,
  targetType: string,
  flowName: string,
): string => `boxTrigger-${targetId}-${targetType}-${flowName}`;
export const buildPollingResult = <T>(
  payload: TriggerPayload,
  data: NewOrUpdatedFilesResult<T>,
): PollingResult => ({
  payload: { ...payload, body: { data } },
  polledNoChanges: Object.values(data).every(
    ({ polledNoChanges }) => polledNoChanges,
  ),
});
export const getLastPolledAt = (
  context: PollingContext,
  defaultLastPolledAt: string,
): string => {
  return (
    (context.polling.getState() as PollingState).lastPolledAt ||
    defaultLastPolledAt
  );
};
export const normalizeDatesBetweenEntries = <
  T extends {
    created_at?: string;
    modified_at?: string;
  },
>(
  entries: T[],
): (Omit<T, "created_at" | "modified_at"> & {
  created_at?: string;
  modified_at?: string;
})[] => {
  return entries.map(({ created_at, modified_at, ...entry }) => {
    return {
      ...entry,
      created_at: created_at ? new Date(created_at).toISOString() : undefined,
      modified_at: modified_at
        ? new Date(modified_at).toISOString()
        : undefined,
    };
  });
};
export const computeNewEntries = <
  T extends {
    created_at?: string;
    modified_at?: string;
  },
>(
  entries: T[],
  lastPolledAt: string,
): T[] => {
  return entries.filter((entry) => entry.created_at > lastPolledAt);
};
export const resolvePollingRecordChanges = (
  data: BoxChangesObject | undefined,
): BoxRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.newFiles?.data ?? []).map(
      (record): BoxRecordChange => ({ changeType: "new", record }),
    ),
    ...(changesObject.updatedFiles?.data ?? []).map(
      (record): BoxRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const resolveFolderChanges = (
  data: BoxFolderChangesObject | undefined,
): BoxFolderChange[] => {
  const changesObject = data ?? {};
  return (changesObject.newFolders?.data ?? []).map(
    (record): BoxFolderChange => ({ changeType: "new", record }),
  );
};
export const resolveCommentChanges = (
  data: BoxCommentChangesObject | undefined,
): BoxCommentChange[] => {
  const changesObject = data ?? {};
  return (changesObject.newComments?.data ?? []).map(
    (record): BoxCommentChange => ({ changeType: "new", record }),
  );
};
export const lookBackDateClean = (value: unknown): string => {
  const str = util.types.toString(value).trim();
  if (!str) return "";
  if (!LOOK_BACK_DATE_PATTERN.test(str)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }
  const parts = str.split("-");
  const year = util.types.toNumber(parts[0]);
  const month = util.types.toNumber(parts[1]);
  const day = util.types.toNumber(parts[2]);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    throw new Error(`Look-back Date "${str}" is not a valid calendar date.`);
  }
  if (parsed > new Date()) {
    throw new Error("Look-back Date cannot be a future date.");
  }
  return str;
};
