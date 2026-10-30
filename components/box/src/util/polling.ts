import type { PollingContext, TriggerPayload } from "@prismatic-io/spectral";
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
  T extends { created_at?: string; modified_at?: string },
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
  T extends { created_at?: string; modified_at?: string },
>(
  entries: T[],
  lastPolledAt: string,
): T[] => {
  return entries.filter((entry) => entry.created_at > lastPolledAt);
};

export const computeUpdatedEntries = <
  T extends { id?: unknown; modified_at?: string },
>(
  entries: T[],
  lastPolledAt: string,
  excludeIds: unknown[],
): T[] => {
  return entries.filter(
    ({ modified_at, id }) =>
      modified_at > lastPolledAt && !excludeIds.includes(id),
  );
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
