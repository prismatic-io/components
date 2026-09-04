import type { DynamicsChangesObject, DynamicsRecordChange } from "../types";
export const resolvePollingRecordChanges = (
  data: DynamicsChangesObject | undefined,
): DynamicsRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): DynamicsRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): DynamicsRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
