import type { SlackChangesObject, SlackRecordChange } from "../types";
export const resolvePollingRecordChanges = (
  data: SlackChangesObject | undefined,
): SlackRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): SlackRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): SlackRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
