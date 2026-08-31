import type { PollingContext, TriggerPayload } from "@prismatic-io/spectral";
import type {
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
