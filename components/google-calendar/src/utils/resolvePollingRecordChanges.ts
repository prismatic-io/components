import type { EventChangesObject, EventRecordChange } from "../types";
export const resolvePollingRecordChanges = (
  data: EventChangesObject | undefined,
): EventRecordChange[] => {
  const changesObject = data ?? {
    createdEvents: [],
    updatedEvents: [],
    deletedEvents: [],
    allChanges: [],
  };
  return [
    ...(changesObject.createdEvents ?? []).map(
      (record): EventRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updatedEvents ?? []).map(
      (record): EventRecordChange => ({ changeType: "updated", record }),
    ),
    ...(changesObject.deletedEvents ?? []).map(
      (record): EventRecordChange => ({ changeType: "deleted", record }),
    ),
  ];
};
