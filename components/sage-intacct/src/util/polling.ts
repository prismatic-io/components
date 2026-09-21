import { POLL_RESOURCE_CONFIG } from "../constants";
import type { PollingChangesObject, PollingRecordChange } from "../types";
export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({
    label,
    value,
  }),
);
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
